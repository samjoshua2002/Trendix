import React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Password = ({ helperText, name, onChange, value, className }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      className={`password-field ${className}`}
      sx={{ m: 0, width: '100%' }} // Ensures full width
      variant="outlined"
    >
      <InputLabel
        htmlFor={`outlined-adornment-${name}`}
        sx={{
          color: 'white',
          '&.Mui-focused': { color: 'white' }, // Label color when focused
        }}
      >
        Password
      </InputLabel>
      <OutlinedInput
        id={`outlined-adornment-${name}`}
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value || ''} // Ensures the field is blank on refresh
        onChange={onChange}
        autoComplete="off" // Disables autofill
        inputProps={{
          autoComplete: 'new-password', // Prevents password autofill
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? 'hide the password' : 'display the password'}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              sx={{ color: 'white' }} // Icon color
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
        sx={{
          backdropFilter: 'blur(10px)', // Glass blur effect
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Translucent background
          borderRadius: '8px', // Rounded corners
          color: 'white', // Text color
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.4)', // Default translucent border
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.6)', // Border color on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 123, 255, 0.8)', // Blue border on focus
          },
          input: {
            color: 'white', // Input text color
          },
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0px 1000px rgba(255, 255, 255, 0.1) inset', // Prevent autofill background
            WebkitTextFillColor: 'white', // Autofill text color
            borderRadius: '8px',
          },
        }}
      />
      {helperText && (
        <FormHelperText sx={{ color: 'white', marginLeft: '10px' }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default Password;
