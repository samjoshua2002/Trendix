import React, { useEffect, useState } from "react";
import axios from "axios";
import Csmallcard from "./HomeCard";
import { BASE_URL } from "../App";
import { Sparkles, Heart, Loader2, AlertTriangle } from 'lucide-react';

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const email = localStorage.getItem("useremail");
        if (!email) {
          throw new Error("User email not found in local storage.");
        }

        const { data: userid } = await axios.get(`${BASE_URL}/user/getuserid/${email}`);
        const { data: products } = await axios.get(`${BASE_URL}/wishlist/getproducts/${userid}`);
        
        const updatedProducts = products.map((product) => ({
          ...product,
          isLiked: true,
        }));
        
        setWishlistProducts(updatedProducts || []);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setError(err.message || "An error occurred while fetching your wishlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleLikeToggle = async (id) => {
    setWishlistProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === id
          ? { ...product, isLiked: !product.isLiked }
          : product
      );
      
      if (updatedProducts.find((product) => product.id === id && !product.isLiked)) {
        return updatedProducts.filter((product) => product.id !== id);
      }
      
      return updatedProducts;
    });

    try {
      const email = localStorage.getItem("useremail");
      if (!email) {
        throw new Error("User email not found in local storage.");
      }

      const { data: userid } = await axios.get(`${BASE_URL}/user/getuserid/${email}`);
      await axios.post(`${BASE_URL}/wishlist/updateproducts/${userid}`, wishlistProducts);
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-24">
        
        <div className="relative mb-12">
          <div className="flex items-center justify-center space-x-4">
            <div className="bg-pink-50 p-3 rounded-full">
              <Sparkles className="w-8 h-8 text-pink-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              My Wishlist
            </h1>
          </div>
          
        </div>

        {/* Main Content */}
        <div className="relative min-h-[400px]">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
              <p className="text-lg text-gray-600 animate-pulse">
                Loading your wishlist...
              </p>
            </div>
          ) : error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="bg-red-50 p-4 rounded-full mb-4">
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>
              <p className="text-lg text-red-600 text-center max-w-md">
                {error}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-full transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          ) : wishlistProducts.length > 0 ? (
            <div className="w-full">
              <Csmallcard
                products={wishlistProducts}
                classname="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8"
                handleLikeToggle={handleLikeToggle}
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center  justify-center">
              <div className="bg-gray-50 p-6 rounded-full mb-2">
                <Heart className="w-16 h-16 text-gray-300" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-600 text-center max-w-md mb-8">
                Start adding items to your wishlist by clicking the heart icon on products you love
              </p>
              <button 
                onClick={() => window.location.href = '/'}
                className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Explore Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;