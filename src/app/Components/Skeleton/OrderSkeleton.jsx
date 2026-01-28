import React from "react";

const OrderSkeleton = ({ orderIndex = 0, itemsCount = 4 }) => {
  return (
    <div className="bg-white max-w-7xl mx-auto border rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 animate-pulse">
      
      {/* Order header */}
      <div className="px-6 py-4 border-b bg-gray-50 rounded-t-2xl flex justify-between items-center">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>

        <div className="flex gap-3">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Items */}
      <div className="p-6">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: itemsCount }).map((_, index) => (
            <li
              key={index}
              className="group flex gap-5 p-5 border rounded-xl bg-gray-50"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-lg">
                <div className="w-28 h-28 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>

                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded mb-4"></div>

                <div className="flex justify-between items-center">
                  <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Total Price */}
        <div className="mt-6 text-right px-2">
          <div className="h-6 w-32 bg-gray-200 rounded ml-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderSkeleton;
