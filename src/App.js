import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Navbar from "./Navbar";
import Landing2 from "./pages/Auth";
import Form from "./pages/Form";
import Displaycard from "./pages/Displaycard";
import OrderConfirmation from "./pages/OrderConfirmation";

// Create a context
export const AppContext = createContext();
// export const BASE_URL = "https://shoppingserver-q9kv.onrender.com";
export const BASE_URL = "http://localhost:8081";

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [allproducts, setAllproducts] = useState([]);

  // Check if user is registered based on localStorage
  useEffect(() => {
    const userStatus = localStorage.getItem("trendix");
    if (userStatus === "true") {
      setIsRegistered(true);
    }
  }, []);

  // Fetch products with likes
  useEffect(() => {
    const fetchProductsWithLikes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/product/getall`);
        const products = response.data;

        const email = localStorage.getItem("useremail");
        if (email) {
          const userResponse = await axios.get(`${BASE_URL}/user/getuserid/${email}`);
          const userId = userResponse.data;

          const enrichedProducts = await Promise.all(
            products.map(async (product) => {
              const isLikedResponse = await axios.get(`${BASE_URL}/wishlist/isLiked/${userId}/${product.id}`);
              return {
                ...product,
                isLiked: isLikedResponse.data,
              };
            })
          );

          setAllproducts(enrichedProducts);
        } else {
          setAllproducts(products);
        }
      } catch (error) {
        console.error("Failed to fetch products with likes:", error);
      }
    };

    fetchProductsWithLikes();
  }, []);

  // Function to handle like/unlike toggle
  const handleLikeToggle = async (productId) => {
    try {
      const email = localStorage.getItem("useremail");
      if (!email) return;

      const userResponse = await axios.get(`${BASE_URL}/user/getuserid/${email}`);
      const userId = userResponse.data;

      const productIndex = allproducts.findIndex((p) => p.id === productId);
      if (productIndex === -1) return;

      const isLiked = allproducts[productIndex].isLiked;

      // Optimistically update the UI
      const updatedProducts = [...allproducts];
      updatedProducts[productIndex].isLiked = !isLiked;
      setAllproducts(updatedProducts);

      // Perform the backend operation
      if (isLiked) {
        await axios.post(`${BASE_URL}/wishlist/unlike/${userId}/${productId}`);
        await axios.delete(`${BASE_URL}/wishlist/delwishlist/${userId}/${productId}`);
      } else {
        await axios.post(`${BASE_URL}/wishlist/like/${userId}/${productId}`);
        await axios.post(`${BASE_URL}/wishlist/addwishlist/${userId}/${productId}`);
      }
    } catch (error) {
      console.error("Error toggling like status:", error);
    }
  };

  return (
    <AppContext.Provider value={{ isRegistered, setIsRegistered, allproducts, handleLikeToggle }}>
      <Router>
        <MainContent isRegistered={isRegistered} />
      </Router>
    </AppContext.Provider>
  );
}

// MainContent Component - handles routing and navbar visibility
function MainContent({ isRegistered }) {
  const location = useLocation();

  return (
    <div>
      {/* Show Navbar only on specific routes */}
      {["/home","/cart", "/profile", "/collections", "/about", "/wishlist","/displaycard/:id"].includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={isRegistered ? <Navigate to="/home" /> : <Landing2 />} />
        <Route path="/home" element={<Home />} />
        <Route path="/landing" element={<Landing2 />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Form />} />
        <Route path="/displaycard/:id" element={<Displaycard/>} />
        <Route path="/order-confirmation" element={<OrderConfirmation/>} />
      </Routes>
    </div>
  );
}

export default App;
