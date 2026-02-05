'use client'

import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link"
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { CardSwiper } from "./Swiper/CardSwiper";

export default function HomePage() {

    const [currentUser, setCurrentUser] = useState(null)



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }
        });

        return () => unsubscribe()
    }, [])


    return (
        <main className="min-h-screen w-full text-white ">



            {/* Hero Section */}
            <div className="flex flex-col md:flex-row gap-5 items-center md:justify-between pb-20">
                <section className="flex flex-col items-center text-center px-6 pb-20 pt-20 md:pt-52">
                    <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                        Taste That <span className="text-yellow-300">Clicks</span> ✨
                    </h2>

                    <p className="max-w-2xl text-lg opacity-90 mb-10">
                        Order fresh & hot singara online.
                        Fast delivery. Premium taste. Zero hassle.
                    </p>

                    <div className="flex gap-6">
                        <Link href={`${currentUser ? '/create_order' : '/login'}`} className="px-10 py-4 rounded-full bg-white text-purple-600 font-bold 
            hover:scale-110 hover:bg-yellow-300 transition-all duration-300 shadow-xl">
                            Order Now
                        </Link>

                        {/* <button className="px-10 py-4 rounded-full border border-white/50 
            hover:bg-white/20 hover:scale-105 transition-all duration-300">
                        Explore Menu
                    </button> */}
                    </div>
                </section>
                <section>
                    <CardSwiper></CardSwiper>
                </section>
            </div>

            {/* Feature Cards */}
            <section className="max-w-7xl mx-auto px-8 pb-10 grid md:grid-cols-3 gap-10">

                {[
                    { title: '🔥 Always Hot', desc: 'Freshly fried before delivery.' },
                    { title: '⚡ Super Fast', desc: 'Your order arrives in minutes.' },
                    { title: '💜 Best Quality', desc: 'Premium ingredients only.' },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="backdrop-blur-xl bg-white/15 border border-white/20 rounded-2xl p-8
            hover:bg-white/25 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
                    >
                        <h3 className="text-2xl font-bold mb-4">
                            {item.title}
                        </h3>
                        <p className="opacity-90">{item.desc}</p>
                    </div>
                ))}

            </section>

            {/* CTA */}
            <section className="text-center pb-24 space-y-6 px-6">
                <h2 className="text-4xl font-extrabold">
                    Ready for your first bite? 😋
                </h2>
                <Link
                    href={`${currentUser ? '/order' : '/login'}`}
                    className="block px-14 py-5 rounded-full bg-yellow-300 text-purple-700 font-bold
               hover:bg-white hover:scale-110 transition-all duration-300 shadow-2xl w-fit text-center mx-auto"
                >
                    Get Started
                </Link>
            </section>

        </main>
    )
}
