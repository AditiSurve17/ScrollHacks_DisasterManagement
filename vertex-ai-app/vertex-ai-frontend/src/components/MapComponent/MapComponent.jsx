// src/components/MapComponent/MapComponent.jsx
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 0,
  lng: 0,
};

const MapComponent = () => {
  const [mapCenter, setMapCenter] = useState(center);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Load user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(userLatLng);
          setUserLocation(userLatLng);
          fetchNearbyPlaces(userLatLng);
        },
        () => alert('Geolocation failed or permission denied.')
      );
    }
  }, []);

  // Fetch nearby places using Google Places API
  const fetchNearbyPlaces = async (location) => {
    const { lat, lng } = location;
    const apiKey = 'YOUR_API_KEY'; // Replace with your API Key

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital|fire_station|ngo&key=${apiKey}`
      );
      setNearbyPlaces(response.data.results);
    } catch (error) {
      console.error('Error fetching nearby places:', error);
    }
  };

  return (
    <section>
      <div className="container py-0 md:py-0 grid grid-cols-1 md:grid-cols-2 gap-8 space-y-6 md:space-y-0">
        {/* Left Side Text */}
        <div className="flex flex-col justify-center">
          <div className="text-center md:text-left space-y-12">
            <h1 className="text-4xl md:text-6xl font-bold !leading-snug">
              Find People For Emergency
            </h1>
            <div className="flex flex-col gap-6">
              <div className="p-6 bg-[#f4f4f4] rounded-2xl hover:bg-white duration-300 hover:shadow-2xl">
                <p className="text-lg">
                  Locate nearby hospitals, fire stations, and NGOs to prepare and assist in emergencies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Google Map */}
        <div className="map-container">
          {userLocation ? (
            <LoadScript googleMapsApiKey="YOUR_API_KEY">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={12}
              >
                <Marker position={userLocation} label="You" />
                {nearbyPlaces.map((place, index) => (
                  <Marker
                    key={index}
                    position={{
                      lat: place.geometry.location.lat,
                      lng: place.geometry.location.lng,
                    }}
                    onClick={() => setSelectedPlace(place)}
                    label={place.name}
                  />
                ))}
                {selectedPlace && (
                  <InfoWindow
                    position={{
                      lat: selectedPlace.geometry.location.lat,
                      lng: selectedPlace.geometry.location.lng,
                    }}
                    onCloseClick={() => setSelectedPlace(null)}
                  >
                    <div>
                      <h2 className="font-bold">{selectedPlace.name}</h2>
                      <p>{selectedPlace.vicinity}</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          ) : (
            <p>Loading your location...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MapComponent;
