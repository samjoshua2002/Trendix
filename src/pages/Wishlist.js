import React, { useEffect, useState } from "react";
import axios from "axios";
import Csmallcard from "./HomeCard";
import { BASE_URL } from "../App";
import {  Sparkles } from 'lucide-react';
import { FaSpinner, FaExclamationTriangle, FaHeartBroken } from "react-icons/fa";

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
        
        // Set the products with a default liked state (true for liked)
        const updatedProducts = products.map((product) => ({
          ...product,
          isLiked: true, // Default liked state for the wishlist
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
  }, []); // This useEffect only runs once when the component mounts

  const handleLikeToggle = async (id) => {
    setWishlistProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === id
          ? { ...product, isLiked: !product.isLiked } // Toggle the like status
          : product
      );
      
      // If the product is unliked, remove it from the list
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
      
      // Update wishlist on the server with the latest wishlistProducts state
      await axios.post(`${BASE_URL}/wishlist/updateproducts/${userid}`, wishlistProducts); 
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };

  return (
    <div className="bg-white  shadow-sm  py-20 sm:pt-20">




<div className="relative w-full p-6 ">
  <div className="absolute top-0 left-0 right-0 flex items-center justify-center z-10 gap-4">
    <Sparkles className="text-gray-400 w-12 h-12" />
    <h1 className="text-4xl font-semibold text-gray-400">Wishlist</h1>
  </div>
</div>
     

{/* Main Content */}
<div className="max-w-full mx-auto px-4 sm:px-20  sm:pt-12">
  <div className="flex items-center justify-center min-h-[300px]">
    {loading ? (
      <div className="flex flex-col items-center text-center">
        <FaSpinner className="animate-spin text-gray-400 w-16 h-16 mt-56" />
        <p className="text-gray-500 text-lg">Loading wishlist...</p>
      </div>
    ) : error ? (
      <div className="flex flex-col items-center text-center">
        <FaExclamationTriangle className="text-red-500 w-16 h-16 mt-56" />
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    ) : wishlistProducts.length > 0 ? (
      <Csmallcard
        products={wishlistProducts} // Pass the entire array as products
        classname="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-9"
        handleLikeToggle={handleLikeToggle} // Pass handleLikeToggle to SmallCard
      />
    ) : (
      <div className="flex flex-col items-center text-center mt-52">
        <FaHeartBroken className="text-gray-400 w-16 h-16 mb-4" />
        <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
      </div>
    )}
  </div>
</div>

    </div>
  );
};

export default Wishlist;
