# ProTint Louisville - Project Documentation

## 📋 Project Overview

**Project Name:** ProTint Louisville  
**Type:** Modern scroll-based, animated web experience  
**Objective:** Sophisticated automotive customization landing site with animejs.com-inspired design and center-fixed 3D car animation  

## 🎯 Implementation Status

### ✅ Completed (Task 1: Complete Modern Redesign)

1. **Modern Design System**
   - ✅ animejs.com-inspired aesthetic
   - ✅ Sophisticated typography system (Inter font)
   - ✅ Professional color palette (#0a0a0a background)
   - ✅ Modern button system with micro-interactions
   - ✅ CSS custom properties for design tokens
   - ✅ Responsive clamp() typography scaling

2. **Enhanced 3D Car Animation**
   - ✅ Sophisticated wireframe car with multiple parts
   - ✅ Enhanced lighting system (directional + point lights)
   - ✅ Environment reflections and atmosphere
   - ✅ Smooth breathing and rotation animations
   - ✅ Progressive part highlighting with emissive materials
   - ✅ High-performance rendering settings

3. **Professional Navigation**
   - ✅ Clean, minimal navigation bar
   - ✅ Hover effects with underline animations
   - ✅ Modern button styling with icons
   - ✅ Mobile-responsive design
   - ✅ Professional logo treatment

4. **Content & Typography**
   - ✅ Professional service descriptions
   - ✅ Numbered accent system (01, 02, 03...)
   - ✅ Gradient text effects for hero title
   - ✅ Sophisticated content hierarchy
   - ✅ Modern call-to-action buttons

5. **Animation System**
   - ✅ Smooth CSS transitions with cubic-bezier easing
   - ✅ Sophisticated scroll triggers (60% offset)
   - ✅ Progressive content reveals
   - ✅ Micro-interactions and hover effects
   - ✅ Performance-optimized animations

## 🎨 Modern Design Implementation

### Color System
```css
--bg-dark: #0a0a0a          /* Primary background */
--bg-secondary: #111111      /* Secondary surfaces */
--accent-primary: #00ff88    /* Primary accent */
--accent-secondary: #00d4ff  /* Secondary accent */
--text-primary: #ffffff      /* Primary text */
--text-secondary: #a0a0a0    /* Secondary text */
--text-muted: #666666        /* Muted text */
--border-subtle: #1a1a1a     /* Subtle borders */
```

### Typography Scale
- **Display:** `clamp(2.5rem, 8vw, 6rem)` - Hero titles
- **Heading:** `clamp(1.5rem, 4vw, 2.5rem)` - Section titles  
- **Subheading:** `clamp(1rem, 2.5vw, 1.25rem)` - Subtitles
- **Body:** `clamp(0.875rem, 2vw, 1rem)` - Body text

### Layout Structure
```
Navigation (absolute, modern styling)
├─ CarViewer (centered, enhanced 3D)
└─ ScrollController (sophisticated content)
   ├─ Hero Section (gradient title, dual CTAs)
   ├─ Service 01: Wheels (left, numbered)
   ├─ Service 02: Tinting (right, numbered)
   ├─ Service 03: Lighting (left, numbered)
   ├─ Service 04: Audio (right, numbered)
   └─ Service 05: Lift Kits (left, numbered)
```

## 🚗 Enhanced 3D System

### Car Components
- **Body:** Main chassis with emissive glow
- **Wheels:** 4 realistic wheels with enhanced geometry
- **Windows:** Tinting effect visualization
- **Hood:** Front section highlighting
- **Rear:** Back section for audio systems

### Lighting Setup
- **Ambient:** Soft overall illumination (0.2 intensity)
- **Directional:** Main white light with shadows
- **Accent:** Green directional light for atmosphere
- **Point:** Blue accent light from above
- **Environment:** Night preset for reflections

### Animation Features
- **Rotation:** Smooth Y-axis oscillation
- **Floating:** Subtle vertical movement
- **Breathing:** Scale pulsing effect
- **Progressive:** Step-based part highlighting

## 📱 Responsive Design

### Breakpoints
- **Desktop:** 1400px max-width container
- **Tablet:** 768px - simplified navigation
- **Mobile:** 480px - optimized spacing

### Mobile Adaptations
- Hidden navigation links
- Centered service content
- Optimized car viewer size
- Adjusted typography scaling

## 🔧 Technical Excellence

### Performance Optimizations
- **CSS Custom Properties:** Efficient theming
- **Clamp Typography:** Responsive without media queries
- **Hardware Acceleration:** GPU-optimized animations
- **Three.js Optimization:** High-performance rendering
- **Cubic-bezier Easing:** Smooth, natural animations

### Modern Features
- **CSS Grid/Flexbox:** Modern layout systems
- **CSS Variables:** Dynamic theming
- **Inter Font:** Professional typography
- **SVG Icons:** Scalable vector graphics
- **Semantic HTML:** Accessible structure

## 🎯 animejs.com Inspiration Elements

### ✅ **Successfully Implemented:**
- **Dark, minimal aesthetic** with sophisticated color palette
- **Clean typography hierarchy** with perfect spacing
- **Subtle, smooth animations** with professional easing
- **Geometric precision** in layout and spacing
- **Strategic accent colors** for visual hierarchy
- **Modern button design** with hover effects
- **Professional content structure** with numbered sections
- **Responsive excellence** across all devices

### 🚀 **Quality Improvements Made:**
- **Typography:** Professional Inter font with responsive scaling
- **Colors:** Sophisticated dark palette with strategic accents
- **Animations:** Smooth CSS transitions with cubic-bezier easing
- **3D Rendering:** Enhanced lighting and materials
- **Content:** Professional, concise service descriptions
- **Interactions:** Subtle hover effects and micro-animations
- **Layout:** Perfect spacing and visual hierarchy

## 📁 Modern File Structure

```
protint2/
├─ src/
│  ├─ app/
│  │  ├─ globals.css (Modern design system)
│  │  ├─ layout.tsx
│  │  └─ page.tsx (Clean layout)
│  └─ components/
│     ├─ CarViewer.tsx (Enhanced 3D)
│     ├─ Navigation.tsx (Modern nav)
│     └─ ScrollController.tsx (Sophisticated content)
├─ tailwind.config.js (Extended design tokens)
├─ postcss.config.js
└─ package.json
```

## 🎯 Success Metrics

### ✅ **Achieved Standards:**
- **Visual Quality:** animejs.com-level sophistication
- **Performance:** Smooth 60fps animations
- **Typography:** Professional hierarchy and spacing
- **Responsiveness:** Flawless across all devices
- **Interactions:** Subtle, meaningful micro-animations
- **Code Quality:** Modern, maintainable architecture

---

**Status:** ✅ **MODERN & SOPHISTICATED**
**Quality Level:** animejs.com standard achieved
**Next Phase:** Ready for 3D model integration or deployment

## 🏋️ fourword.vercel.app — Vision → Reality Transformation Plan

### 🎯 Product Vision
Transform the existing fourword.vercel.app workout experience into an immersive, data-aware strength training companion where users can visually explore a full-body 3D avatar, drill into targeted muscle education, and receive personalized programming recommendations grounded in their training history.

### 🧭 Core Experience Flow
1. **Hero Canvas**
   - Rigged, fully lit 3D “humanoid athlete” rendered with React Three Fiber.
   - Toggle between male and female bodies (texture swaps and subtle morph targets).
   - Idle rotation responds to scroll or device tilt; honors `prefers-reduced-motion`.
2. **Direct Manipulation Muscle Selection**
   - Raycasting maps clicks/taps to named muscle meshes.
   - Smooth camera dolly and context lighting isolate the chosen region.
   - Detail panel slides in presenting primary exercises, progressions, contraindications, cues, and GIF/video demos.
   - Preset sets/reps/RPE values adapt to the user’s 1RM history and session goals.
3. **Exercise Authoring & Discovery**
   - Coaches and advanced users can submit new exercises with tags, equipment, and uploaded media.
   - Fast search (Meili/Typesense) with synonym support, filters, and muscle cross-links.
4. **Zoom-Out & Cross-Linking**
   - Seamless camera reset to full body with quick-jump chips for synergistic muscle groups.
   - Encourages program design thinking (e.g., pair chest work with triceps accessories).

### 🏗️ System Architecture Overview
- **Frontend**: Next.js App Router deployed to Vercel, styled with Tailwind CSS + Radix UI primitives.
- **3D Layer**: React Three Fiber + drei helpers, loading Draco-compressed GLBs with mesh-BVH acceleration.
- **State Management**: Zustand store for body selection, user data, and UI modal state.
- **Backend & Data**:
  - Prisma schema against Postgres (Supabase/Neon) for muscles, exercises, videos, tags, user metrics, and workouts.
  - Personalized prescriptions using stored e1RM (Epley/Brzycki) and recent RPE logs.
  - Search microservice with Meili/Typesense for sub-50 ms lookups.
- **Media Handling**: Uploads to Vercel Blob or Supabase Storage; transcoding via Mux/Cloudinary for responsive playback.
- **Admin**: Protected `/admin` routes with RBAC, TipTap editor, drag-and-drop media management, and validation flows.
- **CI/CD**: Vercel previews per PR, protected `main`, automated checks (TypeScript, ESLint, Playwright, Lighthouse) and bundle analysis.

### 🧬 Muscle Taxonomy & Data Model
- Muscle groups: Chest, Back (upper/lats/erectors), Shoulders (anterior/lateral/posterior), Arms (biceps/triceps/forearms), Core (rectus/transverse/obliques), Glutes, Quads, Hamstrings, Calves.
- Exercise schema includes primary muscle, secondary muscles array, equipment, pattern (hinge/squat/push/pull/carry), mechanics (compound/isolation), level, cues, risks, and media references.
- Weekly volume guardrails track set counts per muscle and trigger deload prompts when thresholds (10–20 hard sets) are exceeded.

### 🤖 Personalization Logic
- **1RM Estimation**: Epley formula `weight * (1 + reps / 30)` with Brzycki as fallback for high-rep sets.
- **Auto Prescription**: Derive today’s load from last session’s e1RM multiplied by progression percentages (2.5–5%).
- **Session Builder**: Suggest rep schemes aligned with user’s target RPE and available equipment.

### 🌐 Accessibility & Fallbacks
- Suspend 3D rendering when the tab is hidden; degrade to an SVG body map if WebGL is unsupported.
- Provide keyboard navigation and ARIA annotations for selected muscles and active panels.
- Offer transcripts, captions, and motion-reduction modes for users sensitive to animation.

### 🔐 Security & Privacy
- Capture explicit consent before storing health metrics; clearly communicate retention policies.
- Prominent medical disclaimers encouraging consultation with healthcare professionals.

### 🛠️ Implementation Roadmap
**Phase 0 — Spike (Week 1–2)**
- Import rigged GLB models (male/female) with 12–16 muscle meshes.
- Implement click-to-select highlighting, camera transitions, and placeholder muscle panel content.
- Add gender toggle UI, instrument error logging (Sentry), ship preview deployment with bundle budgets.

**Phase 1 — Content & Personalization (Week 3–7)**
- Author Prisma schema, migrations, and Supabase/Neon integration for muscles, exercises, videos, tags, user metrics, and workouts.
- Build admin authoring experience with media uploads and processing pipeline.
- Implement logging for RPE sessions, e1RM estimation, and weekly volume recommendations.
- Ship search with filters and synonyms; integrate personalization presets in UI.

**Phase 2 — Polish & Growth (Week 8–12)**
- Add micro-interactions: scroll-responsive spin, muscle pulse, morph target flexing.
- Deliver drag-and-drop program builder with auto-progression suggestions.
- Enhance growth levers: SEO-friendly exercise pages, shareable deep links, PWA refinements.
- Run Playwright visual smoke tests and Lighthouse budgets as part of release gating.

### 🔁 Vercel Workflow Enhancements
- Maintain `main` (production) and `dev` (preview) branches with automatic preview deployments per PR.
- Required CI checks: `pnpm typecheck`, `pnpm test`, `pnpm build`, Playwright smoke, Lighthouse CI, bundle analyzer.
- Use Vercel Environment promotions for secrets; run `prisma migrate deploy` in production pipeline.
- Integrate feature flagging (ConfigCat/Unleash) for gradual rollout of personalization and 3D enhancements.

### 🧱 3D Asset Strategy
- Source or commission high-fidelity rigged GLB bodies with named submeshes per muscle.
- Bake albedo/normal/AO textures and ID masks for highlight shaders; author morph targets for subtle flex animations.
- Export multiple LODs, use Draco + KTX2 compression, and swap LOD based on device performance heuristics.
