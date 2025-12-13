"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: "/images/icons/describe.jpg",
      title: "Describe",
      description: "Tell us about the person and what makes them special",
      gradient: "linear-gradient(135deg, #f3f0ff 0%, #ffd6e7 100%)",
      border: "#e5dbff"
    },
    {
      icon: "/images/icons/ai-magic.jpg",
      title: "AI Creates",
      description: "Watch AI craft a beautiful personalized website",
      gradient: "linear-gradient(135deg, #ffd6e7 0%, #ffe4d1 100%)",
      border: "#ffa8c5"
    },
    {
      icon: "/images/icons/share.jpg",
      title: "Share",
      description: "Get a link to share your heartfelt gift instantly",
      gradient: "linear-gradient(135deg, #d4e9ff 0%, #d0f4ea 100%)",
      border: "#91c5f5"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #fff9f0 0%, #f3f0ff 50%, #d4e9ff 100%)' }}>
      {/* Navigation */}
      {/* Navigation - Removed as it is now in layout */}

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3 text-center md:text-left">
              <h2 className="text-4xl md:text-7xl font-display font-bold mb-4 md:mb-6 leading-tight" style={{ color: '#2d3748' }}>
                Beautiful websites.
                <span className="block mt-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                  Meaningful gifts.
                </span>
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-xl" style={{ color: '#4a5568' }}>
                AI creates personalized websites for the people you love.
              </p>

              <Link href="/create" className="btn-primary inline-block">
                Create Now
              </Link>
            </div>

            <div className="md:col-span-2 relative">
              <div className="relative w-full aspect-square md:transform md:translate-y-8">
                <Image
                  src="/images/hero/main.jpg"
                  alt="Magical gift box illustration"
                  fill
                  className="rounded-3xl shadow-2xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Steps Section */}
      <section className="container mx-auto px-6 py-16 md:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-4xl font-display font-bold mb-3" style={{ color: '#2d3748' }}>
              Three simple steps
            </h3>
            <p className="text-base md:text-lg" style={{ color: '#4a5568' }}>
              From idea to gift in minutes
            </p>
          </div>

          {/* Single Animated Card */}
          <div className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center">
            {steps.map((step, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-all duration-500 ease-in-out"
                style={{
                  opacity: activeStep === index ? 1 : 0,
                  transform: activeStep === index
                    ? 'translateY(0) scale(1)'
                    : activeStep === (index - 1 + steps.length) % steps.length
                      ? 'translateY(-30px) scale(0.96)'
                      : 'translateY(30px) scale(0.96)',
                  pointerEvents: activeStep === index ? 'auto' : 'none'
                }}
              >
                <div
                  className="card p-10 md:p-16 text-center shadow-2xl"
                  style={{
                    background: step.gradient,
                    borderColor: step.border,
                    borderWidth: '2px'
                  }}
                >
                  <div className="flex justify-center mb-8">
                    <div
                      className="w-28 h-28 md:w-36 md:h-36 rounded-3xl flex items-center justify-center p-6 md:p-8 shadow-xl"
                      style={{ background: 'white' }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={step.icon}
                          alt={step.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <h4 className="text-3xl md:text-5xl font-display font-bold mb-4" style={{ color: '#2d3748' }}>
                    {step.title}
                  </h4>
                  <p className="text-base md:text-xl max-w-md mx-auto" style={{ color: '#4a5568' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className="transition-all duration-300"
                style={{
                  width: activeStep === index ? '32px' : '12px',
                  height: '12px',
                  borderRadius: '6px',
                  background: activeStep === index
                    ? 'linear-gradient(135deg, #b197fc 0%, #ffa8c5 100%)'
                    : '#e5dbff',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Occasions - Clean Uniform Grid */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-4xl font-display font-bold text-center mb-12 md:mb-16" style={{ color: '#2d3748' }}>
            Perfect for any occasion
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div
              className="card overflow-hidden group cursor-pointer"
              style={{
                borderColor: '#ffa8c5',
                background: 'white'
              }}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src="/images/occasions/birthday.jpg"
                  alt="Birthday"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <h4 className="font-semibold text-sm md:text-base" style={{ color: '#2d3748' }}>
                  Birthdays
                </h4>
              </div>
            </div>

            <div
              className="card overflow-hidden group cursor-pointer"
              style={{
                borderColor: '#b197fc',
                background: 'white'
              }}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src="/images/occasions/anniversary.jpg"
                  alt="Anniversary"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <h4 className="font-semibold text-sm md:text-base" style={{ color: '#2d3748' }}>
                  Anniversaries
                </h4>
              </div>
            </div>

            <div
              className="card overflow-hidden group cursor-pointer"
              style={{
                borderColor: '#91c5f5',
                background: 'white'
              }}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src="/images/occasions/friendship.jpg"
                  alt="Friendship"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <h4 className="font-semibold text-sm md:text-base" style={{ color: '#2d3748' }}>
                  Friendship
                </h4>
              </div>
            </div>

            <div
              className="card overflow-hidden group cursor-pointer"
              style={{
                borderColor: '#7dd3c0',
                background: 'white'
              }}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src="/images/occasions/baby.jpg"
                  alt="New Baby"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <h4 className="font-semibold text-sm md:text-base" style={{ color: '#2d3748' }}>
                  New Baby
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div
          className="max-w-3xl mx-auto text-center rounded-3xl p-12 md:p-16"
          style={{
            background: 'linear-gradient(135deg, #f3f0ff 0%, #d4e9ff 100%)',
            border: '2px solid #e5dbff'
          }}
        >
          <h3 className="text-3xl md:text-5xl font-display font-bold mb-6" style={{ color: '#2d3748' }}>
            Ready to create?
          </h3>
          <p className="text-lg md:text-xl mb-8" style={{ color: '#4a5568' }}>
            Start building your gift in minutes
          </p>
          <Link href="/create" className="btn-primary inline-block">
            Start Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/30">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-sm" style={{ color: '#7c3aed' }}>
            © 2025 Website as a Gift
          </div>
        </div>
      </footer>
    </div>
  );
}
