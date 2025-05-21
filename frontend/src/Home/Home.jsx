import React from "react";
import Banner from '../components/Banner';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import Freebook from '../components/Freebook';
import Cards from '../components/Cards';

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Freebook />
      <Footer />
    </>
  );
}

export default Home;
