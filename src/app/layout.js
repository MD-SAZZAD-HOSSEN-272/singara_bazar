import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Providers from "./Components/Provider";
import Footer from "./Components/Footer";
import ClientProvider from "./Components/ClitentProvider";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="antialiased"
        suppressHydrationWarning
        >
        
        {/* Tawk.to Chatbot */}
        <Script
          id="tawk-chat"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),
                    s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/6971ea702253d0197d201cf9/1jfifnihv';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />

        <Navbar />

        <ClientProvider>
          <Providers>{children}</Providers>
        </ClientProvider>

        <Footer />
      </body>
    </html>
  );
}
