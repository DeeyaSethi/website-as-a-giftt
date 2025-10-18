# 🎁 Website as a Gift - Development Plan

WE NEED A MOBILE COMPATIBLE APP - ALL THE THINGS SHOULD BE SUPPORTED ON MOBILE WEB AND UI SHOULD LOOK AMAZING AND INVITING AND BEAUTIFUL AND MINIMAL

## 💰 Zero-Cost Strategy (10 users/day)

### Free Tier Stack
- **Hosting**: Vercel (Free tier: unlimited personal projects)
- **AI**: OpenAI GPT-4o-mini ($0.150/1M input tokens, $0.600/1M output tokens)
  - ~10 users/day × 5K tokens avg = 50K tokens/day = $1.50/month (very affordable)
  - Alternative: Anthropic Claude (new accounts get free credits)
- **Database**: None needed for MVP - stateless generation
- **Storage**: GitHub for generated sites (free public repos)
- **Deployment Target**: GitHub Pages (free) or Vercel (free)
- **Domain**: Use free subdomain initially (yourusername.vercel.app)

### Cost Breakdown for 10 users/day
- Hosting: $0 (Vercel free tier)
- AI API: ~$1.50-3/month (minimal usage)
- Storage: $0 (GitHub free)
- **Total: $0-3/month** ✅

---

## 📋 Phase-by-Phase Development Plan

### **PHASE 0: Project Setup** (Day 1)
- [ ] Initialize Next.js 15 project with TypeScript
- [ ] Install dependencies (Tailwind, shadcn/ui)
- [ ] Set up folder structure
- [ ] Configure environment variables
- [ ] Set up Git repository
- [ ] Deploy skeleton to Vercel

### **PHASE 1: Core Infrastructure** (Days 2-3)
- [ ] Create TypeScript interfaces for:
  - Theme types (Birthday, Anniversary, Newborn, Friendship)
  - Page component types (Gallery, Letter, Timeline, Messages)
  - AI response structure
  - Generated site configuration
- [ ] Build template registry system (`/lib/templates.ts`)
- [ ] Create base component interface that all page types implement
- [ ] Set up AI integration (`/lib/ai.ts`)
  - OpenAI client setup
  - Prompt engineering for theme selection
  - Prompt engineering for content generation

### **PHASE 2: Input & AI Layer** (Days 4-5)
- [ ] Build input form component
  - Text input for prompt
  - Optional guided questions (name, occasion, interests, relationship)
  - Tone selector (heartfelt, funny, romantic, casual)
  - **Image upload capability (up to 10 photos)**
    - Drag & drop interface
    - Preview thumbnails
    - Image validation (size, format)
    - Optional captions per image
- [ ] Create AI processing pipeline:
  - Step 1: Analyze input → determine theme
  - Step 2: Decide which page components to use
  - Step 3: Generate content for each page
  - Step 4: **Integrate user-uploaded images** into appropriate pages
  - Step 5: Return structured JSON with all data
- [ ] Add loading states and progress indicators
- [ ] Error handling for AI failures
- [ ] **Image handling system**
  - Client-side image compression
  - Base64 encoding for initial storage
  - Generate captions using AI if not provided

### **PHASE 3: Page Templates** (Days 6-8)
Build 4 core page components (each with 2-3 variants):

**Must-Have Templates:**
- [ ] **Hero/Landing Page**
  - Full-screen greeting with name
  - Animated entrance
  - Background options (gradient, image, **user-uploaded photo**)
  - **Profile photo display option**
  
- [ ] **Letter/Message Page**
  - Handwritten-style font option
  - Centered text layout
  - Background texture
  - **Optional decorative photo border**
  
- [ ] **Gallery Page**
  - Photo grid layout (**uses user-uploaded images**)
  - Lightbox functionality
  - **AI-generated or user-provided captions** per photo
  - Masonry layout for varied image sizes
  - **Automatic placeholder handling** if no images provided
  
- [ ] **Timeline Page**
  - Vertical timeline with dates/events
  - Milestone markers
  - Responsive design
  - **Optional photo per timeline event**

**Themes to Support (MVP):**
- [ ] Birthday
- [ ] Anniversary
- [ ] Friendship

### **PHASE 4: Template Composer** (Days 9-10)
- [ ] Build dynamic page assembly system
  - Takes AI output (pages array + content)
  - Dynamically imports correct components
  - Stitches them together in order
- [ ] Create navigation between pages
  - Smooth scroll or page transitions
  - Progress indicator
  - Back to top button
- [ ] Add theme styling system
  - Color palette per theme
  - Font pairings
  - Spacing and layout variants

### **PHASE 5: Preview & Generation** (Days 11-12)
- [ ] Build site preview system
  - Iframe preview of generated site
  - Editable content (let user tweak AI output)
  - Regenerate button
- [ ] Create export functionality
  - Generate standalone HTML/CSS/JS bundle
  - Or generate Next.js static export
  - Package as deployable artifact

### **PHASE 6: Deployment Integration** (Days 13-14)
- [ ] **Image Storage & Optimization**
  - Convert images to WebP format
  - Generate responsive image variants (thumbnail, medium, large)
  - Optimize file sizes
  - Bundle with deployment
- [ ] GitHub Pages deployment
  - Create new GitHub repo via API (user needs to auth)
  - Push generated site **with images** to repo
  - Enable GitHub Pages
  - Return live URL
- [ ] Vercel deployment (alternative)
  - Use Vercel API to deploy
  - **Upload images to Vercel's CDN**
  - Return live URL
- [ ] Simple option: Direct download
  - User downloads ZIP file **with embedded images**
  - Can host anywhere manually

### **PHASE 7: Polish & UX** (Days 15-16)
- [ ] Add beautiful landing page for the tool itself
- [ ] Create "How it works" section
- [ ] Add example gallery (showcase 3-4 sample sites)
- [ ] Mobile responsiveness check
- [ ] Add share buttons to generated sites
- [ ] Add "Made with Website as a Gift" footer link
- [ ] Error handling and user feedback
- [ ] Loading animations

### **PHASE 8: Testing & Launch** (Day 17-18)
- [ ] Test full flow end-to-end
- [ ] Test on different devices
- [ ] Fix bugs and edge cases
- [ ] Add analytics (Vercel Analytics - free)
- [ ] Deploy production version
- [ ] Create simple documentation

---

## 🏗️ Folder Structure (Implementation)

```
/website-as-a-gift
├── /app
│   ├── page.tsx                    ← Main landing page (the tool UI)
│   ├── /create
│   │   └── page.tsx                ← Input form page (with image upload)
│   ├── /preview
│   │   └── page.tsx                ← Preview generated site
│   ├── /api
│   │   ├── generate/route.ts       ← AI generation endpoint
│   │   ├── deploy/route.ts         ← Deployment endpoint
│   │   └── upload/route.ts         ← Image upload handler
│   └── layout.tsx
├── /lib
│   ├── ai.ts                       ← OpenAI integration
│   ├── templates.ts                ← Template registry
│   ├── composer.ts                 ← Page assembly logic
│   ├── deploy.ts                   ← Deployment handlers
│   ├── imageProcessor.ts           ← Image optimization & handling
│   └── types.ts                    ← TypeScript interfaces
├── /components
│   ├── /form
│   │   ├── InputForm.tsx
│   │   ├── PromptInput.tsx
│   │   └── ImageUploader.tsx       ← Drag & drop image upload
│   ├── /preview
│   │   └── SitePreview.tsx
│   ├── /ui                         ← shadcn/ui components
│   └── /templates                  ← Page templates
│       ├── /hero
│       │   ├── HeroBasic.tsx
│       │   ├── HeroAnimated.tsx
│       │   └── index.ts
│       ├── /letter
│       │   ├── LetterClassic.tsx
│       │   └── index.ts
│       ├── /gallery
│       │   ├── GalleryGrid.tsx     ← Uses user images
│       │   └── index.ts
│       └── /timeline
│           ├── TimelineVertical.tsx
│           └── index.ts
├── /data
│   ├── themes.json                 ← Theme configurations
│   └── examples.json               ← Example sites
├── /public
│   ├── /images                     ← Static illustrations
│   ├── /fonts
│   └── /placeholders               ← Default images when user doesn't upload
├── .env.local
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## 📸 Image Upload & Handling Architecture

### **User Image Flow**

```
1. Upload (Create Page)
   ↓
   User selects/drags images
   ↓
   Client-side validation (format, size, count)
   ↓
   Compress & resize images
   ↓
   Convert to Base64 for preview
   
2. Processing (AI Generation)
   ↓
   AI analyzes images (if captions not provided)
   ↓
   Generates descriptions/captions
   ↓
   Determines best placement (Hero bg, Gallery, Timeline)
   ↓
   Creates optimized variants (thumbnail, medium, full)
   
3. Embedding (Site Generation)
   ↓
   Images embedded in template components
   ↓
   Responsive srcset generated
   ↓
   Lazy loading implemented
   
4. Deployment
   ↓
   Images bundled with site
   ↓
   Uploaded to hosting (GitHub/Vercel)
   ↓
   Served with optimizations
```

### **Technical Implementation**

**Upload Component Features:**
- Drag & drop interface with preview
- Maximum 10 images (configurable)
- Supported formats: JPG, PNG, WebP
- Max size per image: 5MB
- Automatic orientation correction
- Crop/rotate tools (optional)

**Image Processing:**
- Client-side compression using `browser-image-compression`
- Generate 3 variants:
  - Thumbnail: 300px width
  - Medium: 800px width  
  - Full: 1920px width
- Convert to WebP for optimal size
- Maintain aspect ratios

**Storage Strategy (Zero-Cost MVP):**
- **During creation**: Base64 in memory/state
- **After generation**: Embedded directly in HTML/deployed site
- **No separate storage needed**: Images are part of the static site
- **Alternative for Phase 2**: Optional Cloudinary/ImgIX integration

**AI Image Analysis:**
- Use OpenAI Vision API to generate captions
- Analyze image content for appropriate placement
- Suggest which images work best for Hero, Gallery, Timeline
- Generate alt text for accessibility

**Embedding in Templates:**
- Gallery: All images in grid/masonry layout
- Hero: Best/first image as background
- Timeline: Associate images with specific events
- Letter: Optional decorative border image

**Fallback Strategy:**
- If no images uploaded: Use beautiful placeholder illustrations
- Gradients and patterns as alternatives
- Theme-appropriate default images

---

## 🎯 MVP Feature Checklist

### Must Have (MVP)
- ✅ Simple text prompt input
- ✅ **Photo upload capability (up to 10 images)**
- ✅ AI theme detection
- ✅ 3 themes (Birthday, Anniversary, Friendship)
- ✅ 4 page types (Hero, Letter, Gallery, Timeline)
- ✅ **AI-generated captions for uploaded photos**
- ✅ Preview before deployment
- ✅ Generate shareable link
- ✅ Mobile responsive

### Nice to Have (Post-MVP)
- ⏳ Multiple color schemes per theme
- ⏳ Custom domain purchase
- ⏳ Password protection for sites
- ⏳ Expiring links (auto-delete after 30 days)
- ⏳ View counter
- ⏳ Allow recipient to download/save site
- ⏳ Video support (in addition to images)

### Future (Version 2)
- 📅 More themes (Newborn, Graduation, Retirement, Pet Memorial)
- 📅 Video integration
- 📅 Music background
- 📅 Guest book (visitors can leave messages)
- 📅 Printable poster version
- 📅 Premium templates
- 📅 White-label option

---

## 🔑 Environment Variables Needed

Create `.env.local`:
```bash
# AI API
OPENAI_API_KEY=your_key_here

# Optional: GitHub Integration
GITHUB_TOKEN=your_token_here

# Optional: Vercel Integration
VERCEL_TOKEN=your_token_here
```

---

## 📦 Dependencies to Install

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "openai": "^4.20.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.300.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## 🚀 Quick Start (Once We Begin)

1. Initialize project: `npx create-next-app@latest website-as-a-gift`
2. Install dependencies
3. Set up environment variables
4. Build core infrastructure (types, AI client)
5. Create first template component
6. Test AI generation flow
7. Build preview system
8. Add deployment
9. Polish and launch

---

## 🎨 Design Philosophy

1. **Simple & Magical**: User enters prompt → gets beautiful site
2. **Fast**: Entire generation should take < 30 seconds
3. **Beautiful by Default**: Every generated site should look professional
4. **Mobile-First**: Most recipients will view on phones
5. **Accessible**: WCAG AA compliance for generated sites
6. **Shareable**: Easy to share link via text, email, social media

---

## 🧪 Testing Strategy

- Test AI with various prompts (edge cases)
- Test all theme variations
- Test mobile responsiveness
- Test deployment flow end-to-end
- Load testing (simulate 10 concurrent users)

---

## 📊 Success Metrics (to track later)

- Sites generated per day
- Completion rate (started → deployed)
- Average generation time
- User satisfaction (feedback form)
- Return users
- Shared links clicked

---

## 🎯 Next Steps

1. **Review this plan** - let me know if you want to adjust anything
2. **Get OpenAI API key** - sign up at platform.openai.com
3. **Start Phase 0** - initialize the project
4. **Build incrementally** - we'll go phase by phase

Ready to start building? Let's begin with Phase 0! 🚀

