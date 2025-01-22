import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, ShoppingBag, Gift } from 'lucide-react';

function OrderConfirmation() {
  const navigate = useNavigate();
  const orderNumber = '#' + Math.random().toString().slice(2, 8);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    const interval = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - 20));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
          <div 
            className="h-full bg-[#E23378] transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#E23378]/10 rounded-full blur-xl" />
        <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-[#E23378]/10 rounded-full blur-xl" />

        <div className="text-center mb-8 relative">
          <div className="flex justify-center mb-4 transform transition-transform hover:scale-110 duration-300">
            <div className="relative">
              <CheckCircle className="w-20 h-20 text-[#E23378]" />
              <div className="absolute inset-0 animate-ping">
                <CheckCircle className="w-20 h-20 text-[#E23378] opacity-20" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6 transform transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#E23378]" />
                <span className="text-gray-600">Order Number</span>
              </div>
              <span className="font-semibold text-gray-900 bg-white px-3 py-1 rounded-full shadow-sm">
                {orderNumber}
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#E23378]/20 to-transparent my-4" />
            <div className="flex items-center gap-3 text-[#E23378]">
              <Package className="w-5 h-5" />
              <div className="flex-1">
                <div className="h-2 bg-[#E23378]/10 rounded-full">
                  <div className="h-full w-1/3 bg-[#E23378] rounded-full animate-pulse" />
                </div>
              </div>
              <span className="text-sm font-medium">Preparing</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#E23378]/5 to-[#E23378]/10 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <Truck className="w-6 h-6 text-[#E23378]" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  Estimated Delivery
                  <Gift className="w-4 h-4 text-[#E23378] animate-bounce" />
                </h3>
                <p className="text-sm text-gray-600">
                  {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 animate-pulse">
            Redirecting to homepage in {Math.ceil(progress/20)} seconds...
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;