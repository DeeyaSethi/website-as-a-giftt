# 🎁 Website as a Gift

Create beautiful, personalized websites as gifts for your loved ones - powered by AI.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or higher
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd website-as-a-gift
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-...your-key-here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Documentation

See [PLAN.md](./PLAN.md) for the complete development plan and architecture.

## 🎯 Current Status

✅ Phase 0: Project Setup (COMPLETE)
- [x] Next.js 15 with TypeScript
- [x] Tailwind CSS configured
- [x] Folder structure created
- [x] Core types defined
- [x] AI integration scaffolding
- [x] Basic UI pages

🚧 Phase 1: Core Infrastructure (IN PROGRESS)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o-mini
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

```
website-as-a-gift/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── create/            # Site creation flow
│   └── api/               # API routes (coming soon)
├── lib/                   # Core logic
│   ├── ai.ts             # AI integration
│   ├── types.ts          # TypeScript definitions
│   ├── templates.ts      # Template registry
│   └── utils.ts          # Helper functions
├── components/           # React components (coming soon)
├── data/                 # Static data
│   └── themes.json       # Theme configurations
└── public/              # Static assets
```

## 🎨 Features

- ✨ AI-powered content generation
- 🎨 Beautiful, responsive templates
- 🎯 Multiple themes (Birthday, Anniversary, Friendship, etc.)
- 📱 Mobile-first design
- 🚀 One-click deployment
- 🎁 Shareable gift websites

## 💡 How It Works

1. User describes the person and occasion
2. AI determines the theme and generates personalized content
3. System assembles a beautiful website from template components
4. User previews and customizes
5. Website is deployed with a shareable link

## 🔑 Environment Variables

Create a `.env.local` file with:

```bash
# Required
OPENAI_API_KEY=your_openai_api_key

# Optional (for deployment features)
GITHUB_TOKEN=your_github_token
VERCEL_TOKEN=your_vercel_token
```

## 📝 Development Phases

- [x] Phase 0: Project Setup
- [ ] Phase 1: Core Infrastructure
- [ ] Phase 2: Input & AI Layer
- [ ] Phase 3: Page Templates
- [ ] Phase 4: Template Composer
- [ ] Phase 5: Preview & Generation
- [ ] Phase 6: Deployment Integration
- [ ] Phase 7: Polish & UX
- [ ] Phase 8: Testing & Launch

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

MIT

## 🎉 Examples

- Birthday celebration for a cat-loving friend
- Romantic anniversary timeline
- Friendship appreciation page
- New baby announcement

---

Built with ❤️ for creating memorable digital gifts

