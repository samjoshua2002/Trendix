import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, ShoppingCart, Heart, Info, ShoppingBag } from "lucide-react"; 
import { motion } from "framer-motion"; 

export default function Navbar() {
  const [value, setValue] = useState(0);

  return (
    <div className="relative" style={{ WebkitTapHighlightColor: "transparent" }}>
      <motion.nav
        className="fixed top-0 left-0 w-full cursor-pointer z-50 bg-white/30 backdrop-blur-md "
        initial={{ y: 0 }} 
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div className="lg:px-10 py-4 ml-10 mr-10 flex justify-between items-center relative">
        
          {/* Black Logo */}
          <div className="text-black text-3xl font-semibold fancy-font">
            Trendix
          </div>
          
          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex items-center gap-5 justify-center flex-grow">
            <ul className="flex text-white gap-5 font-serif">
              <li className="relative group">
                <Link to="/" className="text-black hover:text-pink-700">
                  Home
                  <span className="absolute left-1/2 bottom-[-4px] transform -translate-x-1/2 w-0 h-0.5 bg-pink-700 transition-all group-hover:w-1/2"></span>
                </Link>
              </li>
              <li className="relative group">
                <Link to="/collections" className="text-black hover:text-pink-700">
                  Collections
                  <span className="absolute left-1/2 bottom-[-4px] transform -translate-x-1/2 w-0 h-0.5 bg-pink-700 transition-all group-hover:w-1/2"></span>
                </Link>
              </li>
              <li className="relative group">
                <Link to="/about" className="text-black hover:text-pink-700">
                  About
                  <span className="absolute left-1/2 bottom-[-4px] transform -translate-x-1/2 w-0 h-0.5 bg-pink-700 transition-all group-hover:w-1/2"></span>
                </Link>
              </li>
              <li className="relative group">
                <Link to="/wishlist" className="text-black hover:text-pink-700">
                  Wishlist
                  <span className="absolute left-1/2 bottom-[-4px] transform -translate-x-1/2 w-0 h-0.5 bg-pink-700 transition-all group-hover:w-1/2"></span>
                </Link>
              </li>
              <li className="relative group">
                <Link to="/cart" className="text-black hover:text-pink-700">
                  Cart
                  <span className="absolute left-1/2 bottom-[-4px] transform -translate-x-1/2 w-0 h-0.5 bg-pink-700 transition-all group-hover:w-1/2"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Profile Picture with Link */}
          <Link to="/profile" className="w-12 h-12 rounded-full overflow-hidden border-3 border-gray">
            <img
              src="https://i.pinimg.com/736x/eb/42/f5/eb42f58ee7be658c8a64205394d0ff02.jpg" // Replace with your profile picture path
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </Link>
        </div>
      </motion.nav>

      {/* Decorative Elements (Only inside the nav, not affecting the entire page) */}
      {/* <div className="absolute top-0 left-0 w-24 h-24 bg-[#E23378] rounded-full blur-xl opacity-30 animate-pulse"></div> */}
      {/* <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-r from-[#E23378] to-pink-500 rounded-full blur-2xl opacity-40 animate-pulse"></div> */}

      {/* Bottom Navigation Bar for Mobile Devices */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white  z-50 md:hidden"
        initial={{ y: 100 }} // Start off-screen
        animate={{ y: 0 }} // Always show on mobile
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
            style={{ color: value === 3 ? "pink" : "gray" }}
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
