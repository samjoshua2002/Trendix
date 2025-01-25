import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import { BASE_URL } from "../App";
import axios from "axios";
import Comment from "./Comment";
import { Star, Heart, Truck, Shield, RefreshCw } from "lucide-react";
import Navbar from "../Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Displaycard = () => {
  const { allproducts, handleLikeToggle, setCartCount } = useContext(AppContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState(null);
  const [incart, setIncart] = useState(false);
  const [sizes, setSizes] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [quans, setQuans] = useState(1);

  const [ I, setIsImageHovered] = useState(false);

  useEffect(() => {
    const foundProduct = allproducts.find(
      (product) => product.id === parseInt(id)
    );
    if (foundProduct) {
      setProduct(foundProduct);
      setImage(foundProduct.imageUrl);
    }
  }, [id, allproducts]);

  const fetchCartCount = async () => {
    try {
      const email = localStorage.getItem("useremail");
      if (!email) {
        console.error("User email not found in localStorage.");
        return;
      }

      const userResponse = await axios.get(
        `${BASE_URL}/user/getuserid/${email}`
      );
      const userId = userResponse.data;

      const response = await axios.get(`${BASE_URL}/cart/count/${userId}`);
      setCartCount(response.data);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    const fetchCartStatus = async () => {
      try {
        const email = localStorage.getItem("useremail");
        if (!email) {
          console.error("User email not found in localStorage.");
          return;
        }

        const userResponse = await axios.get(
          `${BASE_URL}/user/getuserid/${email}`
        );
        const userId = userResponse.data;

        const response = await axios.get(
          `${BASE_URL}/cart/incart/${userId}/${id}`
        );
        setIncart(response.data);
      } catch (error) {
        console.error("Error fetching cart status:", error);
      }
    };

    fetchCartStatus();

    const fetchSize = async () => {
      try {
        const email = localStorage.getItem("useremail");
        if (!email) {
          console.error("User email not found in localStorage.");
          return;
        }

        const userResponse = await axios.get(
          `${BASE_URL}/user/getuserid/${email}`
        );
        const userId = userResponse.data;

        const response = await axios.get(
          `${BASE_URL}/cart/size/${userId}/${id}`
        );
        const quan = await axios.get(
          `${BASE_URL}/cart/quantity/${userId}/${id}`
        );
        setSizes(response.data);
        setQuans(quan.data);
      } catch (error) {
        console.error("Error fetching cart status:", error);
      }
    };
    fetchSize();
  }, [id, quans]);

  const addToCart = async (product) => {
    if (!size) {
      toast.info("Please select a size.");
      return;
    }
    try {
      const email = localStorage.getItem("useremail");
      if (!email) {
        console.error("User email not found in localStorage.");
        return;
      }

      const userResponse = await axios.get(
        `${BASE_URL}/user/getuserid/${email}`
      );
      const userId = userResponse.data;

      await axios.post(
        `${BASE_URL}/cart/addcart/${userId}/${product.id}/${size}/${quantity}`
      );
      setIncart(true);
      setSizes(size);
      setQuans(quantity);
      fetchCartCount();
      toast.success("Added to cart successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async (product) => {
    try {
      const email = localStorage.getItem("useremail");
      if (!email) {
        console.error("User email not found in localStorage.");
        return;
      }

      const userResponse = await axios.get(
        `${BASE_URL}/user/getuserid/${email}`
      );
      const userId = userResponse.data;

      await axios.delete(`${BASE_URL}/cart/delcart/${userId}/${product.id}`);
      setIncart(false);
      setSizes(null);
      setQuans(1);
      fetchCartCount();
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#E23378]"></div>
      </div>
    );
  }

  const calculateOfferPercent = (original, discounted) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ToastContainer />
      <div className="pt-24 sm:pt-20 pb-16" key={id}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Product Images */}
            <div className="flex-1 flex flex-col-reverse lg:flex-row gap-4">
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto hide-scrollbar justify-start lg:w-24 w-full gap-4 mt-4 lg:mt-0">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-20 h-20 object-cover flex-shrink-0 cursor-pointer rounded-lg border border-gray-200 shadow-sm hover:border-[#E23378] transition-all duration-300 transform hover:scale-105"
                  onClick={() => setImage(product.imageUrl)}
                />
              </div>
              <div className="w-full lg:flex-1 relative group">
                <div 
                  className="relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 transform hover:scale-[1.02]"
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                >
                  <img
                    src={image || product.imageUrl}
                    alt={product.title}
                    className="w-full h-[500px] object-cover rounded-2xl"
                  />
                  {product.discountedPrice && (
                    <div className="absolute top-4 left-4 bg-[#E23378] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {calculateOfferPercent(product.originalPrice, product.discountedPrice)}% OFF
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 lg:pl-8">
              <div className="sticky top-24">
                <h1 className="font-bold text-3xl text-gray-900 tracking-tight">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center mt-4 gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      className={`${
                        index < product.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      } transition-colors duration-200`}
                    />
                  ))}
                  <span className="text-gray-600 text-sm ml-2 font-medium">
                    ({product.ratingCount} ratings)
                  </span>
                </div>

                {/* Prices */}
                <div className="mt-6 flex items-baseline gap-4">
                  <p className="text-3xl font-bold text-gray-900">
                    ₹{product.discountedPrice || product.originalPrice}
                  </p>
                  {product.discountedPrice && product.originalPrice && (
                    <p className="text-lg font-medium text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </p>
                  )}
                </div>

                <p className="mt-6 text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Size Selection */}
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">
                      {incart ? "Selected Size" : "Select Size"}
                    </p>
                    {!incart && (
                      <button className="text-[#E23378] text-sm font-medium hover:underline">
                        Size Guide
                      </button>
                    )}
                  </div>
                  <div className="flex gap-3 mt-4">
                    {incart ? (
                      <span className="inline-flex items-center justify-center h-12 px-6 font-medium rounded-lg border-2 border-[#E23378] bg-pink-50 text-[#E23378]">
                        {sizes}
                      </span>
                    ) : (
                      product.sizes?.map((sizeOption, index) => (
                        <button
                          key={index}
                          onClick={() => setSize(sizeOption)}
                          className={`h-12 px-6 font-medium rounded-lg transition-all duration-200 ${
                            size === sizeOption
                              ? "border-2 border-[#E23378] bg-pink-50 text-[#E23378]"
                              : "border border-gray-300 hover:border-[#E23378] text-gray-700"
                          }`}
                        >
                          {sizeOption}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Quantity Selection */}
                <div className="mt-8">
                  <p className="font-semibold text-gray-900 mb-4">
                    {incart ? "Quantity" : "Select Quantity"}
                  </p>
                  {incart ? (
                    <span className="text-xl font-medium text-gray-700">
                      {quans}
                    </span>
                  ) : (
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#E23378] hover:text-[#E23378] transition-colors duration-200"
                      >
                        -
                      </button>
                      <span className="text-xl font-medium w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#E23378] hover:text-[#E23378] transition-colors duration-200"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => (incart ? remove(product) : addToCart(product))}
                    className={`flex-1 h-14 rounded-lg font-medium transition-all duration-200 ${
                      incart
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-[#E23378] hover:bg-[#c91e61] text-white"
                    }`}
                  >
                    {incart ? "Remove from Cart" : "Add to Cart"}
                  </button>
                  <button
                    onClick={() => {
                      handleLikeToggle(product.id);
                      toast(
                        product.isLiked
                          ? "Removed from wishlist"
                          : "Added to wishlist",
                        {
                          type: product.isLiked ? "info" : "success",
                        }
                      );
                    }}
                    className={`w-14 h-14 flex items-center justify-center rounded-lg transition-all duration-200 ${
                      product.isLiked
                        ? "bg-pink-100 text-[#E23378]"
                        : "border border-gray-300 text-gray-600 hover:border-[#E23378] hover:text-[#E23378]"
                    }`}
                  >
                    <Heart
                      size={24}
                      className={product.isLiked ? "fill-current" : ""}
                    />
                  </button>
                </div>

                {/* Features */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <Truck className="text-[#E23378]" size={24} />
                    <div>
                      <p className="font-medium text-gray-900">Free Delivery</p>
                      <p className="text-sm text-gray-600">2-3 business days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <Shield className="text-[#E23378]" size={24} />
                    <div>
                      <p className="font-medium text-gray-900">Genuine Product</p>
                      <p className="text-sm text-gray-600">100% authentic</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <RefreshCw className="text-[#E23378]" size={24} />
                    <div>
                      <p className="font-medium text-gray-900">Easy Returns</p>
                      <p className="text-sm text-gray-600">7 days policy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comments Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Customer Reviews
          </h2>
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default Displaycard;