"use client";
import useAxiosSecure from "@/app/Hooks/useAxiosSecure";
import { useCurrentUser } from "@/app/Hooks/useCurrentUser";
import useImgbb from "@/app/Hooks/useImgBB";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export default function AddProduct() {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const { uploadImage, loading } = useImgbb();
    const [isDragging, setIsDragging] = useState(false);
    const axiosSecure = useAxiosSecure()
    const currentUser = useCurrentUser()



    /* ---------------- Preview handling ---------------- */
    useEffect(() => {
        if (!imageFile) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(imageFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [imageFile]);

    /* ---------------- Handlers ---------------- */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setImageFile(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragEnter = () => setIsDragging(true);
    const handleDragLeave = () => setIsDragging(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile) return alert("Please select an image");

        const imageUrl = await uploadImage(imageFile);
        if (!imageUrl) return;

        const newProduct = {
            name: product.name,
            price: Number(product.price),
            image: imageUrl,
            description: product.description,
            addedBy: currentUser?.currentUser?.email
        };

        const res = await axiosSecure.post('/api/Products/post_products', newProduct)

        if (res.data.insertedId) {
            Swal.fire({
                title: "Successfuly added the product",
                icon: "success",
                draggable: true
            });
            setProduct({ name: "", price: "", description: "" });
            setImageFile(null);
        }
        // reset

    };

    return (
        <div className="flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-20 px-4 rounded-2xl">
            <div className="w-full max-w-4xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
                    🛒 Add New Product
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Name */}
                    <div>
                        <label className="text-sm font-semibold text-gray-600 mb-1 block">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Honey Nuts"
                            value={product.name}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="text-sm font-semibold text-gray-600 mb-1 block">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            name="price"
                            placeholder="350"
                            value={product.price}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="md:col-span-2">
                        <label className="text-sm font-semibold text-gray-600 mb-2 block">
                            Product Image
                        </label>

                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onClick={() => fileInputRef.current && fileInputRef.current.click()}
                            className={`flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-2xl cursor-pointer transition ${isDragging
                                ? "border-indigo-600 bg-indigo-100"
                                : "border-indigo-300 bg-indigo-50"
                                }`}
                        >
                            <span className="text-4xl">📸</span>
                            <p className="mt-2 text-sm text-gray-600">
                                <span className="font-semibold text-indigo-600">Click to upload</span>{" "}
                                or drag & drop
                            </p>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                className="hidden"
                            />
                        </div>

                    </div>

                    {/* Image Preview */}
                    {preview && (
                        <div className="md:col-span-2">
                            <p className="text-sm font-medium text-gray-600 mb-2">
                                Image Preview
                            </p>
                            <div className="relative w-full max-w-sm">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="h-48 w-full object-cover rounded-2xl shadow-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => setImageFile(null)}
                                    className="absolute top-2 right-2 bg-white/80 backdrop-blur text-red-500 rounded-full px-2 py-1 text-xs shadow hover:bg-white"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="text-sm font-semibold text-gray-600 mb-1 block">
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Crispy fried honey with nuts filling..."
                            value={product.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
                            required
                        />
                    </div>

                    {/* Button */}
                    <div className="md:col-span-2">
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full py-4 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition shadow-lg disabled:opacity-60"
                        >
                            {loading ? "Uploading..." : "➕ Add Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
