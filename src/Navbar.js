import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, ShoppingCart, Heart, Info, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./App";

export default function Navbar() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchProfile = async () => {
      const email = localStorage.getItem("useremail");
      if (!email) {
        navigate("/landing");
        return;
      }

      try {
        const response = await axios.get(
          `${BASE_URL}/user/profile/${email}`
        );
        setProfile(response.data);
      } catch (err) {
        setError("Failed to load profile");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div
      className="relative"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
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
                <Link
                  to="/collections"
                  className="text-black hover:text-pink-700"
                >
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
          <Link to="/profile" className="overflow-hidden border-3 border-gray">
            <div className="flex justify-center">
              {profile && (
                <div className="w-8 h-8 rounded-full bg-black  flex items-center justify-center hover:bg-pink-600">
                  <span className="text-sm font-bold text-white">
                    {profile.username.charAt(0)}
                  </span>
                </div>
              )}
            </div>
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
