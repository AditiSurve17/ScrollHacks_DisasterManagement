// src/App.jsx
import React from "react";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Banner from "./components/Banner/Banner";
import Subscribe from "./components/Subscribe/Subscribe";
import Banner2 from "./components/Banner/Banner2";
import Banner3 from "./components/Banner/Banner3";
import Video from "./components/Banner/Videos";
import Footer from "./components/Footer/Footer";
import MapComponent from "./components/MapComponent/MapComponent";  // Import MapComponent

const App = () => {
  return (
    <main className="overflow-x-hidden bg-white text-dark">
      <Hero />
      <Services />
      <Banner />
      <MapComponent />  {/* Integrate MapComponent here */}
      <Banner3 />
      <Subscribe />
      <Banner2 />
      <Footer />
    </main>
  );
};

export default App;





{/*import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    householdDetails: '',
    location: '',
    housingType: '',
    localThreats: '',
    specificNeeds: '',
  });
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [loading, setLoading] = useState(false); // Adding loading state

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true during submission
    try {
      const response = await fetch('http://localhost:3001/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setGeneratedPlan(data);
    } catch (error) {
      console.error('Error generating plan:', error);
    } finally {
      setLoading(false); // Set loading state back to false after submission
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Personalized Emergency Preparedness Plan</h1>
      
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Household Details</h2>
          <textarea
            name="householdDetails"
            placeholder="Enter details about your household"
            value={formData.householdDetails}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg mb-4"
            rows="4"
          />
          <div className="flex justify-between">
            <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Location Information</h2>
          <input
            name="location"
            placeholder="Enter your location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg mb-4"
          />
          <div className="flex justify-between">
            <button onClick={handleBack} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Back
            </button>
            <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Housing Type</h2>
          <select
            name="housingType"
            value={formData.housingType}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg mb-4"
          >
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="mobile-home">Mobile Home</option>
          </select>
          <div className="flex justify-between">
            <button onClick={handleBack} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Back
            </button>
            <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Specific Needs</h2>
          <textarea
            name="specificNeeds"
            placeholder="Enter specific needs (e.g., medical conditions, pets)"
            value={formData.specificNeeds}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg mb-4"
            rows="4"
          />
          <div className="flex justify-between">
            <button onClick={handleBack} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Back
            </button>
            <button
              onClick={handleSubmit}
              className={`px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Submit'}
            </button>
          </div>
        </div>
      )}

      {generatedPlan && (
        <div className="mt-10 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-6">Generated Plan</h2>
          <div className="prose max-w-none">
            <ReactMarkdown>{generatedPlan}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 0, // Default location (updated later)
  lng: 0, // Default location (updated later)
};

const App = () => {
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

          // Fetch nearby places (e.g., hospitals, fire stations)
          fetchNearbyPlaces(userLatLng);
        },
        () => alert('Geolocation failed or permission denied.')
      );
    }
  }, []);

  // Fetch nearby places using Google Places API
  const fetchNearbyPlaces = async (location) => {
    const { lat, lng } = location;
    const apiKey = 'AIzaSyDzF8F7iwWQohh6rEogW9jUEojnJWPscWc'; // Replace with your Google Maps API Key

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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Emergency Services Near You</h1>

      <div className="map-container mb-6">
        {userLocation ? (
          <LoadScript googleMapsApiKey="AIzaSyDzF8F7iwWQohh6rEogW9jUEojnJWPscWc"> 
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

      
      {nearbyPlaces.length > 0 && (
        <div className="nearby-places">
          <h2 className="text-2xl font-semibold mb-4">Nearby Emergency Services</h2>
          <ul className="list-disc pl-5">
            {nearbyPlaces.map((place, index) => (
              <li key={index} className="mb-2">
                <strong>{place.name}</strong> - {place.vicinity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;*/}

