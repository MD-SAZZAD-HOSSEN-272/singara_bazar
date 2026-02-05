"use client";

import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function UpdateProductModal({
    updateModla: product = {},
    currentUser,
    onUpdate,
    onClose,
}) {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        description: "",
    });

    // Load existing data
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                price: product.price || "",
                image: product.image || "",
                description: product.description || "",
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const updatedProduct = {
            ...formData,

            // ✅ update-only fields
            updatedBy: currentUser,
            updatedAt: new Date().toISOString(),
        };

        onUpdate(updatedProduct);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Update Product
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-gray-100"
                    >
                        <IoMdClose size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-4 px-6 py-5">
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Product name"
                        className="w-full rounded-xl border px-4 py-3 focus:border-black focus:outline-none"
                    />

                    <input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="w-full rounded-xl border px-4 py-3 focus:border-black focus:outline-none"
                    />

                    <input
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="w-full rounded-xl border px-4 py-3 focus:border-black focus:outline-none"
                    />

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Product description"
                        rows={4}
                        className="w-full rounded-xl border px-4 py-3 focus:border-black focus:outline-none"
                    />
                </div>

                {/* Footer */}
                <div className="flex gap-3 border-t px-6 py-4">
                    <button
                        onClick={handleSubmit}
                        className="flex-1 rounded-xl bg-black py-3 text-white transition hover:bg-gray-800"
                    >
                        Save Changes
                    </button>

                    <button
                        onClick={onClose}
                        className="flex-1 rounded-xl border py-3 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
