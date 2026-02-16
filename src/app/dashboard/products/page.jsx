'use client'
import ProductCard from "@/app/Components/ProductCard";
import ProductDetailsModal from "@/app/Components/ProductDetailsModal";
import ProductCardSkeleton from "@/app/Components/Skeleton/ProductCardSkeleton";
import UpdateProductModal from "@/app/Components/UpdateProductModal";
import useAxiosSecure from "@/app/Hooks/useAxiosSecure";
import { useCurrentUser } from "@/app/Hooks/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AllProducts() {
    const axiosSecure = useAxiosSecure()
    const [modalDetails, setModalDetails] = useState(null)
    const [updateModla, setUpdateModal] = useState(null)

    const { currentUser, loading } = useCurrentUser()
    // console.log({currentUser});

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure('/api/Products/get_products')
            return res.data
        },
    })


    const onUpdate = async (updateData, id) => {
        if (!updateData.updatedBy) {
            updateData.updatedBy = currentUser.email
        }
        // console.log(updateData, id);

        const result = await axiosSecure.patch(`/api/Products/update_products/${id}`, updateData)

        if (result.data.result.modifiedCount) {
            Swal.fire({
                title: "Update successful!",
                icon: "success",
                draggable: true
            });

            refetch()
        }
    }

    const handleDelete = async (id) => {
        console.log(id);
    }

    if (isLoading && loading) return <div className=" min-h-screen bg-gradient-to-br from-[#8E2DE2] via-[#A855F7] to-[#EC4899] p-8 pt-36">
        <div className="max-w-7xl mx-auto gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    </div>;

    return (
        <>
            <main className="min-h-screen rounded-2xl bg-gradient-to-br px-10 from-[#a855f7] via-[#c084fc] to-[#ec4899] py-10">


                <h1 className="text-4xl z-20 font-bold text-white text-center mb-10">
                    Our Products
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl mx-auto">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="rounded-2xl bg-white/80 backdrop-blur-md hover:shadow-md transition overflow-hidden"
                        >
                            {/* Image */}
                            {product.image && (
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-40 w-full object-center object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                    {/* Price Badge */}
                                    <div className="absolute bottom-4 right-4 rounded-full bg-purple-600 px-5 py-2 text-white text-lg font-semibold shadow-lg">
                                        ৳ {product.price}
                                    </div>
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-5 space-y-3">
                                {/* Name */}
                                {product.name && (
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {product.name}
                                    </h2>
                                )}

                                {/* Description */}
                                {product.description && (
                                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                        {product.description}
                                    </p>
                                )}

                               
                                {/* Actions */}
                                <div className="pt-3 flex gap-2">
                                    <button
                                        onClick={() => setModalDetails(product)}
                                        className="flex-1 rounded-lg cursor-pointer border border-[#b657e4] text-[#b657e4] py-2 text-sm font-medium hover:bg-[#b657e4]/10 transition"
                                    >
                                        Details
                                    </button>

                                    <button
                                        onClick={() => setUpdateModal(product)}
                                        className="flex-1 rounded-lg cursor-pointer bg-[#b657e4] py-2 text-sm font-medium text-white hover:opacity-90 transition"
                                    >
                                        Update
                                    </button>

                                    <button
                                    onClick={() => handleDelete(product._id)}
                                        className="flex-1 rounded-lg cursor-pointer bg-[#e459ae] py-2 text-sm font-medium text-white hover:opacity-90 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}



                </div>

                {
                    modalDetails && <ProductDetailsModal modalDetails={modalDetails} onClose={() => setModalDetails(null)} />
                }

                {
                    updateModla && <UpdateProductModal currentUser={currentUser?.currentUser} onUpdate={onUpdate} updateModla={updateModla} onClose={() => setUpdateModal(null)} />
                }

            </main>
        </>
    );
}