import React, { useContext } from 'react'; // Added useContext import
import { GridGallery } from './GridGallery';

import "../App.css";
import Footer from '../Sections/Footer';
import Features from '../Sections/Features';
import SmallCard from './SmallCard';
import { AppContext } from '../App';

function Home() {
  const { allproducts } = useContext(AppContext); // Use context to get allproducts

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

      {/* Exclusive Offers Section */}
      <section className="offer images my-10">
        <div className="brand text-4xl md:text-5xl text-center text-3xl">Exclusive Offers on Top Brands</div>
        <div className="texts text-center text-lg">Shop Now and Save Big!</div>
        <div className="flex justify-center">
          {/* Display fallback message if no products available */}
          {allproducts.length > 0 ? (
            <SmallCard products={allproducts} classname={"overflow-x-auto flex scrollbar-hide"} />
          ) : (
            <p>No products available</p>
          )}
        </div>
      </section>

      {/* Latest Collection Section */}
      <section className="latest collection my-10">
        <div>
          <div className="brand text-4xl md:text-5xl text-center">The Latest Collection</div>
          <div className="texts text-center text-lg">Be the first to explore our newest arrivals!</div>
        </div>
        <div>
          {/* Display fallback message if no products available */}
          {allproducts.length > 0 ? (
            <SmallCard products={allproducts} classname={"overflow-y-auto flex flex-wrap scrollbar-hide justify-center h-[400px] md:h-[550px]"} />
          ) : (
            <p>No products available</p>
          )}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="best sellers my-10">
        <div>
          <div className="brand text-4xl md:text-5xl text-center">Our Best Sellers</div>
          <div className="texts text-center text-lg">Discover the dresses that our customers can't get enough of!</div>
        </div>
        <div>
          {/* Display fallback message if no products available */}
          {allproducts.length > 0 ? (
            <SmallCard products={allproducts} classname={"overflow-x-auto flex scrollbar-hide"} />
          ) : (
            <p>No products available</p>
          )}
        </div>
      </section>

      {/* Feature Section */}
      <Features />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
