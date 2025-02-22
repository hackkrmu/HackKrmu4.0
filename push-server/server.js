const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());

// Store connected clients
let clients = [];

// Function to fetch data from the external API
const fetchDataAndNotify = async () => {
    try {
        const response = await axios.get("https://api.tonystark.in/notify.php");
        if (response.data.beep === true) {
            // Send data to all connected clients
            clients.forEach((res) => res.write(`data: ${JSON.stringify({ beep: true })}\n\n`));
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
};

// Poll API every 5 seconds and notify clients
setInterval(fetchDataAndNotify, 5000);

// SSE Endpoint to send real-time updates
app.get("/api/data", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Add client to the list
    clients.push(res);

    // Remove client when connection closes
    req.on("close", () => {
        clients = clients.filter((client) => client !== res);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Push server running at http://localhost:${PORT}`);
});