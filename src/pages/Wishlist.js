import React, { useEffect, useState } from "react";
import axios from "axios";
import Csmallcard from "./HomeCard";
import { BASE_URL } from "../App";

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

      {/* Banner with Collections Heading */}
      <div className="absolute sm:left-16 w-full bg-gradient-to-r p-4">
        <h1 className="text-3xl font-semibold">Wishlist</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-full mx-auto px-4  sm:px-20 pt-20 sm:pt-16">
        <div className="flex items-center justify-center">
          {loading ? (
            <p className="text-center text-gray-500">Loading wishlist...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : wishlistProducts.length > 0 ? (
            <Csmallcard
              products={wishlistProducts} // Pass the entire array as products
              classname="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-9"

              handleLikeToggle={handleLikeToggle} // Pass handleLikeToggle to SmallCard
            />
          ) : (
            <p className="text-center text-gray-500">Your wishlist is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
