
import CartPage from "./Components/CartPage";
import HomePage from "./Components/HomePage";
import WhyChooseSection from "./Components/WhyChooseSection";

export default function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br pt-16 from-[#8E2DE2] via-[#A855F7] to-[#EC4899] text-white font-sans">
      <main className="max-w-7xl mx-auto">
        <HomePage></HomePage>
        <WhyChooseSection></WhyChooseSection>
      </main>
    </div>
  );
}
