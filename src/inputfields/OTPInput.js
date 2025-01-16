import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const OTPInput = ({ value, onChange, helperText }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  // Sync the OTP state with the parent value
  useEffect(() => {
    if (value) {
      setOtp(value.split(''));
    }
  }, [value]);

  const handleOTPChange = (e, index) => {
    const inputValue = e.target.value;
    if (inputValue.match(/[0-9]/)) {
      const newOtp = [...otp];
      newOtp[index] = inputValue;
      setOtp(newOtp);
      onChange(newOtp.join('')); // Pass the full OTP as a single string
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" width="200px">
      {otp.map((digit, index) => (
        <TextField
          key={index}
          id={`otp-input-${index}`}
          value={digit}
          onChange={(e) => handleOTPChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          inputProps={{
            maxLength: 1,
            style: { textAlign: 'center', width: '40px', height: '40px', fontSize: '18px' },
          }}
          variant="outlined"
          margin="dense"
          size="small"
          disabled={false}
        />
      ))}
      <div>{helperText}</div>
    </Box>
  );
};

export default OTPInput;
