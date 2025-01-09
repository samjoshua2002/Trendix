import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

const TextInput = ({ label, name, value, onChange, helperText, className, type }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Clear the input field on component mount
    setInputValue("");
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <TextField
      type={type}
      label={label}
      variant="outlined"
      className={`text-input-field ${className}`}
      name={name}
      value={inputValue}
      onChange={handleChange}
      helperText={helperText}
      autoComplete="off" // Disables browser autofill
      inputProps={{
        autoComplete: "new-password", // Prevents password autofill
        form: {
          autoComplete: "off", // Ensures no autofill at form level
        },
      }}
      sx={{
        m: 0,
        width: '100%', // Ensures full width

        // Helper text style
        "& .MuiFormHelperText-root": {
          marginLeft: "10px",
          color: "white",
        },

        // Label style
        "& .MuiFormLabel-root": {
          color: "white", // Default label color
        },

        // Focused label style
        "& .MuiFormLabel-root.Mui-focused": {
          color: "white", // Label color when focused
        },

        // Input field and border styles
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "rgba(255, 255, 255, 0.4)", // Default translucent border
          },
          "&:hover fieldset": {
            borderColor: "rgba(255, 255, 255, 0.6)", // Border color on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "white", // Border color when focused
          },
          // Styles for the input field only
          "& input": {
            backdropFilter: "blur(10px)", // Blur effect
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Translucent background
            borderRadius: "8px", // Rounded corners for the input field
            color: "white", // Input text color
          },
          // Prevent autofill background
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0px 1000px rgba(255, 255, 255, 0.1) inset", // Matches the input's background
            WebkitTextFillColor: "white", // Ensures text color stays white
            borderRadius: "8px", // Keeps the rounded corners
          },
          // Customizing the number input spinner
          "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button": {
            WebkitAppearance: "none", // Hides default arrows
            appearance: "none", // Hides default arrows for Firefox
            margin: 0,
          },
          "& input[type=number]": {
            MozAppearance: "textfield", // Hides spinner in Firefox
          },
        },

        // Remove light blue focus outline
        "& .MuiOutlinedInput-root.Mui-focused": {
          outline: "none", // Removes browser's default focus outline
          boxShadow: "0 0 5px rgba(255, 255, 255, 0.6)", // Adds custom glow effect
        },

        // Ensures padding consistency
        "& .MuiOutlinedInput-input": {
          paddingRight: "10px",
          paddingLeft: "10px",
        },
      }}
    />
  );
};

export default TextInput;
