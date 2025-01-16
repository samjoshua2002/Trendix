import React from 'react';
import { FaCheckCircle, FaDollarSign, FaShippingFast } from 'react-icons/fa';

function Features() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto text-center space-y-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-800">
          Why Shop With Us?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover what makes us the best choice for your shopping needs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quality Materials */}
          <div className="p-6 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center items-center mb-4">
              <FaCheckCircle className="text-4xl " />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Quality Materials
            </h3>
            <p className="text-gray-600">
              We use the finest fabrics to ensure comfort and style in every piece.
            </p>
          </div>
          {/* Affordable Prices */}
          <div className="p-6 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center items-center mb-4">
              <FaDollarSign className="text-4xl " />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Affordable Prices
            </h3>
            <p className="text-gray-600">
              Luxury doesn't have to break the bank. Shop premium quality at great prices.
            </p>
          </div>
          {/* Fast Shipping */}
          <div className="p-6 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center items-center mb-4">
              <FaShippingFast className="text-4xl " />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Fast Shipping
            </h3>
            <p className="text-gray-600">
              Enjoy quick and reliable delivery for all your favorite styles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
