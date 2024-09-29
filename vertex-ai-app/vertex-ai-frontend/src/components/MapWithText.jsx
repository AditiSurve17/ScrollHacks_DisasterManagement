import React from 'react';
import EmergencyMap from './EmergencyMap'; // Import the Map Component

const MapWithText = () => {
  return (
    <section className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Text Section */}
      <div className="flex flex-col justify-center text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold !leading-tight mb-4">
          Find <span style={{ color: '#d82c2c' }}>People</span> for Emergency
        </h1>
        <p className="text-lg mb-6">
          Use this platform to locate nearby emergency services, shelters, and help centers during a crisis. Stay prepared and know where to go for assistance.
        </p>
      </div>

      {/* Map Section */}
      <div>
        <EmergencyMap />
      </div>
    </section>
  );
};

export default MapWithText;
