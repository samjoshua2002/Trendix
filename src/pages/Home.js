import React from 'react';
import { GridGallery } from './GridGallery';
import product from "../assects/product.json"
import "../App.css";
import Footer from '../Sections/Footer';
import Features from '../Sections/Features';
import SmallCard from './SmallCard';

function Home() {
  return (
    <div className="p-5 md:p-10 bg-gradient-to-b">
      {/* Hero Section */}
      <section className="image py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            {/* Text Section */}
            <div className="text-center md:text-left space-y-5">
              <div className="brand text-4xl md:text-5xl font-extrabold text-gray-800">
                Shop the Collection
              </div>
              <p className="texts text-lg text-gray-600 leading-relaxed">
                Step into a world of style and elegance. <br />
                Our collection features dresses for every mood and moment.
              </p>
              <button className="px-6 py-3 bg-slate-950 text-white rounded-md hover:bg-slate-800 transition-all">
                Explore Now
              </button>
            </div>
            {/* Gallery Section */}
            <GridGallery />
          </div>
        </div>
      </section>

      <section className=' my-10'>
          <div className="brand text-4xl md:text-5xl text-center">Exclusive Offers on Top Brands</div>
          <div className="texts text-center text-lg">Shop Now and Save Big!</div>
          <div className="">
            <SmallCard products={product} classname={"overflow-x-auto flex scrollbar-hide "} />
          </div>
        </section>

      {/* Feature Section */}
     <Features/>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
