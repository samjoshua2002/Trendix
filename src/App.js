import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom"; // Import useLocation
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Navbar from "./Navbar";
import Landing2 from "./pages/Auth";

function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const userStatus = localStorage.getItem("allinall");
    if (userStatus === "true") {
      setIsRegistered(true);
    }
  }, []);

  return (
    <Router>
      <MainContent isRegistered={isRegistered} />
    </Router>
  );
}

function MainContent({ isRegistered }) {
  const location = useLocation();

  return (
    <div>
       {(location.pathname === "/home" || location.pathname === "/cart"|| location.pathname === "/profile" ||  location.pathname === "/collections" || location.pathname === "/about" || location.pathname === "/wishlist") && <Navbar/>}

     
      <Routes>
        {/* Redirect to Landing2 if not registered, otherwise show Home */}
        <Route path="/" element={isRegistered ? <Navigate to="/home" /> : <Landing2 />} />

        <Route path="/home" element={<Home/>} />
        <Route path="/landing" element={<Landing2 />} />



        {/* Other routes */}
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
