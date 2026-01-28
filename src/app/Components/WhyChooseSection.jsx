// components/WhyChooseSection.jsx
import React from "react";

const features = [
  {
    title: "Fresh Ingredients",
    description: "We use only premium, fresh ingredients for every singara.",
    icon: "🥗",
  },
  {
    title: "Quick Delivery",
    description: "Get your order delivered in under 30 minutes.",
    icon: "🚀",
  },
  {
    title: "Customer Favorite",
    description: "Our singaras are loved by thousands of happy customers.",
    icon: "❤️",
  },
];

const WhyChooseSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Why Choose <span className="text-yellow-300">SingaraOrder</span>? ✨
        </h2>

        <p className="mb-14 text-lg max-w-2xl mx-auto">
          Fast, fresh, and delicious. We bring the best singaras right to your doorstep.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
