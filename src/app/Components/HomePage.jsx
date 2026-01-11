'use client'

import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link"
import { useState } from "react";
import { auth } from "./firebase";

export default function HomePage() {

    const [currentUser, setCurrentUser] = useState(null)

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            setCurrentUser(user)
            // ...
        } else {
            // User is signed out
            // ...
        }
    });


    return (
        <main className="min-h-screen w-full bg-gradient-to-br pt-16 from-[#8E2DE2] via-[#A855F7] to-[#EC4899] text-white overflow-hidden">



            {/* Hero Section */}
            <section className="flex flex-col items-center text-center px-6 py-32">
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

                    <button className="px-10 py-4 rounded-full border border-white/50 
            hover:bg-white/20 hover:scale-105 transition-all duration-300">
                        Explore Menu
                    </button>
                </div>
            </section>

            {/* Feature Cards */}
            <section className="max-w-7xl mx-auto px-8 pb-32 grid md:grid-cols-3 gap-10">

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
            <section className="text-center pb-24">
                <h2 className="text-4xl font-extrabold mb-6">
                    Ready for your first bite? 😋
                </h2>
                <button className="px-14 py-5 rounded-full bg-yellow-300 text-purple-700 font-bold
          hover:bg-white hover:scale-110 transition-all duration-300 shadow-2xl">
                    Get Started
                </button>
            </section>

            {/* Footer */}
            <footer className="text-center py-6 text-sm opacity-80">
                © {new Date().getFullYear()} SingaraBazar — Made with ❤️
            </footer>

        </main>
    )
}
