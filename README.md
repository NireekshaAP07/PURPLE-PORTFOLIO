# Purple Portfolio

A modern personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Project Status

**Building in Progress** - The portfolio is actively being developed and enhanced.

## 📋 Features

- **React 19** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics support
- **Responsive Design** - Mobile-friendly layouts

## 🛠 Tech Stack

- **Frontend Framework**: React 19.0.0
- **Build Tool**: Vite 8.0.5
- **Language**: TypeScript 5.7.0
- **Styling**: Tailwind CSS 4.0.0
- **3D Graphics**: Three.js 0.186.1

## 📦 Installation

```bash
cd "Personal Portfolio Website"
npm install
```

## 🏃 Getting Started

### Development Server
Run the local development server:
```bash
npm run dev
```

The app will be available at:
- **Local**: http://localhost:8443/
- **Network**: http://192.168.1.47:8443/ (or your local IP)

### Build for Production
Create an optimized production build:
```bash
npm build
```

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

## 📁 Project Structure

```
Personal Portfolio Website/
├── src/
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   ├── index.css         # Global styles
│   ├── assets/           # Images and static files
│   └── imports/          # Component imports
├── index.html            # HTML entry point
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript config
└── package.json          # Project dependencies
```

## 🎨 Design & Components

The portfolio features:
- Decorative SVG doodles (stars, sparkles, arrows)
- Animated girl illustration with interactive effects
- Smooth mouse tracking and particle effects
- Clean, modern layout with Tailwind CSS

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run format` - Format code with oxfmt

## 📝 Notes

- The project uses Vite's native ES modules for fast HMR (Hot Module Replacement)
- TypeScript strict mode is enabled for type safety
- Tailwind CSS v4 with Vite integration for optimized styling

## 🚧 Future Improvements

- [ ] Complete portfolio content
- [ ] Add project showcase section
- [ ] Implement contact form
- [ ] Add blog/articles section
- [ ] Performance optimization
- [ ] SEO improvements

## 🎨 Figma Integration Files (Optional)

The `.figma/make/` directory contains Figma-specific deployment and build scripts. These are **not required** for the portfolio to work but are useful if you plan to integrate with Figma Make.

**Files in `.figma/make/`:**
- **`analyze-routes`** - Analyzes and optimizes Figma Make routes
- **`deploy`** - Deploys production build to Figma servers
- **`deploy-preview`** - Creates a preview build on Figma (emits sourcemaps for debugging)
- **`dev`** - Figma development configuration
- **`dev.json`** - JSON configuration for Figma dev mode
- **`format`** - Code formatting script for Figma projects
- **`install`** - Language server installation script
- **`langserver`** - Language server configuration
- **`import-assets.mjs`** - Asset import utility for Figma
- **`site.json`** - Figma project metadata

**When to use these:**
- Only needed if you're deploying through Figma Make
- Can be safely deleted if deploying independently to GitHub Pages, Vercel, etc.

## 📄 License

This project is private and for personal use.

---

**Last Updated**: October 9, 2026
