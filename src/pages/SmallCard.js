import React, { useState } from 'react';
import LikeIcon from '@mui/icons-material/Favorite'; 
import "../App.css";

const SmallCard = ({ products, classname }) => {
  // If products is passed as an array, we set the state based on that.
  const [items, setItems] = useState(products || []);

  const toggleLike = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  return (
    <div className={`gap-6 p-4 ${classname}`}>
      {/* Ensure products is an array */}
      {Array.isArray(items) && items.length > 0 ? (
        items.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-60 bg-white shadow-lg p-2 border border-slate-300 rounded-md"
          >
            <div className="bg-white rounded-md text-center p-2 relative">
              <img
                className="hover:scale-110 transition-all duration-300 h-64 w-full rounded"
                src={item.imageUrl}
                alt={item.title}
              />
            </div>
            <div className="body capitalize bg-neutral-50 mt-1 px-1 rounded-md">
              <div className="flex justify-between items-center">
                <p className="text-lg">{item.title}</p>
                <LikeIcon
                  className={`cursor-pointer ${item.liked ? 'text-red-500' : 'text-slate-300'}`}
                  onClick={() => toggleLike(item.id)}
                  style={{ fontSize: '30px' }} // Increased size
                />
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">{item.brand}</p>
                <p className="font-medium">
                  <span className="mr-2 text-slate-400 line-through">₹{item.originalPrice}</span>
                  ₹{item.discountedPrice}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default SmallCard;
