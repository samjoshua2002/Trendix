import React, { useContext } from 'react';
import { GridGallery } from './GridGallery';
import { Tag, Sparkles, TrendingUp } from 'lucide-react';
import "../App.css";
import Footer from '../Sections/Footer';
import Features from '../Sections/Features';
import SmallCard from './HomeCard';
import { AppContext } from '../App';

function Home() {
  const { allproducts } = useContext(AppContext);

  // Get top 4 products with the highest discount
  const topOffers = allproducts
    .map(product => ({
      ...product,
      discount: ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100,
    }))
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 4);

  // Get top 4 best sellers based on rating and rating count
  const bestSellers = allproducts
    .sort((a, b) => (b.rating * b.ratingCount) - (a.rating * a.ratingCount))
    .slice(0, 4);

  // Categories with their respective products
  const categories = {
    men: allproducts.filter(p => p.category === 'Men').slice(0, 4),
    women: allproducts.filter(p => p.category === 'Women').slice(0, 4),
    kids: allproducts.filter(p => p.category === 'Kids').slice(0, 4),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b pt-24 sm:pt-28 from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            <div className="text-center md:text-left space-y-6">
              <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E23378] via-pink-500 to-purple-600 animate-text-glow">
                Shop the Future
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Elevate your wardrobe with cutting-edge designs and timeless elegance.
                Discover styles for every occasion, crafted with precision and care.
              </p>
              <div className="flex justify-center md:justify-start">
                <a
                  href="#offers"
                  className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-[#E23378] to-pink-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all"
                >
                  Explore Now
                </a>
              </div>
            </div>
            <GridGallery />
          </div>
        </div>
      </section>

      {/* Top Offers Section */}
      <section id="offers" className="py-20 bg-white">
        <div className="container mx-auto  px-4">
          <div className="flex items-center gap-4 mb-8">
            <Tag className="w-8 h-8 text-[#E23378]" />
            <h2 className="text-3xl font-bold text-gray-900">Top Offers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
  {topOffers.length > 0 ? (
    <SmallCard products={topOffers}
    classname="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8" />
  ) : (
    <p>No top offers available</p>
  )}
</div>

        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <TrendingUp className="w-8 h-8 text-[#E23378]" />
            <h2 className="text-3xl font-bold text-gray-900">Best Sellers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
            {bestSellers.length > 0 ? (
              <SmallCard products={bestSellers}  />
            ) : (
              <p>No best sellers available</p>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Sparkles className="w-8 h-8 text-[#E23378]" />
            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          </div>
          {Object.entries(categories).map(([category, products]) => (
            <div key={category} className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                {category.charAt(0).toUpperCase() + category.slice(1)}'s Collection
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
                {products.length > 0 ? (
                  <SmallCard products={products}
                  classname="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8" />
                ) : (
                  <p>No products available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
