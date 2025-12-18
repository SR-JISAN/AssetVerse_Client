import React from 'react';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import About from '../../components/About/About';
import Payment from '../../components/Payment/Payment';
import FeaturesShowcase from '../../components/FeaturesShowcase/FeaturesShowcase';
import Testimonials from '../../components/Testimonials/Testimonials';
import FaqSection from '../../components/FaqSection/FaqSection';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import ContactCTA from '../../components/ContactCTA/ContactCTA';
import NFPage from '../ErrorPage/NFPage';
import Loading from '../Loading/Loading';



const Home = () => {
    return (
      <div>
        <HeroBanner></HeroBanner>
        <About></About>
        <Payment></Payment>
        <FeaturesShowcase></FeaturesShowcase>
        <Testimonials></Testimonials>
        <HowItWorks></HowItWorks>
        <ContactCTA></ContactCTA>
        <FaqSection></FaqSection>
      </div>
    );
};

export default Home;