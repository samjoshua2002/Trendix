import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, ShoppingCart, Heart, Info, ShoppingBag } from "lucide-react"; 
import { motion } from "framer-motion"; 

export default function Navbar() {
  const [value, setValue] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative" style={{ WebkitTapHighlightColor: "transparent" }}>
      <motion.nav
        className="bg-white  top-0 left-0 w-full cursor-pointer z-50"
        initial={{ y: -100 }} 
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div className="lg:px-10 py-4 ml-10 mr-10 flex justify-between items-center">
        
          <div className="text-slate-900 text-2xl lg:text-3xl font-semibold fancy-font">
            Trendix
          </div>
          
          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex items-center gap-5 justify-center flex-grow">
  <ul className="flex text-slate-900 gap-5 font-serif">
    <li className="relative group">
      <Link to="/" className="text-slate-900 hover:text-slate-950">
        Home
        <span className="absolute left-1/2 bottom-[-4px] transform -translate-x-1/2 w-0 h-0.5 bg-slate-950 transition-all group-hover:w-1/2"></span>
      </Link>
    </li>
    <li className="relative group">
      <Link to="/collections" className="text-slate-900 hover:text-slate-950">
        Collections
        <span className="absolute left-1/2 bottom-[-4px] transform -translate-x-1/2 w-0 h-0.5 bg-slate-950 transition-all group-hover:w-1/2"></span>
      </Link>
    </li>
    <li className="relative group">
      <Link to="/about" className="text-slate-900 hover:text-slate-950">
        About
        <span className="absolute left-1/2 bottom-[-4px] transform -translate-x-1/2 w-0 h-0.5 bg-slate-950 transition-all group-hover:w-1/2"></span>
      </Link>
    </li>
    <li className="relative group">
      <Link to="/wishlist" className="text-slate-900 hover:text-slate-950">
        Wishlist
        <span className="absolute left-1/2 bottom-[-4px] transform -translate-x-1/2 w-0 h-0.5 bg-slate-950 transition-all group-hover:w-1/2"></span>
      </Link>
    </li>
    <li className="relative group">
      <Link to="/cart" className="text-slate-900 hover:text-slate-950">
        Cart
        <span className="absolute left-1/2 bottom-[-4px] transform -translate-x-1/2 w-0 h-0.5 bg-slate-950 transition-all group-hover:w-1/2"></span>
      </Link>
    </li>
  </ul>
</div>

       


          {/* Profile Picture with Link */}
          <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src="https://i.pinimg.com/736x/eb/42/f5/eb42f58ee7be658c8a64205394d0ff02.jpg" // Replace with your profile picture path
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </motion.nav>

      {/* Bottom Navigation Bar for Mobile Devices */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white shadow-md z-50 md:hidden"
        initial={{ y: 100 }} // Start off-screen
        animate={{ y: showNavbar ? 0 : 100 }} // Animate based on scroll state
        transition={{ type: "spring", stiffness: 100, damping: 20 }} // Smooth spring animation
        style={{ WebkitTapHighlightColor: "transparent" }} // Disable mobile blue highlight
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className="bg-white text-black"
        >
          <BottomNavigationAction
            label="Home"
            icon={<Home className="h-6 w-6" />}
            component={Link}
            to="/"
            style={{ color: value === 0 ? "black" : "gray" }}
          />
          <BottomNavigationAction
            label="Collections"
            icon={<ShoppingBag className="h-6 w-6" />}
            component={Link}
            to="/collections"
            style={{ color: value === 1 ? "black" : "gray" }}
          />
          <BottomNavigationAction
            label="About"
            icon={<Info className="h-6 w-6" />}
            component={Link}
            to="/about"
            style={{ color: value === 2 ? "black" : "gray" }}
          />
          <BottomNavigationAction
            label="Wishlist"
            icon={<Heart className="h-6 w-6" />}
            component={Link}
            to="/wishlist"
            style={{ color: value === 3 ? "black" : "gray" }}
          />
          <BottomNavigationAction
            label="Cart"
            icon={<ShoppingCart className="h-6 w-6" />}
            component={Link}
            to="/cart"
            style={{ color: value === 4 ? "black" : "gray" }}
          />
          
        </BottomNavigation>
      </motion.div>
    </div>
  );
}
