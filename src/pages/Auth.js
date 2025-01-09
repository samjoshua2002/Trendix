import React, { useState, useEffect } from 'react';
import TextInput from '../inputfields/TextInput';
import Password from '../inputfields/Password';
import axios from 'axios';
import "../App.css";
import { useNavigate } from 'react-router-dom';

const Landing2 = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    usernumber: "",
    useremail: "",
    userpassword: "",
    userotp: ""
  });

  const [userin, setUserin] = useState({
    useremail: "", userpassword: ""
  });

  const [error, setError] = useState({
    username: "",
    userpassword: ""
  });

  const [change, setChange] = useState({
    signIn: true,
    register: false,
    otpverify: false,
    setpassword: false
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleChange1 = (e) => {
    setUserin({ ...userin, [e.target.name]: e.target.value });
  };

  const signin = () => {
    setChange({ ...change, signIn: true, register: false });
    clearForm();
  };

  const signup = () => {
    setChange({ ...change, signIn: false, register: true });
    clearForm1();
  };

  const sendotp = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username: user.username,
        useremail: user.useremail,
        usernumber: user.usernumber ? parseInt(user.usernumber, 10) : null,
      };
      const response = await axios.post("https://shoppingserver-q9kv.onrender.com/user/register", userData);
      console.log(response);
      if (response.data === "Registered successfully") {
        alert("OTP sent to your mail-id: " + user.useremail);
        setChange((prevstate) => ({ ...prevstate, otpverify: !change.otpverify, register: !change.register }));
      } else if (response.data === "Account already exists") {
        alert("Account already exists.");
      } else {
        alert(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const verifyotp = async (e) => {
    if (user.userotp === "") {
      alert("Please enter the OTP.");
      return;
    }
    e.preventDefault();
    try {
      const userData = {
        userotp: user.userotp,
        useremail: user.useremail
      };
      const response = await axios.post(`https://shoppingserver-q9kv.onrender.com/user/verify-otp/${userData.useremail}/${userData.userotp}`);
      console.log(response);
      if (response.data === "User verified") {
        alert("User " + user.username + " verified");
        setChange((prevstate) => ({
          ...prevstate,
          setpassword: true,
          otpverify: false
        }));
      } else {
        alert(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const clearForm1 = () => {
    setUserin({
      useremail: '',
      userpassword: '',
    });
    setError({});
  };

  const clearForm = () => {
    setUser({
      username: '',
      usernumber: '',
      useremail: '',
      userpassword: '',
    });
    setError({});
  };

  const onSignup = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        userpassword: user.userpassword,
        useremail: user.useremail
      };
      const response = await axios.post(`https://shoppingserver-q9kv.onrender.com/user/setpassword/${userData.useremail}/${userData.userpassword}`);
      console.log(response);
      if (response.data === "Password has been set successfully.") {
        alert("Signup successful!");
        localStorage.setItem('allinall', 'true');
        localStorage.setItem('useremail', user.useremail);
        setChange((prevstate) => ({
          ...prevstate, signIn: true,
          register: false,
          otpverify: false,
          setpassword: false
        }));
      } else {
        alert(response.data.message || "Signup failed. Please try again.");
      }
      setUser({
        username: "",
        usernumber: "",
        useremail: "",
        userpassword: "",
        userotp: ""
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSignin = async (e) => {
    e.preventDefault();
    try {
      if (userin.useremail === "" || userin.userpassword === "") {
        alert("enter your registered email or password!");
        return;
      }
      const response = await axios.get(`https://shoppingserver-q9kv.onrender.com/user/login/${userin.useremail}/${userin.userpassword}`);
      const message = response.data;

      console.log("Response Message:", message);  // Log the response

      if (message.startsWith("Welcome")) {
        localStorage.setItem('allinall', 'true');
        localStorage.setItem('useremail', userin.useremail);
        alert(message);
        navigate("/home");  // Ensure navigate is being called here
        setUserin({
          useremail: "",
          userpassword: ""
        });
      } else if (message === "Invalid password") {
        alert("The password entered is incorrect. Please try again.");
      } else if (message === "email not found?..") {
        alert("The email entered is not registered. Please sign up.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const password = async (e) => {
    e.preventDefault();
    try {
      if (userin.useremail) {
        alert("mail sent");
        const response = await axios.get(`https://shoppingserver-q9kv.onrender.com/user/forgotpass/${userin.useremail}`);
        console.log(response.data);

      } else {
        alert("enter your registered email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Add useEffect to check user login status
  useEffect(() => {
    if (localStorage.getItem('allinall') === 'true') {
      navigate("/home"); // Automatically redirect if user is logged in
    }
  }, [navigate]);

  return (
    <>
      <div className="h-svh flex justify-center items-center relative">
        {/* Background Layer with iframe */}
        <iframe
          title="Spline Background"
          src="https://my.spline.design/themuseum-ae6a9e77b201737fc959a625d288ad62/"
          className="absolute inset-0 w-full h-full border-none"
        ></iframe>

        {/* Foreground Container with Overlay */}
        <div
          className="w-[530px] h-[690px] rounded-md mx-5   bg-no-repeat bg-cover relative z-10"
        >
          {/* Overlay Layer */}
          <div className="absolute inset-0 bg-black opacity-90 blur-3xl rounded-md"></div>

          {/* Text Content */}
          <div
            className="relative z-20 text-white brand text-7xl text-center mt-28 lg:text-3xl font-semibold"
            style={{ fontFamily: "Pacifico, sans-serif" }} // Replace 'Poppins' with your font
          >
            Trendix
          </div>


          {change.signIn && <><div className="relative z-20 text-slate-300 text-2xl text-center my-12">User Login</div>
            <div className="relative z-20 signin m-4">
              <div className="">
                <TextInput
                  className="w-full"
                  name="useremail"
                  type="email"
                  label="Email"
                  value={userin.useremail}
                  onChange={handleChange1}
                  helperText={"enter email"}
                />
              </div>

              <div className="mt-2">
                <Password
                  name="userpassword"
                  value={userin.userpassword}
                  className="w-full"
                  helperText={"8characters with @ or # and numbers"}
                  onChange={handleChange1}
                />
                <p className="my-3 font-semibold text-white pl-3 text-sm cursor-pointer flex justify-between">
                  <span onClick={password}>forget<span className="text-slate-400 pr-1"> Password?</span></span>
                  <span onClick={signup}><span className="text-slate-400 pr-1">New User</span> SignUp</span>
                </p>
              </div>

              <div
                onClick={onSignin}
                className="w-24 rounded-md mt-4 py-2 mx-auto text-center border-2 bg-[#E23378] border-[#E23378] text-white md:bg-transparent md:text-[#E23378] font-medium cursor-pointer hover:bg-[#E23378] hover:text-white"
              >
                Sign In
              </div>

            </div></>}

          <div className="signup m-3 relative z-20">
            {change.register &&
              <div>
                <div className="text-slate-300 text-2xl text-center mt-12 mb-8">User Register</div>
                <div>
                  <TextInput
                    className="form-control"
                    name="username"
                    type="text"
                    label="Name"
                    value={user.username}
                    onChange={handleChange}
                    helperText="all letters without special symbols"
                  />
                </div>

                <div className="mt-2">
                  <TextInput
                    className="form-control"
                    name="usernumber"
                    type="number"
                    label="Number"
                    value={user.usernumber}
                    onChange={handleChange}
                    helperText="10 digits"
                  />
                </div>

                <div className="mt-2">
                  <TextInput
                    className="form-control"
                    name="useremail"
                    type="email"
                    label="Email"
                    value={user.useremail}
                    onChange={handleChange}
                    helperText="valid email"
                  />
                </div>
                <p className="my-3 font-semibold text-white pl-3 text-sm cursor-pointer flex justify-between">
                  <span></span>
                 
                  <span onClick={signin}><span className="text-slate-400 pr-1">already have an account</span> SignIn</span>
                </p>



                <div
                  onClick={sendotp}
                  className="w-24 rounded-md mt-4 py-2 mx-auto text-center border-2 bg-[#E23378] border-[#E23378] text-white md:bg-transparent md:text-[#E23378] font-medium cursor-pointer hover:bg-[#E23378] hover:text-white"
                >
                  Send OTP
                </div>
                
              </div>
            }
          </div>

          {change.otpverify &&
            <div className="relative z-20 text-center mt-12">
              <TextInput
                className="form-control"
                name="userotp"
                type="number"
                label="OTP"
                value={user.userotp}
                onChange={handleChange}
                helperText="Enter OTP"
              />
              <div
                onClick={verifyotp}
                className="w-24 rounded-md mt-4 py-2 mx-auto text-center border-2 bg-[#E23378] border-[#E23378] text-white md:bg-transparent md:text-[#E23378] font-medium cursor-pointer hover:bg-[#E23378] hover:text-white"
              >
                Verify OTP
              </div>
              
            </div>
          }

          {change.setpassword && <div className="relative z-20 text-center mt-12">
            <Password
              name="userpassword"
              value={user.userpassword}
              className="w-full"
              helperText="Enter password"
              onChange={handleChange}
            />
            
            <div
              onClick={onSignup}
              className="w-24 rounded-md mt-4 py-2 mx-auto text-center border-2 bg-[#E23378] border-[#E23378] text-white md:bg-transparent md:text-[#E23378] font-medium cursor-pointer hover:bg-[#E23378] hover:text-white"
            >
              Set Password
            </div>
          </div>}
        </div>
      </div>
    </>
  );
};

export default Landing2;
