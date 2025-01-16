import React, { useContext, useState, useEffect } from 'react';
import { Star, Heart, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { AppContext } from '../App';

const SmallCard = ({ products, classname }) => {
  const [items, setItems] = useState(products || []);
  const navigate = useNavigate();
  const { handleLikeToggle } = useContext(AppContext);

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
    e.stopPropagation();
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
    handleLikeToggle(id);
  };

  const calculateDiscount = (original, discounted) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  return (
    <div className={`gap-6 p-2 ${classname}`}>
      {Array.isArray(items) && items.length > 0 ? (
        items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item.id)}
            className="group bg-white rounded-xl border border-1 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                 className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                src={item.imageUrl}
                alt={item.title}
              />
              <button
                onClick={(e) => handleLike(e, item.id)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-110"
              >
                <Heart
                  className={`w-5 h-5 ${
                    item.isLiked ? "fill-red-500 text-red-500" : "text-pink-400"
                  }`}
                />
              </button>
              {item.discountedPrice && (
                <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {calculateDiscount(item.originalPrice, item.discountedPrice)}% OFF
                </div>
              )}
            </div>

            {/* Content Container */}
            <div className="p-4 space-y-3">
              {/* Brand & Title */}
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-pink-600 transition-colors">
                  {truncateText(item.title, 20)}
                </h3>
                <p className="text-sm text-gray-500">{item.brand}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-2">
                {truncateText(item.description, 25)}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <div className="flex items-center bg-pink-100 px-2 py-1 rounded-md">
                  <span className="text-sm font-medium text-pink-700 mr-1">
                    {item.rating}
                  </span>
                  <Star className="w-4 h-4 text-pink-500 fill-pink-500" />
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">
                  ₹{item.discountedPrice}
                </span>
                {item.originalPrice !== item.discountedPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{item.originalPrice}
                  </span>
                )}
              </div>

              {/* Quick Actions */}
              <div className="pt-2 flex items-center justify-between border-t">
                <div className="flex items-center text-sm text-pink-600">
                  <Tag className="w-4 h-4 mr-1" />
                  <span>Best Seller</span>
                </div>
                <span className="text-xs text-gray-600 font-medium">
                  Free Delivery
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center p-8 text-gray-500">No products available.</div>
      )}
    </div>
  );
};

export default SmallCard;