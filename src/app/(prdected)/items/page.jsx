"use client";

import { useEffect, useState } from "react";
import Cart from "../../Components/Cart";
import ProductCard from "../../Components/ProductCard";
import ProductModal from "../../Components/ProductModal";
import CartPage from "../../Components/CartPage";
import { PurchaseModal } from "@/app/Components/PurchaseMdal";

const products = [
    {
        id: 1,
        name: "Honey Nuts",
        price: 350,
        image: "/assets/honeay.jpg",
        description: "Crispy fried honey with nuts filling",
    },
    {
        id: 2,
        name: "Paratha",
        price: 15,
        image: "/assets/2.jpg",
        description: "Soft layered paratha",
    },
    {
        id: 3,
        name: "Piyaju",
        price: 10,
        image: "/assets/6.jpg",
        description: "Lentil fritters with onion",
    },
    {
        id: 4,
        name: "Puri",
        price: 12,
        image: "/assets/4.jpg",
        description: "Deep fried fluffy puri",
    },
    {
        id: 5,
        name: "Gilapi",
        price: 20,
        image: "/assets/5.jpg",
        description: "Sweet syrup soaked jilapi",
    },
    {
        id: 6,
        name: "Nan Roti",
        price: 30,
        image: "/assets/3.jpg",
        description: "Soft tandoori naan",
    },
];

export default function Home() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cardPage, setCardPage] = useState(false)

    const [cart, setCart] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [purchaseModal, setPurchaseModal] = useState(null)

    console.log(purchaseModal)

    const getPurchasesDataFromLocalStorage = () => {
        const storedItems = localStorage.getItem("items");
        if (storedItems) {
            setCartData(JSON.parse(storedItems));
        }
    }

    // 💾 Update cart (state + localStorage)
    const updateCart = (updatedCart) => {
        setCartData(updatedCart);
        localStorage.setItem("items", JSON.stringify(updatedCart));
    };



    const realtimeParchasesData = () => {
        const stored = localStorage.getItem("items");
        if (stored) {
            setCart(JSON.parse(stored));
        }
    }

    console.log(cart)


    // Restore on refresh
    useEffect(() => {
        realtimeParchasesData()
        getPurchasesDataFromLocalStorage()
    }, []);


    // Purchase
    // const handlePurchasesButton = (item) => {
        
    // };



    const handleCardPage = () => {
        setCardPage(!cardPage)
    }

    console.log(cardPage)



    return (
        <main className="min-h-screen bg-gradient-to-br pt-40 from-[#a855f7] via-[#c084fc] to-[#ec4899] py-10">

            <Cart cart={cart} handleCardPage={handleCardPage}></Cart>

            <CartPage cartData={cartData} updateCart={updateCart} cardPageHaldeler={cardPage} realtimeParchasesData={realtimeParchasesData} handleCardPage={handleCardPage}></CartPage>
            <h1 className="text-4xl z-20 font-bold text-white text-center mb-10">
                Our Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onDetails={setSelectedProduct}
                        setPurchaseModal={setPurchaseModal}
                    // handlePurchasesButton={handlePurchasesButton}
                    />
                ))}
            </div>

            {
                selectedProduct && <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            }
            {
                purchaseModal &&
                <PurchaseModal product={purchaseModal} onAddToCart={setCart} getPurchasesDataFromLocalStorage={getPurchasesDataFromLocalStorage} onClose={() => setPurchaseModal(null)}></PurchaseModal>

            }

        </main>
    );
}
