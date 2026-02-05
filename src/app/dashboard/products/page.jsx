'use client'
import ProductCard from "@/app/Components/ProductCard";
import ProductDetailsModal from "@/app/Components/ProductDetailsModal";
import ProductCardSkeleton from "@/app/Components/Skeleton/ProductCardSkeleton";
import UpdateProductModal from "@/app/Components/UpdateProductModal";
import useAxiosSecure from "@/app/Hooks/useAxiosSecure";
import { useCurrentUser } from "@/app/Hooks/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function AllProducts() {
    const axiosSecure = useAxiosSecure()
    const [modalDetails, setModalDetails] = useState(null)
    const [updateModla, setUpdateModal] = useState(null)

    const {currentUser, loading} = useCurrentUser()
    console.log({currentUser});

    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure('/api/Products/get_products')
            return res.data
        },
    })


    const onUpdate = (updateData) => {
        if(!updateData.updatedBy){
             updateData.updatedBy = currentUser.email
        }
        console.log(updateData, products, currentUser.email);
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
            <main className="min-h-screen bg-gradient-to-br px-10 from-[#a855f7] via-[#c084fc] to-[#ec4899] py-10">


                <h1 className="text-4xl z-20 font-bold text-white text-center mb-10">
                    Our Products
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white/90 rounded-xl shadow-lg p-5 hover:scale-105 transition-all duration-300 ease-linear">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-40 w-full object-cover rounded-lg"
                            />

                            <h2 className="text-xl font-semibold mt-4 text-black">{product.name}</h2>
                            <p className="text-gray-600">৳{product.price}</p>

                            <div className="flex gap-3 mt-4">
                                <button
                                onClick={() => setModalDetails(product)}
                                    className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 cursor-pointer"
                                >
                                    Details
                                </button>
                                 <button
                                 onClick={() => setUpdateModal(product)}
                                    className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 cursor-pointer"
                                >
                                    Updated
                                </button>

                                <button
                                    className="flex-1 bg-pink-500 text-white py-2 rounded hover:bg-pink-600 cursor-pointer"
                                >
                                    Delete
                                </button>
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