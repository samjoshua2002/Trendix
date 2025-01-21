import LikeIcon from '@mui/icons-material/Favorite';
import { AppContext } from '../App';
import "../App.css";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

const Csmallcard = ({ product, classname, onClick }) => {
  const { allproducts, toggleLike } = useContext(AppContext);  
  const [item, setItem] = useState(product);  
  const navigate = useNavigate(); 

  // Update the local `item` state whenever the global `allproducts` changes
  useEffect(() => {
    const updatedProduct = allproducts.find((p) => p.id === product.id);
    if (updatedProduct) {
      setItem(updatedProduct);
    }
  }, [allproducts, product.id]);

  const handleProductSelect = (product) => {
    navigate(`/displaycard/${product.id}`);
  };

  return (
    <div className={`mx-auto p-2 ${classname}`} onClick={onClick}>
      {item ? (
        <div
          key={item.id}
          className="flex items-center bg-white shadow-lg p-4 border border-slate-300 rounded-md hover:shadow-md transition-shadow"
        >
          {/* Product Image */}
          <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={item.imageUrl}
              alt={item.title}
            />
          </div>

          {/* Product Details */}
          <div className="flex-grow ml-4">
            <div
              className="cursor-pointer"
              onClick={() => handleProductSelect(item)}
            >
              <p className="text-lg font-semibold capitalize">{item.title}</p>
              <p className="text-sm text-gray-600 capitalize">{item.brand}</p>
              <div className="text-sm font-medium mt-1">
                {item.discountedPrice ? (
                  <>
                    <span className="mr-2 text-slate-400 line-through">₹{item.originalPrice}</span>
                    <span className="text-green-600">₹{item.discountedPrice}</span>
                  </>
                ) : (
                  <>₹{item.originalPrice}</>
                )}
              </div>
            </div>
          </div>

          {/* Like Icon */}
          <div className="ml-4">
            <LikeIcon
              className={`cursor-pointer ${item.isLiked ? 'text-red-500' : 'text-slate-300'}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering parent click
                toggleLike(item.id);
              }}
              style={{ fontSize: '30px' }}
            />
          </div>
        </div>
      ) : (
        <p>No product data available.</p>
      )}
    </div>
  );
};

export default Csmallcard;
