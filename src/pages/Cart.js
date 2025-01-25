import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2 } from "lucide-react";
import { BASE_URL } from "../App";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const [s, setError] = useState('');

  const calculateOfferPercent = (original, discounted) => {
    return Math.round(((original - discounted) / original) * 100);
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const email = localStorage.getItem("useremail");
      if (!email) {
        navigate('/landing');
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/user/profile/${email}`);
        setProfile(response.data);
      } catch (err) {
        setError('Failed to load profile');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate])

  const fetchCart = async () => {
    try {
      const email = localStorage.getItem("useremail");
      if (!email) {
        console.error("User email not found in localStorage.");
        return;
      }

      const userResponse = await axios.get(`${BASE_URL}/user/getuserid/${email}`);
      const userId = userResponse.data;

      const response = await axios.get(`${BASE_URL}/cart/getproducts/${userId}`);
      setCartProducts(response.data || []);
      setLoading(false);

      response.data.forEach((product) => {
        fetchProductQuantity(userId, product.id);
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
      setLoading(false);
    }
  };

  const fetchProductQuantity = async (userId, productId) => {
    try {
      const response = await axios.get(`${BASE_URL}/cart/quantity/${userId}/${productId}`);
      setQuantities((prev) => ({ ...prev, [productId]: response.data }));
    } catch (error) {
      console.error(`Error fetching quantity for product ${productId}:`, error);
    }
  };

  const remove = async (product) => {
    try {
      const email = localStorage.getItem("useremail");
      if (!email) {
        console.error("User email not found in localStorage.");
        return;
      }

      const userResponse = await axios.get(`${BASE_URL}/user/getuserid/${email}`);
      const userId = userResponse.data;

      await axios.delete(`${BASE_URL}/cart/delcart/${userId}/${product.id}`);
      setCartProducts((prev) => prev.filter((item) => item.id !== product.id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductSelect = (product) => {
    navigate(`/displaycard/${product.id}`);
  };

  const handleCheckout = async () => {
    try {
      const email = localStorage.getItem("useremail");
      const userResponse = await axios.get(`${BASE_URL}/user/getuserid/${email}`);
      const userId = userResponse.data;

     
      const totalDiscounted = cartProducts.reduce((sum, product) => {
        const quantity = quantities[product.id] || 1;
        return sum + (product.discountedPrice || product.originalPrice) * quantity;
      }, 0);

      const tax = Math.round(totalDiscounted * 0.1);
      const shipping = 99;
      const total = totalDiscounted + tax + shipping;

      // Prepare the message content for the email
      let message = `Order Details for ${email}:\n\n`;

      cartProducts.forEach((product) => {
        const quantity = quantities[product.id] || 1;
        const totalPrice = product.discountedPrice
          ? product.discountedPrice * quantity
          : product.originalPrice * quantity;
        message += `Product: ${product.title}\nQuantity: ${quantity}\nPrice: ₹${totalPrice}\n\n`;
      });

      message += `Subtotal: ₹${totalDiscounted}\nTax: ₹${tax}\nShipping: ₹${shipping}\nTotal: ₹${total}`;

      // Send the email
      const orderData = {
        name: profile.username,// Use the name as Aura
        email: email,
        message: message,
      };

      await axios.post(`${BASE_URL}/checkout`, orderData);

      // Optionally, navigate to a confirmation page or show a success message
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const totalDiscounted = cartProducts.reduce((sum, product) => {
    const quantity = quantities[product.id] || 1;
    return sum + (product.discountedPrice || product.originalPrice) * quantity;
  }, 0);

  const tax = Math.round(totalDiscounted * 0.1);
  const shipping = 99; // Fixed shipping cost
  const total = totalDiscounted + tax + shipping;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500">Loading your cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <ShoppingBag className="w-8 h-8 text-[#E23378] mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
        </div>

        {cartProducts.length === 0 ? (
          <div className="text-center py-28 bg-white rounded-lg shadow-sm">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#E23378] hover:bg-[#c92e69] transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cartProducts.map((product) => {
                const quantity = quantities[product.id] || 1;
                const totalOriginalPrice = product.originalPrice * quantity;
                const totalDiscountedPrice = product.discountedPrice
                  ? product.discountedPrice * quantity
                  : null;
                const discountPercent = product.discountedPrice
                  ? calculateOfferPercent(product.originalPrice, product.discountedPrice)
                  : null;

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="p-6 flex items-center space-x-6">
                      <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          className="h-full w-full object-cover"
                          src={product.imageUrl}
                          alt={product.title}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div 
                          className="cursor-pointer"
                          onClick={() => handleProductSelect(product)}
                        >
                          <h3 className="text-lg font-semibold text-gray-900 capitalize hover:text-[#E23378] transition-colors duration-200">
                            {product.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 capitalize">{product.brand}</p>
                        </div>

                        <div className="mt-4 flex items-center space-x-4">
                          <div className="flex items-center border rounded-md px-4 py-2 bg-gray-100">
                            <span className="text-gray-900 font-medium">{quantity}</span>
                          </div>
                          <button
                            onClick={() => remove(product)}
                            className="flex items-center px-3 py-3 border rounded-md bg-gray-100 text-sm text-[#E23378] hover:text-red-600 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4   " />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-medium text-gray-900">
                          {totalDiscountedPrice ? (
                            <>
                              <div className="text-sm text-gray-500 line-through">
                                ₹{totalOriginalPrice}
                              </div>
                              <div className="text-black">
                                ₹{totalDiscountedPrice}
                              </div>
                              <div className="text-sm text-[#E23378]">
                                {discountPercent}% off
                              </div>
                            </>
                          ) : (
                            <div>₹{totalOriginalPrice}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{totalDiscounted}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="text-gray-900">₹{tax}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">₹{shipping}</span>
                  </div>

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-[#E23378]">₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="mt-6 w-full py-3 text-white bg-[#E23378] rounded-md hover:bg-[#c92e69] transition-colors duration-200"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
