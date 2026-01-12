'use client'

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Gradient background */}
      <div className="bg-gradient-to-br from-[#8E2DE2] via-[#A855F7] to-[#EC4899] text-white">

        {/* Glass container */}
        <div className="max-w-7xl mx-auto px-8 py-16 backdrop-blur-xl bg-white/10 border-t border-white/20">

          <div className="grid gap-12 md:grid-cols-4">

            {/* Brand */}
            <div>
              <h2 className="text-3xl font-extrabold mb-4">
                🥟 Singara<span className="text-yellow-300">Order</span>
              </h2>
              <p className="text-sm opacity-90 leading-relaxed">
                Fresh singara. Fast delivery.  
                Order anytime, anywhere.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {["Home", "Order", "Create Order", "Users"].map(item => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(" ", "_")}`}
                      className="hover:text-yellow-300 transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-yellow-300 transition cursor-pointer">
                  Help Center
                </li>
                <li className="hover:text-yellow-300 transition cursor-pointer">
                  Privacy Policy
                </li>
                <li className="hover:text-yellow-300 transition cursor-pointer">
                  Terms & Conditions
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <p className="text-sm opacity-90">
                📧 support@singaraorder.com  
                <br />
                📍 Bangladesh
              </p>
            </div>

          </div>

          {/* Divider */}
          <div className="mt-12 border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between text-sm opacity-80">

            <span>
              © {new Date().getFullYear()} SingaraOrder. All rights reserved.
            </span>

            <div className="flex gap-6 mt-4 md:mt-0">
              <span className="hover:text-yellow-300 transition cursor-pointer">
                Facebook
              </span>
              <span className="hover:text-yellow-300 transition cursor-pointer">
                Twitter
              </span>
              <span className="hover:text-yellow-300 transition cursor-pointer">
                Instagram
              </span>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
