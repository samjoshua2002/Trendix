import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import { BASE_URL } from "../App";
import axios from "axios";
import Comment from "./Comment";
import { Star } from "react-feather"; // Importing Star icon
import Navbar from "../Navbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Displaycard = () => {
  
  const { allproducts, setCartCount } = useContext(AppContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState(null);
  const [incart, setIncart] = useState(false);

  useEffect(() => {
    const foundProduct = allproducts.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setImage(foundProduct.imageUrl);
    }
  }, [id, allproducts]);

  useEffect(() => {
    const fetchCartStatus = async () => {
      try {
        const email = localStorage.getItem("useremail");
        if (!email) throw new Error("User email not found in localStorage.");

        const { data: userId } = await axios.get(
          `${BASE_URL}/user/getuserid/${email}`
        );
        const { data: isInCart } = await axios.get(
          `${BASE_URL}/cart/incart/${userId}/${id}`
        );
        setIncart(isInCart);
      } catch (error) {
        console.error("Error fetching cart status:", error.message);
      }
    };

    fetchCartStatus();
  }, [id]);

  const fetchCartCount = async () => {
    try {
      const email = localStorage.getItem("useremail");
      if (!email) throw new Error("User email not found in localStorage.");

      const { data: userId } = await axios.get(
        `${BASE_URL}/user/getuserid/${email}`
      );
      const { data: cartCount } = await axios.get(
        `${BASE_URL}/cart/count/${userId}`
      );
      setCartCount(cartCount);
    } catch (error) {
      console.error("Error fetching cart count:", error.message);
    }
  };

  const addToCart = async () => {
    if (!size) {
     toast.info("Please select a size.");
      return;
    }
    try {
      const email = localStorage.getItem("useremail");
      if (!email) throw new Error("User email not found in localStorage.");

      const { data: userId } = await axios.get(
        `${BASE_URL}/user/getuserid/${email}`
      );
      await axios.post(`${BASE_URL}/cart/addcart/${userId}/${product.id}`);
      setIncart(true);
      fetchCartCount();
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  const removeFromCart = async () => {
    try {
      const email = localStorage.getItem("useremail");
      if (!email) throw new Error("User email not found in localStorage.");

      const { data: userId } = await axios.get(
        `${BASE_URL}/user/getuserid/${email}`
      );
      await axios.delete(`${BASE_URL}/cart/delcart/${userId}/${product.id}`);
      setIncart(false);
      fetchCartCount();
    } catch (error) {
      console.error("Error removing from cart:", error.message);
    }
  };

  const addToWishlist = async () => {
    
    try {
      const email = localStorage.getItem("useremail");
      if (!email) throw new Error("User email not found in localStorage.");

      const { data: userId } = await axios.get(
        `${BASE_URL}/user/getuserid/${email}`
      );
      await axios.post(
        `${BASE_URL}/wishlist/addwishlist/${userId}/${product.id}`
      );
      setProduct((prevProduct) => ({
        ...prevProduct,
        isLiked: true,
      }));
    } catch (error) {
      console.error("Error adding to wishlist:", error.message);
    }
  };

  const removeFromWishlist = async () => {
    try {
      const email = localStorage.getItem("useremail");
      if (!email) throw new Error("User email not found in localStorage.");

      const { data: userId } = await axios.get(
        `${BASE_URL}/user/getuserid/${email}`
      );
      await axios.delete(
        `${BASE_URL}/wishlist/delwishlist/${userId}/${product.id}`
      );
      setProduct((prevProduct) => ({
        ...prevProduct,
        isLiked: false,
      }));
    } catch (error) {
      console.error("Error removing from wishlist:", error.message);
    }
  };

  if (!product) return <div>Loading...</div>;

  const calculateOfferPercent = () => {
    if (product.originalPrice && product.discountedPrice) {
      return Math.round(
        ((product.originalPrice - product.discountedPrice) /
          product.originalPrice) *
          100
      );
    }
    return 0;
  };

  return (
    <div>
      <Navbar />
      <ToastContainer/>
      <div className="bg-gray-50 pt-24 sm:pt-20 pb-16" key={id}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-12">
            {/* Product Images */}
            <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4">
              <div className="flex h-[80%] sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-evenly sm:w-[25%] w-full md:pr-3">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-20 sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-lg border shadow-sm hover:opacity-80 transition-all"
                  onClick={() => setImage(product.imageUrl)}
                />
              </div>
              <div className="w-full sm:w-[80%]">
                <img
                  src={image}
                  alt={product.title}
                  className="w-full h-[80%] rounded-xl shadow-lg"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <h1 className="font-bold text-3xl text-gray-800 mt-2">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center mt-2 gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={20}
                    color={index < product.rating ? "#FFD700" : "#D3D3D3"}
                    fill={index < product.rating ? "#FFD700" : "none"}
                  />
                ))}
                <span className="text-gray-600 text-sm ml-2">
                  ({product.ratingCount} ratings)
                </span>
              </div>

              {/* Prices */}
              <div className="flex  items-center gap-5">

              <p className="mt-5 text-2xl font-semibold text-gray-900">
                ₹{product.discountedPrice || product.originalPrice}
              </p>
              {product.discountedPrice && product.originalPrice && (
                  <p className="text-lg mt-6 font-medium text-gray-500 line-through">
                  ₹{product.originalPrice}
                </p>
              )}
              </div>
              {product.discountedPrice && product.originalPrice && (
                <p className="text-[#E23378] text-sm font-bold mt-2">
                  Save {calculateOfferPercent()}%!
                </p>
              )}

              <p className="mt-5 text-gray-600">{product.description}</p>

              {/* Select Size */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="flex flex-col gap-4 mt-8">
                  <p className="font-semibold text-gray-800">Select Size</p>
                  <div className="flex gap-4">
                    {product.sizes.map((sizeOption, index) => (
                      <button
                        key={index}
                        onClick={() => setSize(sizeOption)}
                        className={`border py-2 px-4 text-sm font-medium rounded-md ${
                          size === sizeOption
                            ? "border-black bg-gray-200"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {sizeOption}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-6">
                {incart ? (
                  <button
                    onClick={removeFromCart}
                    className="flex items-center justify-center gap-2 w-48 text-white px-8 py-3 rounded-md transition-all bg-red-500 hover:bg-red-600"
                  >
                    Remove from cart
                  </button>
                ) : (
                  <button
                    onClick={addToCart}
                    className="flex items-center justify-center gap-2 w-48 text-white px-8 py-3 rounded-md transition-all bg-green-500 hover:bg-green-600"
                  >
                    Add to Cart
                  </button>
                )}
                {product.isLiked ? (
                  <button
                    onClick={removeFromWishlist}
                    className="flex items-center justify-center gap-2 w-48 text-white px-8 py-3 rounded-md transition-all bg-[#E23378] hover:bg-pink-500"
                  >
                    In Wishlist
                  </button>
                ) : (
                  <button
                    onClick={addToWishlist}
                    className="flex items-center justify-center gap-2 w-48 text-black px-8 py-3 rounded-md transition-all bg-[#64748b] hover:bg-gray-100 border-black"
                  >
                    Add to Wishlist
                  </button>
                )}
              </div>

              <hr className="mt-8 sm:w-4/5" />
              <div className="text-sm text-gray-500 mt-5 flex flex-col gap-2">
                <p>100% Original product.</p>
                <p>Cash on delivery is available on this product.</p>
                <p>Easy return and exchange policy within 7 days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="  bg-gray-50  justify-start pb-16">
  <Comment />
</div>



    </div>
  );
};

export default Displaycard;
