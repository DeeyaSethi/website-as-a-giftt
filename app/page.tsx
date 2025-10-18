import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-display font-bold text-slate-900">
              Website as a Gift
            </h1>
            <Link 
              href="/create"
              className="px-6 py-2 text-sm font-medium text-slate-900 hover:text-slate-600 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-display font-bold text-slate-900 mb-6 leading-tight">
            Gifts that live
            <span className="block text-slate-600">forever online</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Create stunning, personalized websites for the people you love. 
            Perfect for birthdays, anniversaries, and special moments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/create"
              className="btn-primary w-full sm:w-auto"
            >
              Create Your Gift
            </Link>
            <button className="btn-secondary w-full sm:w-auto">
              View Examples
            </button>
          </div>
          
          <p className="text-sm text-slate-500 mt-8">
            No design skills needed • AI-powered • Ready in minutes
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              Simple, elegant, powerful
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From idea to beautiful website in three steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">
                Describe your vision
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Tell us about the person and occasion. Our AI understands context, tone, and emotion.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">
                Watch it come alive
              </h4>
              <p className="text-slate-600 leading-relaxed">
                AI generates beautiful layouts, heartfelt content, and perfect colors tailored to your story.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">
                Share the moment
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Get an instant shareable link. Your gift is ready to create lasting memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-slate-50 py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
                Perfect for every occasion
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-8">
                <h4 className="text-2xl font-display font-semibold text-slate-900 mb-3">
                  Birthdays
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Celebrate their special day with a personalized website featuring photos, memories, and heartfelt messages from friends and family.
                </p>
              </div>
              
              <div className="card p-8">
                <h4 className="text-2xl font-display font-semibold text-slate-900 mb-3">
                  Anniversaries
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Honor your journey together with a beautiful timeline of your love story, from first meeting to present day.
                </p>
              </div>
              
              <div className="card p-8">
                <h4 className="text-2xl font-display font-semibold text-slate-900 mb-3">
                  Friendship
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Show appreciation for that special friend with a dedicated space celebrating your bond and shared experiences.
                </p>
              </div>
              
              <div className="card p-8">
                <h4 className="text-2xl font-display font-semibold text-slate-900 mb-3">
                  New Arrivals
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Welcome a precious new life with an elegant announcement website that captures the joy of this moment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Ready to create something special?
          </h3>
          <p className="text-xl text-slate-600 mb-10">
            Start building your gift website in minutes
          </p>
          <Link 
            href="/create"
            className="btn-primary inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center text-slate-600">
            <p className="text-sm">
              © 2025 Website as a Gift. Made with care for meaningful connections.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
