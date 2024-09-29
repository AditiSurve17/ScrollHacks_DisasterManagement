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





