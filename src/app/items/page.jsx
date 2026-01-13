"use client";

import { useEffect, useState } from "react";
import Cart from "../Components/Cart";
import ProductCard from "../Components/ProductCard";
import ProductModal from "../Components/ProductModal";
import CartPage from "../Components/CartPage";

const products = [
    {
        id: 1,
        name: "Singara",
        price: 10,
        image: "/images/singara.png",
        description: "Crispy fried singara with spicy filling",
    },
    {
        id: 2,
        name: "Paratha",
        price: 15,
        image: "/images/paratha.png",
        description: "Soft layered paratha",
    },
    {
        id: 3,
        name: "Piyaju",
        price: 10,
        image: "/images/piyaju.png",
        description: "Lentil fritters with onion",
    },
    {
        id: 4,
        name: "Puri",
        price: 12,
        image: "/images/puri.png",
        description: "Deep fried fluffy puri",
    },
    {
        id: 5,
        name: "Gilapi",
        price: 20,
        image: "/images/gilapi.png",
        description: "Sweet syrup soaked jilapi",
    },
    {
        id: 6,
        name: "Nan Roti",
        price: 30,
        image: "/images/nan.png",
        description: "Soft tandoori naan",
    },
];

export default function Home() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cardPage, setCardPage] = useState(false)

     const [cart, setCart] = useState([]);
    
    
    
    
      // Restore on refresh
      useEffect(() => {
        const stored = localStorage.getItem("items");
        if (stored) {
          setCart(JSON.parse(stored));
        }
      }, []);
    

    // Purchase
    const handlePurchasesButton = (item) => {
        setCart((prev) => {
            const updated = [...prev, item];
            localStorage.setItem("items", JSON.stringify(updated));
            return updated;
        });
    };


    const handleCardPage = () => {
        setCardPage(!cardPage)
    }

    console.log(cardPage)



    return (
        <main className="min-h-screen bg-gradient-to-br pt-40 from-[#a855f7] via-[#c084fc] to-[#ec4899] p-10">
           
            <Cart cart={cart} handleCardPage={handleCardPage}></Cart>

            <CartPage cardPageHaldeler={cardPage}></CartPage>
            <h1 className="text-4xl z-20 font-bold text-white text-center mb-10">
                Our Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onDetails={setSelectedProduct}
                        handlePurchasesButton={handlePurchasesButton}
                    />
                ))}
            </div>

            <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </main>
    );
}
