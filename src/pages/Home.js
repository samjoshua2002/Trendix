import React, { useContext } from 'react';
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
    <div className="min-h-screen ">
    <main class="flex flex-1  w-full flex-col items-center justify-center text-center px-4 gap-1 sm:mt-32 mt-24 ">
  <div 
    class="border border-[#E23378] rounded-2xl py-1 px-4 text-black text-sm mb-5 hover:scale-105 transition duration-300 ease-in-out">
    Explore the amazing &nbsp;
    <span class="font-semibold">Trendix</span> shopping experience
  </div>
  
  <h1 class="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-[#E23378] sm:text-7xl">
    Shop the Latest
    <span class="relative whitespace-nowrap text-[#E23378]">
      <svg aria-hidden="true" viewBox="0 0 418 42" class="absolute top-2/3 left-0 h-[0.58em] w-full fill-[#E23378]/70" preserveAspectRatio="none">
        <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
      </svg>
      <span class="relative">Trends</span>
    </span>
    and Offers
  </h1>
  
  <p class="mx-auto mt-12 max-w-xl text-lg text-gray-800 leading-7">
    Looking for the best deals and trending products? Discover the latest fashion, electronics, and more. Trendix brings you exclusive offers and discounts to make your shopping experience unforgettable.
  </p>
  
  <a class="bg-[#E23378] rounded-xl text-white font-medium px-6 py-3 sm:mt-10 mt-8 hover:bg-[#E23378]/80 transition duration-300 ease-in-out" href="#offers">
    Check out Offers →
  </a>
</main>




      {/* Top Offers Section */}
      <section id="offers" className="py-20 bg-white">
        <div className="container mx-auto  px-4">
          <div className="flex items-center gap-4 mb-8">
            <Tag className="w-8 h-8 text-[#E23378]" />
            <h2 className="text-3xl font-bold text-gray-900">Top Offers</h2>
          </div>
          <div className="w-full">
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
          <div className="w-full">
            {bestSellers.length > 0 ? (
              <SmallCard products={bestSellers} />
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
              <div className="w-full">
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
