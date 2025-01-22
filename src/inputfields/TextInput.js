import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

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
        width: "100%", // Ensures full width

        // Helper text style
        "& .MuiFormHelperText-root": {
          marginLeft: "10px",
          color: "#E23378", // Dark gray for helper text
        },

        // Label style
        "& .MuiFormLabel-root": {
          color: "rgba(0, 0, 0, 0.7)", // Dark gray for default label color
          backgroundColor: "white", // White background for label
          paddingLeft: "4px", // Adds padding to the label to avoid overlap with the input
        },

        // Focused label style
        "& .MuiFormLabel-root.Mui-focused": {
          color: "#E23378", // Pink color when focused
        },

        // Input field and border styles
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "black", // Black border for default state
          },
          "&:hover fieldset": {
            borderColor: "rgba(0, 0, 0, 0.7)", // Darker gray for hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "#E23378", // Pink border when focused
          },
          // Styles for the input field only
          "& input": {
            backdropFilter: "none", // Remove blur effect
            backgroundColor: "white", // White background
            borderRadius: "8px", // Rounded corners for the input field
            color: "black", // Black text color
          },
          // Prevent autofill background
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0px 1000px white inset", // White background for autofill
            WebkitTextFillColor: "black", // Black text for autofill
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

        // Remove default focus outline and add custom glow
        "& .MuiOutlinedInput-root.Mui-focused": {
          outline: "none", // Removes browser's default focus outline
          boxShadow: "0 0 5px rgba(226, 51, 120, 0.5)", // Adds custom pink glow effect
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
