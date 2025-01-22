import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear any authentication-related data (e.g., localStorage)
    
    
    localStorage.setItem('trendix', 'false');
   
    
    // Navigate to the landing page
    navigate('/landing');
  };

  return (
    <div className='pt-24 sm:pt-20'>
      <h2>Profile</h2>
      <button 
        onClick={handleSignOut}
        className="w-24 rounded-md mt-4 py-2 text-center border-2 bg-[#E23378] border-[#E23378] text-white md:bg-transparent md:text-[#E23378] font-medium cursor-pointer hover:bg-[#E23378] hover:text-white"
      >
        Sign Out
      </button>
    </div>
  );
}

export default Profile;
