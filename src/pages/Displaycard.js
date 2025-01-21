import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import { BASE_URL } from "../App";
import axios from "axios";
import Comment from "./Comment";
import { Star } from "react-feather"; // Importing Star icon
import Navbar from "../Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Displaycard = () => {
  const { allproducts, handleLikeToggle, setCartCount } =
    useContext(AppContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState(null);
  const [incart, setIncart] = useState(false);
  const [sizes, setSizes] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [quans, setQuans] = useState(1);

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
    return <div>Loading...</div>;
  }

  const calculateOfferPercent = (original, discounted) => {
    return Math.round(((original - discounted) / original) * 100);
  };
  return (
    <div>
      <Navbar />
      <ToastContainer />
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
              {incart ? (
                <div className="mt-8">
                  <p className="font-semibold text-gray-800">Selected Size</p>
                  <div className="flex gap-4">
                    <span className="border py-2 px-4 text-sm font-medium rounded-md border-black bg-gray-200">
                      {sizes}
                    </span>
                  </div>
                </div>
              ) : (
                product.sizes &&
                product.sizes.length > 0 && (
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
                )
              )}
              <div className="">
                {incart ? (
                  <>
                    <div className="text-xl my-3">
                      <span className="text-lg">Quantity : </span>
                      {quans}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-gray-800 mt-3">
                      Select Quantity
                    </p>
                    <div className="flex gap-4 items-center font-medium my-3">
                      <div
                        className="text-3xl border-2 rounded border-gray-300 cursor-pointer pb-2 px-3"
                        onClick={() => {
                          setQuantity(quantity > 1 ? quantity - 1 : quantity);
                        }}
                      >
                        -
                      </div>
                      <div className="text-xl">{quantity}</div>
                      <div
                        className="text-3xl  border-2 rounded border-gray-300 cursor-pointer pb-2 px-2"
                        onClick={() => {
                          setQuantity(quantity + 1);
                        }}
                      >
                        +
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                {incart ? (
                  <button
                    onClick={() => remove(product)}
                    className="flex items-center justify-center gap-2 w-48 text-white px-8 py-3 rounded-md transition-all bg-red-500 hover:bg-red-600"
                  >
                    Remove from cart
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center justify-center gap-2 w-48 text-white px-8 py-3 rounded-md transition-all bg-green-500 hover:bg-green-600"
                  >
                    Add to Cart
                  </button>
                )}
                {product.isLiked ? (
                  <button
                    onClick={() => {
                      handleLikeToggle(product.id);
                      toast.info("Removed from wishlist");
                    }}
                    className="flex items-center justify-center gap-2 w-48 text-white px-8 py-3 rounded-md transition-all bg-[#E23378] hover:bg-pink-500"
                  >
                    In Wishlist
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleLikeToggle(product.id);
                      toast.success("Added to wishlist");
                    }}
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
