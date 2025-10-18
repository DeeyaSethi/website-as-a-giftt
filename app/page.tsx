import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #fff9f0 0%, #f3f0ff 50%, #d4e9ff 100%)' }}>
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 border-b border-white/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-display font-bold" style={{ color: '#7c3aed' }}>
              Website as a Gift
            </h1>
            <Link 
              href="/create"
              className="px-6 py-2 text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: '#7c3aed' }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-32 md:py-40">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight" style={{ color: '#2d3748' }}>
                Beautiful websites.
                <span className="block bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                  Meaningful gifts.
                </span>
              </h2>
              <p className="text-xl mb-8" style={{ color: '#4a5568' }}>
                AI creates personalized websites for the people you love.
              </p>
              
              <Link href="/create" className="btn-primary inline-block">
                Create Now
              </Link>
            </div>
            
            {/* Right: Hero Image */}
            <div className="hidden md:block">
              <Image
                src="/images/hero/main.jpg"
                alt="Magical gift box illustration"
                width={800}
                height={600}
                className="rounded-3xl shadow-2xl w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Minimal */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 p-4">
                <Image
                  src="/images/icons/describe.jpg"
                  alt="Describe"
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="text-lg font-semibold mb-2" style={{ color: '#2d3748' }}>
                Describe
              </h4>
              <p className="text-sm" style={{ color: '#4a5568' }}>
                Tell us about them
              </p>
            </div>
            
            <div>
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 p-4">
                <Image
                  src="/images/icons/ai-magic.jpg"
                  alt="AI Creates"
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="text-lg font-semibold mb-2" style={{ color: '#2d3748' }}>
                AI Creates
              </h4>
              <p className="text-sm" style={{ color: '#4a5568' }}>
                Magic happens
              </p>
            </div>
            
            <div>
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 p-4">
                <Image
                  src="/images/icons/share.jpg"
                  alt="Share"
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="text-lg font-semibold mb-2" style={{ color: '#2d3748' }}>
                Share
              </h4>
              <p className="text-sm" style={{ color: '#4a5568' }}>
                Gift it instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Occasions Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-display font-bold text-center mb-12" style={{ color: '#2d3748' }}>
            Perfect for any occasion
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div 
              className="card overflow-hidden"
              style={{ 
                borderColor: '#ffa8c5'
              }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/occasions/birthday.jpg"
                  alt="Birthday"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center" style={{ background: 'linear-gradient(135deg, #ffe4d1 0%, #ffd6e7 100%)' }}>
                <h4 className="font-semibold" style={{ color: '#2d3748' }}>Birthdays</h4>
              </div>
            </div>
            
            <div 
              className="card overflow-hidden"
              style={{ 
                borderColor: '#b197fc'
              }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/occasions/anniversary.jpg"
                  alt="Anniversary"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center" style={{ background: 'linear-gradient(135deg, #ffd6e7 0%, #f3f0ff 100%)' }}>
                <h4 className="font-semibold" style={{ color: '#2d3748' }}>Anniversaries</h4>
              </div>
            </div>
            
            <div 
              className="card overflow-hidden"
              style={{ 
                borderColor: '#91c5f5'
              }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/occasions/friendship.jpg"
                  alt="Friendship"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center" style={{ background: 'linear-gradient(135deg, #d4e9ff 0%, #d0f4ea 100%)' }}>
                <h4 className="font-semibold" style={{ color: '#2d3748' }}>Friendship</h4>
              </div>
            </div>
            
            <div 
              className="card overflow-hidden"
              style={{ 
                borderColor: '#7dd3c0'
              }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/occasions/baby.jpg"
                  alt="New Baby"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center" style={{ background: 'linear-gradient(135deg, #d0f4ea 0%, #ffe4d1 100%)' }}>
                <h4 className="font-semibold" style={{ color: '#2d3748' }}>New Baby</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h3 className="text-4xl font-display font-bold mb-6" style={{ color: '#2d3748' }}>
          Ready to create?
        </h3>
        <Link href="/create" className="btn-primary inline-block">
          Start Now
        </Link>
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
