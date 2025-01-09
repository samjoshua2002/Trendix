import React, { useState, useEffect, createContext } from "react"; // Import necessary hooks and createContext
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom"; // Import Router components
import axios from 'axios'; // Make sure axios is imported
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Navbar from "./Navbar";
import Landing2 from "./pages/Auth";

// Create a context
export const AppContext = createContext();

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [allproducts, setAllproducts] = useState([]); // Declare state for all products

  // Check if user is registered based on localStorage
  useEffect(() => {
    const userStatus = localStorage.getItem("allinall");
    if (userStatus === "true") {
      setIsRegistered(true);
    }
  }, []);

  // Fetch products with likes
  useEffect(() => {
    const fetchProductsWithLikes = async () => {
      try {
        const response = await axios.get("https://shoppingserver-q9kv.onrender.com/product/getall");
        console.log(response.data); // Log the response to check the data
        const products = response.data;

        const email = localStorage.getItem('useremail');
        if (email) {
          const userResponse = await axios.get(`https://shoppingserver-q9kv.onrender.com/user/getuserid/${email}`);
          const userId = userResponse.data;

          // Fetch isLiked for each product
          const enrichedProducts = await Promise.all(
            products.map(async (product) => {
              const isLikedResponse = await axios.get(`https://shoppingserver-q9kv.onrender.com/wishlist/isLiked/${userId}/${product.id}`);
              return {
                ...product,
                isLiked: isLikedResponse.data, // Add isLiked dynamically
              };
            })
          );

          setAllproducts(enrichedProducts);
        } else {
          setAllproducts(products); // Fallback if user not logged in
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
      const email = localStorage.getItem('useremail');
      if (!email) return; // Exit if user is not logged in

      const userResponse = await axios.get(`https://shoppingserver-q9kv.onrender.com/user/getuserid/${email}`);
      const userId = userResponse.data;

      const productIndex = allproducts.findIndex((p) => p.id === productId);
      if (productIndex === -1) return;

      const isLiked = allproducts[productIndex].isLiked;

      // Optimistically update the UI to reflect the like/unlike action immediately
      const updatedProducts = [...allproducts];
      updatedProducts[productIndex].isLiked = !isLiked;
      setAllproducts(updatedProducts);

      // Now perform the backend operation
      if (isLiked) {
        // Unlike the product
        await axios.post(`https://shoppingserver-q9kv.onrender.com/wishlist/unlike/${userId}/${productId}`);
        await axios.delete(`https://shoppingserver-q9kv.onrender.com/wishlist/delwishlist/${userId}/${productId}`);
      } else {
        // Like the product
        await axios.post(`https://shoppingserver-q9kv.onrender.com/wishlist/like/${userId}/${productId}`);
        await axios.post(`https://shoppingserver-q9kv.onrender.com/wishlist/addwishlist/${userId}/${productId}`);
      }
    } catch (error) {
      console.error("Error toggling like status:", error);
      // If error occurs, optionally alert the user or handle the error more gracefully.
      // We should **not revert the UI state** because it would cause flickering.
    }
  };

  // Provide context and wrap with Router and MainContent
  return (
    <AppContext.Provider value={{ isRegistered, setIsRegistered, allproducts, handleLikeToggle }}>
      <Router>
        <MainContent isRegistered={isRegistered} setIsRegistered={setIsRegistered} />
      </Router>
    </AppContext.Provider>
  );
}

// MainContent Component - handles routing and navbar visibility
function MainContent({ isRegistered }) {
  const location = useLocation();

  return (
    <div>
      {/* Show Navbar only on certain routes */}
      {(location.pathname === "/home" || location.pathname === "/cart" || location.pathname === "/profile" || location.pathname === "/collections" || location.pathname === "/about" || location.pathname === "/wishlist") && <Navbar />}

      <Routes>
        {/* Redirect to home if user is registered */}
        <Route path="/" element={isRegistered ? <Navigate to="/home" /> : <Landing2 />} />
        
        {/* Define Routes for other pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/landing" element={<Landing2 />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
