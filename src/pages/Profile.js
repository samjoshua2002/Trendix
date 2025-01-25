import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, UserCircle, Mail, Phone, Trash2 } from 'lucide-react';
import { BASE_URL } from '../App';

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const email = localStorage.getItem("useremail");
      if (!email) {
        navigate('/landing');
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/user/profile/${email}`);
        setProfile(response.data);
      } catch (err) {
        setError('Failed to load profile');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.setItem('trendix', 'false');
    localStorage.removeItem('useremail');
    navigate('/landing');
  };

  const handleDeleteAccount = async () => {
    if (!profile || !window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      // Add your delete account API endpoint here
      // await axios.delete(`http://localhost:8081/user/delete/${profile.userid}`);
      handleSignOut();
    } catch (err) {
      setError('Failed to delete account');
      console.error('Error deleting account:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E23378]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            {profile && (
              <div className="w-24 h-24 rounded-full bg-[#E23378] flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {profile.username.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {profile && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-[#E23378]" />
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="font-medium">{profile.username}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#E23378]" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{profile.useremail}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#E23378]" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{profile.usernumber}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <UserCircle className="w-5 h-5 text-[#E23378]" />
                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="font-medium">#{profile.userid}</p>
                </div>
              </div>

              <div className="pt-6 flex flex-col space-y-3">
                <button 
                  onClick={handleSignOut}
                  className="w-full rounded-md py-2 text-center bg-[#E23378] text-white font-medium hover:bg-[#c62c68] transition-colors"
                >
                  Sign Out
                </button>
                
                <button 
                  onClick={handleDeleteAccount}
                  className="w-full rounded-md py-2 text-center border-2 border-[#E23378] text-[#E23378] font-medium hover:bg-[#E23378] hover:text-white transition-colors flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
