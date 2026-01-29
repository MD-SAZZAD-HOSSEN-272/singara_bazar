"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export function PurchaseModal({ onClose, product, onAddToCart, getPurchasesDataFromLocalStorage }) {
    const [quantityIncress, setQuantityIncress] = useState(1);

    // Reset quantity when modal opens
    useEffect(() => {
        if (product) setQuantityIncress(1);
    }, [product]);

    if (!product) return null;

    const handleAddToCart = () => {

        console.log(quantityIncress)


        onAddToCart((prev) => {
            // Check if item already exists in cart
            const exist = prev.find(i => i.id === product.id);

            console.log(quantityIncress)

            let updated;
            if (exist) {
                // If exists, just increase quantity and quantityPrice
                updated = prev.map(i =>
                    i.id === product.id
                        ? {
                            ...i,
                            quantity: i.quantity + quantityIncress,
                            quantityPrice: (i.quantity + quantityIncress) * i.price
                        }
                        : i
                );
            } else {
                // If not exists, add new with quantity 1
                updated = [...prev, {
                    ...product,
                    quantity: quantityIncress,
                    quantityPrice: product.price * quantityIncress
                }];
            }

            console.log(updated)

            // Save to localStorage
            localStorage.setItem("items", JSON.stringify(updated));
            getPurchasesDataFromLocalStorage()

            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Your Order has been saved, please see the cart box",
                showConfirmButton: false,
                timer: 1500
            });
            return updated;
        });

        // onAddToCart([...cart, cartData]);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-scaleIn">

                {/* Image Section */}
                <div className="relative h-56">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 cursor-pointer rounded-full bg-white/90 p-2 text-gray-800 hover:bg-white active:scale-95 transition"
                    >
                        ✕
                    </button>

                    <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                        {product.name}
                    </h2>
                </div>

                {/* Content */}
                <div className="p-6">

                    <p className="text-sm text-gray-600 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Price */}
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-gray-500 text-sm">Price</span>
                        <span className="text-2xl font-bold text-green-600">
                            ${product.price}
                        </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mt-6 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Quantity</span>

                        <div className="flex items-center rounded-full bg-gray-100 px-3 py-2">

                            {/* Decrease */}
                            <button
                                onClick={() =>
                                    quantityIncress > 1 && setQuantityIncress(quantityIncress - 1)
                                }
                                className="cursor-pointer h-9 w-9 rounded-full border border-gray-300 bg-white text-xl font-bold text-gray-800 shadow-sm hover:bg-gray-200 active:scale-95 transition"
                            >
                                −
                            </button>

                            <span className="mx-4 text-lg font-semibold text-gray-900">
                                {quantityIncress}
                            </span>

                            {/* Increase */}
                            <button
                                onClick={() => setQuantityIncress(quantityIncress + 1)}
                                className="cursor-pointer h-9 w-9 rounded-full border border-gray-300 bg-white text-xl font-bold text-gray-800 shadow-sm hover:bg-gray-200 active:scale-95 transition"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                        <span className="font-medium text-gray-700">Total</span>
                        <span className="text-xl font-bold text-black">
                            ${product.price * quantityIncress}
                        </span>
                    </div>

                    {/* Add To Cart */}
                    <button
                        onClick={handleAddToCart}
                        className="mt-6 w-full cursor-pointer rounded-xl bg-gradient-to-r from-black to-gray-800 py-3 text-white font-semibold tracking-wide hover:opacity-90 active:scale-95 transition"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>


    );
}
