import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import Reviews from '../Reviews/Reviews';

const Home = () => {
    return (
        <div className='container px-4 lg:px-0 lg:mx-auto space-y-12 lg:space-y-20'>
            <Banner/>
            <FeaturedProducts />
            <Reviews />
        </div>
    );
};

export default Home;