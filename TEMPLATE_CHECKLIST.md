# 📋 Checklist: Adding a New Template

This checklist ensures all necessary files are updated when adding a new template to the platform.

## ✅ Step-by-Step Checklist

### 1️⃣ **Create the Template Component**
- [ ] Create new folder: `components/templates/[template-name]/`
- [ ] Create component: `[TemplateName]Template.tsx`
- [ ] Implement props interface:
  ```typescript
  interface TemplateNameTemplateProps {
    content: Record<string, any>;
    theme: Theme;
    colorPalette?: any;
    images?: any[]; // if needed
  }
  ```
- [ ] Add animations with `framer-motion`
- [ ] Make it responsive (mobile-first)
- [ ] Use theme colors via `getThemeColors(theme, colorPalette)`
- [ ] Test with different color palettes

---

### 2️⃣ **Add Dynamic Questions** (`lib/dynamicTemplateQuestions.ts`)
- [ ] Add case to `getTemplateQuestions()` switch statement
- [ ] Create `get[TemplateName]Questions()` function
- [ ] Define template-specific questions with:
  - `id`, `label`, `type`, `placeholder`, `required`, `helperText`
  - Support types: `text`, `textarea`, `select`
- [ ] Add case to `getTemplateRefinementPrompt()` switch statement
- [ ] Create `get[TemplateName]RefinementPrompt()` function
- [ ] Write clear AI prompt for content generation

---

### 3️⃣ **Update Create Page** (`app/create/page.tsx`)
- [ ] Add to `AVAILABLE_TEMPLATES` array:
  ```typescript
  { 
    id: "templatename", 
    name: "Display Name", 
    icon: "💡", 
    description: "Short description" 
  }
  ```
- [ ] Import icon from `lucide-react`
- [ ] Add to `TEMPLATE_ICONS` mapping:
  ```typescript
  templatename: IconName,
  ```
- [ ] Add to `TEMPLATE_COLORS` mapping:
  ```typescript
  templatename: { 
    from: "from-color-100", 
    to: "to-color-100", 
    icon: "text-color-600" 
  },
  ```
- [ ] Add autofill helper function if needed:
  ```typescript
  const get[TemplateName]Suggestions = () => { ... }
  ```
- [ ] Add autofill UI in template questions section (if applicable)

---

### 4️⃣ **Update Template Composer** (`components/preview/TemplateComposer.tsx`)
- [ ] Import the new template component:
  ```typescript
  import { TemplateNameTemplate } from "@/components/templates/templatename/TemplateNameTemplate";
  ```
- [ ] Add to `PAGE_ICONS` mapping:
  ```typescript
  templatename: "💡",
  ```
- [ ] Add to `PAGE_LABELS` mapping:
  ```typescript
  templatename: "Display Name",
  ```
- [ ] Add case to `renderPage()` switch statement:
  ```typescript
  case "templatename":
    return (
      <TemplateNameTemplate
        key={key}
        content={page.content}
        theme={site.theme}
        colorPalette={site.colorPalette}
      />
    );
  ```

---

### 5️⃣ **Update AI Generation Route** (`app/api/generate/route.ts`)
- [ ] Add template type to the JSON schema in `buildGenerationPrompt()`:
  ```typescript
  "type": "hero" | "letter" | ... | "templatename"
  ```
- [ ] If template needs external API/data:
  - [ ] Add API fetching logic before AI generation
  - [ ] Store fetched data in `templateContent.templatename`
  - [ ] Document in ENV_SETUP.md if API key needed

---

### 6️⃣ **Update AI Template Suggestions** (`app/api/suggest-templates/route.ts`)
- [ ] Add to `AVAILABLE_TEMPLATES` array:
  ```typescript
  { 
    id: "templatename", 
    name: "Display Name", 
    description: "Clear description for AI to understand when to recommend it" 
  }
  ```
- [ ] Add guideline in the prompt's `GUIDELINES` section:
  ```typescript
  8. "templatename" is ideal for [describe target users/scenarios]
  ```
- [ ] Test that AI recommends it for relevant keywords/interests

**Important:** This makes your template appear in AI-picked suggestions on Step 2!

---

### 7️⃣ **Additional Files (if applicable)**

#### If Template Needs External API:
- [ ] Create API route: `app/api/[template-name]/route.ts`
- [ ] Add API key to `ENV_SETUP.md`
- [ ] Add graceful fallback if API fails
- [ ] Test with and without API key

#### If Template Has Special Assets:
- [ ] Add images to `public/images/[template-name]/`
- [ ] Create README in that folder explaining assets

#### If Template Has Presets/Data:
- [ ] Add to `lib/presets.ts` if template should appear in presets
- [ ] Create data file if needed (e.g., `lib/[template-name]Data.ts`)

---

### 8️⃣ **Testing Checklist**
- [ ] Template appears in Step 2 (Template Selection)
- [ ] Template icon and colors display correctly
- [ ] **AI recommends template** when relevant keywords/interests are mentioned ⭐
- [ ] Template shows in Step 4 (Add Content) with proper questions
- [ ] Autofill suggestions work (if added)
- [ ] Template can be removed via trash icon
- [ ] Template content saves when navigating steps
- [ ] AI refinement works properly
- [ ] Generated preview renders correctly
- [ ] Template respects selected color palette
- [ ] Navigation works (next/previous page)
- [ ] Mobile responsive design works
- [ ] No console errors or warnings
- [ ] No TypeScript/linter errors

---

### 9️⃣ **Documentation**
- [ ] Update main `README.md` with new template
- [ ] Add template to features list
- [ ] Document any special requirements
- [ ] Add example use case
- [ ] Update `PLAN.md` if architecture changed

---

## 🎯 Quick Reference: Files to Touch

**Always Required:**
1. `components/templates/[name]/[Name]Template.tsx` - Template component
2. `lib/dynamicTemplateQuestions.ts` - Q&A logic
3. `app/create/page.tsx` - Selection UI
4. `components/preview/TemplateComposer.tsx` - Rendering
5. `app/api/generate/route.ts` - AI generation
6. `app/api/suggest-templates/route.ts` - AI template recommendations ⭐ (Often forgotten!)

**Sometimes Required:**
7. `app/api/[name]/route.ts` - External API integration
8. `lib/presets.ts` - Preset templates
9. `ENV_SETUP.md` - Environment variables
10. `public/images/` - Template assets

---

## 💡 Pro Tips

1. **Copy from Existing Template**: Use a similar template as starting point
2. **Test Early**: Test integration after each major step
3. **Use TypeScript**: Proper types prevent runtime errors
4. **Mobile First**: Design for mobile, enhance for desktop
5. **Error Handling**: Always have fallbacks for APIs/data
6. **Performance**: Lazy load heavy components if needed
7. **Accessibility**: Use semantic HTML and ARIA labels

---

## 🐛 Common Issues

- **Template not showing**: Check `AVAILABLE_TEMPLATES` array in `app/create/page.tsx`
- **Icon missing**: Import from `lucide-react` and add to `TEMPLATE_ICONS`
- **Colors wrong**: Add to `TEMPLATE_COLORS` mapping
- **AI not recommending template**: Check `app/api/suggest-templates/route.ts` - template must be in `AVAILABLE_TEMPLATES` array there too! ⭐
- **AI generation not working**: Check refinement prompt formatting in `lib/dynamicTemplateQuestions.ts`
- **Questions not showing**: Verify `getTemplateQuestions()` case in `lib/dynamicTemplateQuestions.ts`
- **Duplicate key errors**: Ensure all sibling elements have unique `key` props

---

## ✅ Example: Tech Facts Template

See the Tech Facts template as a complete reference implementation:
- Component: `components/templates/techfacts/TechFactsTemplate.tsx`
- Questions: `lib/dynamicTemplateQuestions.ts` (search "techfacts")
- API: `app/api/tech-facts/route.ts`
- Integration: Check all files listed above

---

**Remember**: Test thoroughly at each step! It's easier to debug incrementally than all at once. 🚀

