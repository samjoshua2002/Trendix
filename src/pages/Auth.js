import React, { useState, useEffect } from "react";
import TextInput from "../inputfields/TextInput";
import Password from "../inputfields/Password";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../App";

const Landing2 = () => {
  const [videoSource] = useState("/vid.mp4");
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    usernumber: "",
    useremail: "",
    userpassword: "",
    userotp: "",
  });

  const [userin, setUserin] = useState({
    useremail: "",
    userpassword: "",
  });

  const [registrationStep, setRegistrationStep] = useState("initial"); // initial, otpSent, otpVerified
  const [error, setError] = useState({
    username: "",
    userpassword: "",
  });

  const [change, setChange] = useState({
    signIn: true,
    register: false,
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleChange1 = (e) => {
    setUserin({ ...userin, [e.target.name]: e.target.value });
  };

  const signin = () => {
    setChange({ signIn: true, register: false });
    clearForm();
    setRegistrationStep("initial");
  };

  const signup = () => {
    setChange({ signIn: false, register: true });
    clearForm1();
    setRegistrationStep("initial");
  };

  const sendOTP = async (e) => {
    e.preventDefault();

    if (!user.username || !user.useremail || !user.usernumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const userData = {
        username: user.username,
        useremail: user.useremail,
        usernumber: user.usernumber ? parseInt(user.usernumber, 10) : null,
      };
      const response = await axios.post(`${BASE_URL}/user/register`, userData);

      if (response.data === "Registered successfully") {
        toast.success(`OTP sent to your email: ${user.useremail}`);
        setRegistrationStep("otpSent");
      } else {
        toast.error(response.data || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send OTP. Please try again later.");
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    if (!user.userotp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/user/verify-otp/${user.useremail}/${user.userotp}`
      );

      if (response.data === "User verified") {
        localStorage.setItem("username", user.username);
        toast.success("OTP verified successfully");
        setRegistrationStep("otpVerified");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  const completeRegistration = async (e) => {
    e.preventDefault();
    if (!user.userpassword) {
      toast.error("Please enter a password");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/user/setpassword/${user.useremail}/${user.userpassword}`
      );

      if (response.data === "Password has been set successfully.") {
        toast.success("Registration successful! Please login to continue.");
        setChange({ signIn: true, register: false });
        clearForm();
        setRegistrationStep("initial");
      } else {
        toast.error("Failed to set password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to complete registration. Please try again.");
    }
  };

  const clearForm1 = () => {
    setUserin({
      useremail: "",
      userpassword: "",
    });
    setError({
      username: "",
      userpassword: "",
    });
  };

  const clearForm = () => {
    setUser({
      username: "",
      usernumber: "",
      useremail: "",
      userpassword: "",
      userotp: "",
    });
    setError({
      username: "",
      userpassword: "",
    });
  };

  const onSignin = async (e) => {
    e.preventDefault();
    try {
      if (!userin.useremail || !userin.userpassword) {
        toast.error("Enter your registered email and password!");
        return;
      }
      const response = await axios.get(
        `${BASE_URL}/user/login/${userin.useremail}/${userin.userpassword}`
      );
      const message = response.data;

      if (message.startsWith("Welcome")) {
        localStorage.setItem("trendix", "true");
        localStorage.setItem("useremail", userin.useremail);

        toast.success(message);
        navigate("/home");
        setUserin({
          useremail: "",
          userpassword: "",
        });
      } else if (message === "Invalid password") {
        toast.error("The password entered is incorrect. Please try again.");
      } else if (message === "email not found?..") {
        toast.error("The email entered is not registered. Please sign up.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to sign in. Please check your connection.");
    }
  };

  const password = async (e) => {
    e.preventDefault();
    try {
      if (userin.useremail) {
        const response = await axios.get(
          `${BASE_URL}/user/forgotpass/${userin.useremail}`
        );
        toast.success("Mail sent to your registered email");
        console.log(response.data);
      } else {
        toast.error("Please enter your registered email");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send password reset email. Please try again.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("trendix") === "true") {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen w-full flex">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 min-h-screen  flex items-center justify-center p-4">
          {/* bg-[#F2F3F7] */}
          <div className="w-full max-w-md">
            <div className="px-6 py-8 md:px-8">
              <h1
                className="text-[#E23378] text-4xl md:text-5xl text-center font-semibold mb-8"
                style={{ fontFamily: "Pacifico, sans-serif" }}
              >
                Trendix
              </h1>

              {change.signIn ? (
                <>
                  <h2 className="text-gray-800 text-2xl text-center mb-8 font-medium">
                    Welcome Back
                  </h2>
                  <div className="space-y-6">
                    <TextInput
                      className="w-full bg-gray-50"
                      name="useremail"
                      type="email"
                      label="Email"
                      value={userin.useremail}
                      onChange={handleChange1}
                      helperText="enter email"
                    />

                    <Password
                      name="userpassword"
                      value={userin.userpassword}
                      className="w-full bg-gray-50"
                      helperText="8 characters with @ or # and numbers"
                      onChange={handleChange1}
                    />

                    <div className="flex items-center justify-between text-sm">
                      <button
                        onClick={password}
                        className="text-gray-600 hover:text-[#E23378] transition-colors"
                      >
                        Forgot Password?
                      </button>
                      <button
                        onClick={signup}
                        className="text-gray-600 hover:text-[#E23378] transition-colors"
                      >
                        New User? Sign Up
                      </button>
                    </div>

                    <button
                      onClick={onSignin}
                      className="w-full py-3 px-4 bg-[#E23378] text-white rounded-lg font-medium 
                             hover:bg-[#E23378]/90 transform hover:scale-[1.02] transition-all duration-200
                             focus:outline-none focus:ring-2 focus:ring-[#E23378] focus:ring-offset-2"
                    >
                      Sign In
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-gray-800 text-2xl text-center mb-8 font-medium">
                    Create Account
                  </h2>

                  <TextInput
                    className="w-full bg-gray-50"
                    name="username"
                    type="text"
                    label="Name"
                    value={user.username}
                    onChange={handleChange}
                    helperText="all letters without special symbols"
                    disabled={registrationStep !== "initial"}
                  />

                  <TextInput
                    className="w-full bg-gray-50"
                    name="usernumber"
                    type="number"
                    label="Number"
                    value={user.usernumber}
                    onChange={handleChange}
                    helperText="10 digits"
                    disabled={registrationStep !== "initial"}
                  />

                  <TextInput
                    className="w-full bg-gray-50"
                    name="useremail"
                    type="email"
                    label="Email"
                    value={user.useremail}
                    onChange={handleChange}
                    helperText="valid email"
                    disabled={registrationStep !== "initial"}
                  />

                  {registrationStep !== "initial" && (
                    <TextInput
                      className="w-full bg-gray-50"
                      name="userotp"
                      type="number"
                      label="OTP"
                      value={user.userotp}
                      onChange={handleChange}
                      helperText="Enter OTP sent to your email"
                      disabled={registrationStep === "otpVerified"}
                    />
                  )}

                  {registrationStep === "otpVerified" && (
                    <Password
                      name="userpassword"
                      value={user.userpassword}
                      className="w-full bg-gray-50"
                      helperText="8 characters with @ or # and numbers"
                      onChange={handleChange}
                    />
                  )}

                  <div className="flex justify-between items-center">
                    <button
                      onClick={signin}
                      className="text-gray-600 text-sm hover:text-[#E23378] transition-colors"
                    >
                      Already have an account? Sign In
                    </button>
                  </div>

                  <button
                    onClick={
                      registrationStep === "initial"
                        ? sendOTP
                        : registrationStep === "otpSent"
                        ? verifyOTP
                        : completeRegistration
                    }
                    className="w-full py-3 px-4 bg-[#E23378] text-white rounded-lg font-medium 
                           hover:bg-[#E23378]/90 transform hover:scale-[1.02] transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-[#E23378] focus:ring-offset-2"
                  >
                    {registrationStep === "initial"
                      ? "Send OTP"
                      : registrationStep === "otpSent"
                      ? "Verify OTP"
                      : "Complete Registration"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side - Image (hidden on mobile) */}
        <div className="hidden lg:block w-1/2 relative">
          <video
            className="absolute inset-0 w-full h-[100vh] object-cover border-none"
            autoPlay
            loop
            muted
            playsInline
            
          >
            <source src={videoSource} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
};

export default Landing2;
