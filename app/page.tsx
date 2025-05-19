import React from 'react';
import Hero from '@/components/Hero';
import Product from '@/components/Product';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import RiderCarousel from '@/components/RiderCarousel';
import CylinderPromo from '@/components/CylinderPromo';
import VideoTutorial from '@/components/VideoTutorial';

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-auto'>
      <Header />
      <CylinderPromo />
      <Hero />
      <Product />
      <VideoTutorial />
      <About />
      <RiderCarousel />
      <Banner />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
