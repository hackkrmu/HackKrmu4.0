const axios = require("axios");
const express = require("express");
const cors = require("cors");

const rateLimit = require("express-rate-limit");

const app = express();

const addressCache = new Map();
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
app.use(cors());

const searchPlacesNominatim = async (address, keywords) => {
    const results = [];

    for (const keyword of keywords) {
        const query = `${keyword}, ${address}`;
        try {
            const response = await axios.get("https://nominatim.openstreetmap.org/search", {
                params: {
                    q: query,
                    format: "json",
                    addressdetails: 1,
                    limit: 10,
                },
            });
            results.push(...response.data);
        } catch (error) {
            console.error(`Nominatim error for query "${query}":`, error.message);
        }
    }

    return results.map((item) => ({
        name: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        address: "No address available", 
    }));
};

const searchPlacesOverpass = async (lat, lon, radius = 25000) => {
    const query = `[out:json];
        node["healthcare"="optometrist"](around:${radius},${lat},${lon});
        out;`;

    try {
        const response = await axios.get("https://overpass-api.de/api/interpreter", {
            params: { data: query },
        });
        return response.data.elements.map((element) => ({
            name: element.tags.name || "Unknown",
            lat: element.lat,
            lon: element.lon,
            address: "No address available", 
        }));
    } catch (error) {
        console.error("Overpass API error:", error.message);
        return [];
    }
};

const reverseGeocode = async (lat, lon) => {
    const cacheKey = `${lat},${lon}`;
    if (addressCache.has(cacheKey)) return addressCache.get(cacheKey);

    await delay(1000); 
    try {
        const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
            params: { format: "json", lat, lon, addressdetails: 1 },
        });
        const address = response.data.address || {};
        const formattedAddress = `${address.road || ""}, ${
            address.city || address.town || address.village || ""
        }, ${address.state || ""}, ${address.country || ""}`.replace(/(^[,\s]+|[,\s]+$)/g, "");
        addressCache.set(cacheKey, formattedAddress); 
        return formattedAddress;
    } catch (error) {
        console.error(`Reverse geocoding failed for (${lat}, ${lon}):`, error.message);
        return "No address available";
    }
};

const searchCombined = async ({ street, city, county, state, country, postalcode, lat, lon }) => {
    const addressParts = [street, city, county, state, country, postalcode].filter(Boolean).join(", ");
    const keywords = ["optometrist", "eye care", "ophthalmologist"];

    const nominatimResults = await searchPlacesNominatim(addressParts, keywords);
    const overpassResults = await searchPlacesOverpass(lat, lon);

    const allResults = [...nominatimResults, ...overpassResults];
    const resultsWithAddresses = [];
    for (const result of allResults) {
        if (result.address === "No address available") {
            result.address = await reverseGeocode(result.lat, result.lon);
        }
        resultsWithAddresses.push(result);
    }
    return Array.from(
        new Map(resultsWithAddresses.map((item) => [`${item.lat},${item.lon}`, item])).values()
    );
};

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 60,
});

app.use(limiter);

app.get("/api/nearby-clinics", async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) return res.status(400).json({ error: "Latitude and longitude are required" });

        const addressResponse = await axios.get("https://nominatim.openstreetmap.org/reverse", {
            params: { format: "json", lat, lon, addressdetails: 1 },
        });
        const address = addressResponse.data.address || {};
        const street = `${address.house_number || ""} ${address.road || ""}`.trim();
        const city = address.city || address.town || address.village || address.suburb || "";
        const county = address.county || "";
        const state = address.state || "";
        const country = address.country || "";
        const postalcode = address.postcode || "";

        const clinics = await searchCombined({ street, city, county, state, country, postalcode, lat, lon });
        res.json(clinics);
    } catch (error) {
        console.error("Error fetching clinics:", error.message);
        res.status(500).json({ error: "An error occurred while fetching clinics" });
    }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
