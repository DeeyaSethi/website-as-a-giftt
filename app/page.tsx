import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #fff9f0 0%, #f3f0ff 50%, #d4e9ff 100%)' }}>
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 border-b border-white/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg md:text-xl font-display font-bold" style={{ color: '#7c3aed' }}>
              Website as a Gift
            </h1>
            <Link 
              href="/create"
              className="px-4 md:px-6 py-2 text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: '#7c3aed' }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Asymmetric Design */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            {/* Left: Text - Takes 3 columns */}
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
            
            {/* Right: Hero Image - Takes 2 columns, offset */}
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

      {/* How It Works - Horizontal Flow with Cards */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-2xl md:text-4xl font-display font-bold mb-3" style={{ color: '#2d3748' }}>
              Three simple steps
            </h3>
            <p className="text-base md:text-lg" style={{ color: '#4a5568' }}>
              From idea to gift in minutes
            </p>
          </div>

          {/* Staggered Cards Layout */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Card 1 - Higher */}
            <div className="md:transform md:-translate-y-8">
              <div 
                className="card p-8 text-center"
                style={{ 
                  background: 'linear-gradient(135deg, #f3f0ff 0%, #ffd6e7 100%)',
                  borderColor: '#e5dbff'
                }}
              >
                <div className="flex justify-center mb-6">
                  <div 
                    className="w-24 h-24 rounded-2xl flex items-center justify-center p-5 shadow-lg"
                    style={{ background: 'white' }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/icons/describe.jpg"
                        alt="Describe"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div 
                  className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-3"
                  style={{ background: 'white', color: '#7c3aed' }}
                >
                  STEP 1
                </div>
                <h4 className="text-xl md:text-2xl font-display font-bold mb-3" style={{ color: '#2d3748' }}>
                  Describe
                </h4>
                <p className="text-sm md:text-base" style={{ color: '#4a5568' }}>
                  Tell us about the person and what makes them special
                </p>
              </div>
            </div>

            {/* Card 2 - Middle */}
            <div>
              <div 
                className="card p-8 text-center"
                style={{ 
                  background: 'linear-gradient(135deg, #ffd6e7 0%, #ffe4d1 100%)',
                  borderColor: '#ffa8c5'
                }}
              >
                <div className="flex justify-center mb-6">
                  <div 
                    className="w-24 h-24 rounded-2xl flex items-center justify-center p-5 shadow-lg"
                    style={{ background: 'white' }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/icons/ai-magic.jpg"
                        alt="AI Creates"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div 
                  className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-3"
                  style={{ background: 'white', color: '#7c3aed' }}
                >
                  STEP 2
                </div>
                <h4 className="text-xl md:text-2xl font-display font-bold mb-3" style={{ color: '#2d3748' }}>
                  AI Creates
                </h4>
                <p className="text-sm md:text-base" style={{ color: '#4a5568' }}>
                  Watch AI craft a beautiful personalized website
                </p>
              </div>
            </div>

            {/* Card 3 - Lower */}
            <div className="md:transform md:translate-y-8">
              <div 
                className="card p-8 text-center"
                style={{ 
                  background: 'linear-gradient(135deg, #d4e9ff 0%, #d0f4ea 100%)',
                  borderColor: '#91c5f5'
                }}
              >
                <div className="flex justify-center mb-6">
                  <div 
                    className="w-24 h-24 rounded-2xl flex items-center justify-center p-5 shadow-lg"
                    style={{ background: 'white' }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/icons/share.jpg"
                        alt="Share"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div 
                  className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-3"
                  style={{ background: 'white', color: '#7c3aed' }}
                >
                  STEP 3
                </div>
                <h4 className="text-xl md:text-2xl font-display font-bold mb-3" style={{ color: '#2d3748' }}>
                  Share
                </h4>
                <p className="text-sm md:text-base" style={{ color: '#4a5568' }}>
                  Get a link to share your heartfelt gift instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Occasions - Creative Masonry Layout */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-4xl font-display font-bold text-center mb-12 md:mb-16" style={{ color: '#2d3748' }}>
            Perfect for any occasion
          </h3>
          
          {/* Bento Box Style Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Birthday - Large */}
            <div className="md:col-span-2 md:row-span-2">
              <div 
                className="card overflow-hidden group cursor-pointer h-full"
                style={{ 
                  borderColor: '#ffa8c5',
                  background: 'white'
                }}
              >
                <div className="relative h-48 md:h-full overflow-hidden">
                  <Image
                    src="/images/occasions/birthday.jpg"
                    alt="Birthday"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h4 className="text-lg md:text-2xl font-display font-bold mb-2" style={{ color: '#2d3748' }}>
                    Birthdays
                  </h4>
                  <p className="text-sm md:text-base hidden md:block" style={{ color: '#4a5568' }}>
                    Celebrate their special day
                  </p>
                </div>
              </div>
            </div>

            {/* Anniversary */}
            <div className="md:col-span-2">
              <div 
                className="card overflow-hidden group cursor-pointer"
                style={{ 
                  borderColor: '#b197fc',
                  background: 'white'
                }}
              >
                <div className="grid grid-cols-2 gap-0">
                  <div className="relative h-32 md:h-40 overflow-hidden">
                    <Image
                      src="/images/occasions/anniversary.jpg"
                      alt="Anniversary"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 md:p-6 flex flex-col justify-center">
                    <h4 className="text-base md:text-xl font-display font-bold mb-1" style={{ color: '#2d3748' }}>
                      Anniversaries
                    </h4>
                    <p className="text-xs md:text-sm" style={{ color: '#4a5568' }}>
                      Honor your love
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Friendship */}
            <div>
              <div 
                className="card overflow-hidden group cursor-pointer"
                style={{ 
                  borderColor: '#91c5f5',
                  background: 'white'
                }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src="/images/occasions/friendship.jpg"
                    alt="Friendship"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 md:p-4 text-center">
                  <h4 className="font-semibold text-sm md:text-base" style={{ color: '#2d3748' }}>
                    Friendship
                  </h4>
                </div>
              </div>
            </div>

            {/* Baby */}
            <div>
              <div 
                className="card overflow-hidden group cursor-pointer"
                style={{ 
                  borderColor: '#7dd3c0',
                  background: 'white'
                }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src="/images/occasions/baby.jpg"
                    alt="New Baby"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 md:p-4 text-center">
                  <h4 className="font-semibold text-sm md:text-base" style={{ color: '#2d3748' }}>
                    New Baby
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Centered with background */}
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
