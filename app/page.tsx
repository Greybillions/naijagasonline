import React from 'react';
import Hero from '@/components/Hero';
import Product from '@/components/Product';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Hero />
      <Product />
      <About />
      <Banner />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
