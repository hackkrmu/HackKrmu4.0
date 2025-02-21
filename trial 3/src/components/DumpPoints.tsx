import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Trash2 } from 'lucide-react';

const dumpPoints = [
  { id: 1, name: 'City Recycling Center', lat: 51.505, lng: -0.09, type: 'Recycling' },
  { id: 2, name: 'Green Waste Station', lat: 51.51, lng: -0.1, type: 'Composting' },
  { id: 3, name: 'Electronic Waste Point', lat: 51.515, lng: -0.09, type: 'E-Waste' },
];

const recyclingIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const compostingIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const eWasteIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const defaultIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const LiveLocationMarker: React.FC<{ onAddDumpPoint: (lat: number, lng: number) => void }> = ({ onAddDumpPoint }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
        map.setView([latitude, longitude], map.getZoom());
      },
      (error) => {
        console.error('Error getting geolocation', error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={defaultIcon}>
      <Popup>
        <div>
          <p>You are here</p>
          <button
            onClick={() => onAddDumpPoint(position[0], position[1])}
            className="mt-2 w-full bg-nectar text-brown py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            Add Dump Point Here
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

const AddDumpPointOnClick: React.FC<{ onAddDumpPoint: (lat: number, lng: number) => void }> = ({ onAddDumpPoint }) => {
  useMapEvents({
    click(e) {
      onAddDumpPoint(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

export const DumpPoints: React.FC = () => {
  const [points, setPoints] = useState(dumpPoints);

  const handleAddDumpPoint = (lat: number, lng: number) => {
    const newPoint = {
      id: points.length + 1,
      name: 'New Dump Point',
      lat,
      lng,
      type: 'Unknown'
    };
    setPoints([...points, newPoint]);
  };

  const getIconByType = (type: string) => {
    switch (type) {
      case 'Recycling':
        return recyclingIcon;
      case 'Composting':
        return compostingIcon;
      case 'E-Waste':
        return eWasteIcon;
      default:
        return defaultIcon;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-brown mb-4 flex items-center gap-2">
          <Trash2 className="w-6 h-6 text-sepia" />
          Nearby Dump Points
        </h2>
        <div className="h-[400px] rounded-lg overflow-hidden">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {points.map((point) => (
              <Marker
                key={point.id}
                position={[point.lat, point.lng]}
                icon={getIconByType(point.type)}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">{point.name}</h3>
                    <p className="text-sm text-gray-600">{point.type}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
            <LiveLocationMarker onAddDumpPoint={handleAddDumpPoint} />
            <AddDumpPointOnClick onAddDumpPoint={handleAddDumpPoint} />
          </MapContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {points.map((point) => (
          <div key={point.id} className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="font-medium text-brown">{point.name}</h3>
            <p className="text-sm text-sepia">{point.type}</p>
            <button className="mt-2 w-full bg-nectar text-brown py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
              Get Directions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};