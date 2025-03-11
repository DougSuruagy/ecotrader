import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const center = [-15.7801, -47.9292]; // Coordenadas de Brasília como padrão

// Configuração do ícone padrão do Leaflet
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const GeoSearch = () => {
  const [position, setPosition] = useState(center);
  
  const LocationFinder = () => {
    const map = useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  return (
    <div className="map-container" style={{ height: '400px', width: '100%' }}>
      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Sua localização atual
          </Popup>
        </Marker>
        <LocationFinder />
      </MapContainer>

      <div className="search-box" style={{ marginTop: '1rem' }}>
        <input
          type="text"
          placeholder="Buscar coletores próximos..."
          style={{ width: '100%', padding: '0.8rem' }}
        />
      </div>
    </div>
  );
};

export default GeoSearch;