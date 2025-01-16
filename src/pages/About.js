import React from 'react';
import { FaShoppingCart, FaTag, FaShippingFast, FaRegHeart } from 'react-icons/fa';
import Footer from '../Sections/Footer';
import Contact from '../Sections/Contact';


const About = () => {
  return (
    <div >
      <section className="overflow-hidden bg-white py-24  sm:pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-[#E23378]">Shop Smarter</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome to Trendix</p>
                <p className="mt-6 text-lg leading-8 text-gray-600">Discover the best deals and trends with Trendix, your go-to shopping platform.</p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <FaShoppingCart className="absolute left-1 top-1 h-5 w-5 text-[#E23378]" />
                      Easy Shopping &nbsp;
                    </dt>
                    <dd className="inline" > Browse through a wide range of products with a user-friendly shopping cart experience.</dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <FaTag className="absolute left-1 top-1 h-5 w-5 text-[#E23378]" />
                      Exclusive Deals
                    </dt>
                    <dd className="inline"> &nbsp; Get the best discounts and exclusive deals only available at Trendix.</dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <FaShippingFast className="absolute left-1 top-1 h-5 w-5 text-[#E23378]" />
                      Fast Delivery
                    </dt>
                    <dd className="inline"> &nbsp; Enjoy fast and reliable delivery services, ensuring your orders arrive on time.</dd>
                  </div>
                </dl>
              </div>
              <div className="mt-10 flex items-center gap-x-6">
                <a href="/home" className="rounded-md bg-[#E23378] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Start Shopping</a>
                <a href="#s" className="text-sm font-semibold leading-6 text-gray-700">Learn More <span aria-hidden="true">→</span></a>
              </div>
            </div>
            <img src="https://cdn.dribbble.com/userupload/16601757/file/original-dc4998569717e59c14db21d05cd99d37.png?resize=1024x768&vertical=center" alt="Product screenshot" className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width="2432" height="1442" />
          </div>
        </div>
      </section>

      <section id="s">
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="font-heading mb-4  px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest text-black uppercase title-font">
                Why Trendix?
              </h2>
              <p className="font-heading mt-2 text-3xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl">
                Your Ultimate Shopping Experience.
              </p>
              <p className="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
                We bring you the best products with unbeatable prices, all in one place.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500">
                      <FaShoppingCart />
                    </div>
                    <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">Easy Shopping</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Shop for everything you need in one place with a seamless and intuitive shopping experience.
                  </dd>
                </div>
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500">
                      <FaTag />
                    </div>
                    <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">Great Discounts</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Enjoy amazing discounts and exclusive deals on your favorite products.
                  </dd>
                </div>
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500">
                      <FaShippingFast />
                    </div>
                    <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">Fast Shipping</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Get your orders delivered quickly and safely with our reliable shipping service.
                  </dd>
                </div>
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500">
                      <FaRegHeart />
                    </div>
                    <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">Customer Satisfaction</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    We value our customers and strive to provide exceptional service and support.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section  >

      <Contact/>
      <Footer />
    </div>
  );
};

export default About;
