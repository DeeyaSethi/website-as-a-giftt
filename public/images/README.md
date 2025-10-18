# Image Assets

All custom Canva AI illustrations organized by category.

## Folder Structure

```
/images
├── /hero          - Main hero section illustrations
├── /icons         - Feature/step icons (describe, ai-magic, share)
├── /occasions     - Occasion-specific illustrations (birthday, anniversary, etc.)
└── /backgrounds   - Decorative background elements
```

## Image Files

### Hero
- `main.jpg` - Magical gift box opening with website (800x600px)

### Icons
- `describe.jpg` - Person writing/typing with sparkles
- `ai-magic.jpg` - AI magic happening with stars and sparkles
- `share.jpg` - Heart or gift being shared

### Occasions
- `birthday.jpg` - Balloons, cake, celebration vibes
- `anniversary.jpg` - Hearts, flowers, romantic theme
- `friendship.jpg` - Two people hugging/laughing
- `baby.jpg` - Cute baby items, soft and sweet

### Backgrounds
- `confetti.jpg` - Subtle floating shapes/confetti
- `decorative.jpg` - Decorative corners/borders in pink-purple pastels

## Usage

All images are optimized and served through Next.js Image component for best performance.

Example:
```tsx
import Image from "next/image";

<Image
  src="/images/hero/main.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

