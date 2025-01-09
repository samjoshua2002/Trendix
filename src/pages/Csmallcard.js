// import React, { useState } from 'react';
// import LikeIcon from '@mui/icons-material/Favorite'; 
// import "../App.css";

// const Csmallcard = ({ product, classname, onClick }) => {
//   const [liked, setLiked] = useState(product.liked || false); 

//   const toggleLike = () => {
//     setLiked(!liked);
//   };

//   return (
//     <div className={`mx-auto p-4 ${classname}`} onClick={onClick}>
//       {product ? (
//         <div
//           key={product.id}
//           className="flex-shrink-0 w-60 bg-white shadow-lg p-2 border border-slate-300 rounded-md"
//         >
//           <div className="bg-gray-100 rounded-md text-center p-2 relative">
//             <LikeIcon
//               className={`absolute right-2 ${liked ? 'text-red-500' : 'text-slate-300'}`}
//               onClick={toggleLike}
//               style={{ fontSize: '30px', cursor: 'pointer' }}
//             />
//             <img
//               className="hover:scale-110 transition-all duration-300 h-56 w-full rounded"
//               src={product.imageUrl}
//               alt={product.title}
//             />
//           </div>
//           <div className="body capitalize bg-neutral-50 mt-1 px-1 rounded-md">
//             <p className="text-lg">{product.title}</p>
//             <div className="flex justify-between">
//               <p className="font-semibold">{product.brand}</p>
//               <p className="font-medium">
//                 <span className="mr-2 text-slate-400 line-through">₹{product.originalPrice}</span>
//                 ₹{product.discountedPrice}
//               </p>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>No product data available.</p>
//       )}
//     </div>
//   );
// };

// export default Csmallcard;


// its with backend <code></code>
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
        <div key={item.id} className="flex-shrink-0 w-60 bg-white shadow-lg p-2 border border-slate-300 rounded-md">
          <div className="bg-gray-100 rounded-md text-center p-2 relative">
            <LikeIcon
              className={`absolute right-2 ${item.isLiked ? 'text-red-500' : 'text-slate-300'}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering parent click
                toggleLike(item.id);
              }}
              style={{ fontSize: '30px', cursor: 'pointer' }}
            />
            <img
              className="hover:scale-110 transition-all duration-300 h-56 w-full rounded"
              src={item.imageUrl}
              alt={item.title}
            />
          </div>
          <div
            className="body capitalize bg-neutral-50 mt-1 px-1 rounded-md"
            onClick={() => handleProductSelect(item)}
          >
            <p className="text-lg">{item.title}</p>
            <div className="flex justify-between">
              <p className="font-semibold">{item.brand}</p>
              <p className="font-medium">
                {item.discountedPrice ? (
                  <>
                    <span className="mr-2 text-slate-400 line-through">₹{item.originalPrice}</span>
                    ₹{item.discountedPrice}
                  </>
                ) : (
                  <>₹{item.originalPrice}</>
                )}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>No product data available.</p>
      )}
    </div>
  );
};

export default Csmallcard;
