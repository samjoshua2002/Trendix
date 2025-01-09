import React from 'react'

function Features() {
  return (
    <div>
         <section className="py-10 bg-white">
        <div className="container mx-auto text-center space-y-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Why Shop With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-5 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800">Quality Materials</h3>
              <p className="text-gray-600">
                We use the finest fabrics to ensure comfort and style in every piece.
              </p>
            </div>
            <div className="p-5 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800">Affordable Prices</h3>
              <p className="text-gray-600">
                Luxury doesn't have to break the bank. Shop premium quality at great prices.
              </p>
            </div>
            <div className="p-5 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800">Fast Shipping</h3>
              <p className="text-gray-600">
                Enjoy quick and reliable delivery for all your favorite styles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features