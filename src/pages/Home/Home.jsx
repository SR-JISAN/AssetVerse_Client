import React from 'react';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import About from '../../components/About/About';
import Payment from '../../components/Payment/Payment';
import FeaturesShowcase from '../../components/FeaturesShowcase/FeaturesShowcase';

const Home = () => {
    return (
      <div>
        <HeroBanner></HeroBanner>
        <About></About>
        <Payment></Payment>
        <FeaturesShowcase></FeaturesShowcase>
      </div>
    );
};

export default Home;