import React, { useState, useEffect, useContext } from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { FaBoxOpen } from "react-icons/fa";

const HomeCard = ({ products, classname }) => {
  const [items, setItems] = useState(products || []); // Initialize state with products or empty array
  const navigate = useNavigate();
  const { handleLikeToggle } = useContext(AppContext);

  // Sync local items state with products prop
  useEffect(() => {
    setItems(products || []);
  }, [products]);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const handleCardClick = (id) => {
    navigate(`/displaycard/${id}`);
  };

  const handleLike = (e, id) => {
    e.stopPropagation(); // Prevent card click when liking
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
    handleLikeToggle(id); // Notify the parent context
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 ${classname}`}>
      {items.length > 0 ? (
        items.map((item) => (
          <div
            key={item.id}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handleCardClick(item.id)}
          >
            {/* Image with blur effect */}
            <div className="relative">
              <img
                className="w-full h-48 object-cover"
                src={item.imageUrl}
                alt={item.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold text-white">{truncateText(item.title, 20)}</h3>
                <p className="text-sm text-white opacity-70">{item.brand}</p>
              </div>
              <button
                className={`absolute top-2 right-2 p-2 rounded-full ${item.isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600'} transition-colors duration-300`}
                onClick={(e) => handleLike(e, item.id)}
              >
                <Heart size={20} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center">
        <FaBoxOpen className="mx-auto w-16 h-16 text-gray-400" />
        <p className="text-black mt-4">No products available.</p>
      </div>
      )}
    </div>
  );
};

export default HomeCard;
