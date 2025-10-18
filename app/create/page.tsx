"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Implement AI generation
    console.log("Generating website for:", prompt);
    
    // Placeholder - will be implemented in Phase 2
    setTimeout(() => {
      setLoading(false);
      alert("AI generation coming soon! This is Phase 0 setup.");
    }, 2000);
  };

  const examplePrompts = [
    {
      label: "Anniversary",
      text: "Create a romantic anniversary website for my partner who loves sunsets and jazz music. We've been together for 5 years.",
      color: "linear-gradient(135deg, #ffd6e7 0%, #f3f0ff 100%)",
      image: "/images/occasions/anniversary.jpg"
    },
    {
      label: "Birthday",
      text: "Make a birthday website for my best friend who's turning 30. She's a book lover, coffee enthusiast, and the kindest person I know.",
      color: "linear-gradient(135deg, #ffe4d1 0%, #ffd6e7 100%)",
      image: "/images/occasions/birthday.jpg"
    },
    {
      label: "Friendship",
      text: "Create a friendship page for my college roommate who's been my rock through everything. He loves hiking and terrible puns.",
      color: "linear-gradient(135deg, #d4e9ff 0%, #d0f4ea 100%)",
      image: "/images/occasions/friendship.jpg"
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #fff9f0 0%, #f3f0ff 50%, #d4e9ff 100%)' }}>
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 border-b border-white/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-display font-bold" style={{ color: '#7c3aed' }}>
              Website as a Gift
            </Link>
            <Link 
              href="/"
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: '#7c3aed' }}
            >
              Back
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4" style={{ color: '#2d3748' }}>
              Create your gift
            </h1>
            <p className="text-lg" style={{ color: '#4a5568' }}>
              Describe them. We'll make it magical.
            </p>
          </div>

          {/* Form */}
          <div 
            className="card p-8 mb-6"
            style={{ 
              background: 'white',
              borderColor: '#e5dbff'
            }}
          >
            <form onSubmit={handleSubmit}>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Tell us about them... their name, what makes them special, the occasion..."
                className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none resize-none transition-all placeholder:text-slate-400 mb-6"
                style={{ 
                  borderColor: '#e5dbff',
                  color: '#2d3748'
                }}
                onFocus={(e) => e.target.style.borderColor = '#b197fc'}
                onBlur={(e) => e.target.style.borderColor = '#e5dbff'}
                rows={6}
                required
              />

              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Generate Website"}
              </button>
            </form>
          </div>

          {/* Example Prompts */}
          <div>
            <p className="text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: '#7c3aed' }}>
              Try an example
            </p>
            <div className="grid gap-3">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setPrompt(example.text)}
                  className="text-left rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
                  style={{ background: example.color }}
                >
                  <div className="flex items-center gap-4 p-4">
                    <div className="w-16 h-16 relative flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={example.image}
                        alt={example.label}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#2d3748' }}>
                        {example.label}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
