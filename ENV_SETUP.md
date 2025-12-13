# Environment Variables Setup

This project requires the following environment variables to be set in your `.env.local` file:

## Required

### Google Gemini API Key
```
GEMINI_API_KEY=your_gemini_api_key_here
```

**Get your key at:** https://aistudio.google.com/app/apikey

This is required for:
- AI content generation
- Template suggestions
- Text refinement
- Image analysis

## Optional

### API Ninjas Key (for Tech Facts Template)
```
API_NINJAS_KEY=your_api_ninjas_key_here
```

**Get your free key at:** https://api-ninjas.com/

This enables:
- Live tech facts fetching
- Fresh random facts each generation

**Note:** If not configured, the Tech Facts template will use default pre-loaded facts instead.

## Setup Instructions

1. Create a `.env.local` file in the project root
2. Copy the environment variables from above
3. Replace the placeholder values with your actual API keys
4. Restart your development server

