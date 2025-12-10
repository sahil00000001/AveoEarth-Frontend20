# AveoEarth E-commerce Platform

## Overview
This is an e-commerce platform for sustainable and eco-friendly products built with Next.js 15 and React 19.

## Technology Stack
- **Framework**: Next.js 15.5.0 with App Router
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS v4
- **Icons**: Heroicons & Lucide React
- **Runtime**: Node.js 20.x

## Project Structure
- `src/app/` - Next.js pages and routing
- `src/components/` - Reusable React components
- `src/hooks/` - Custom React hooks for auth, cart, and orders
- `src/services/` - API service layer
- `src/lib/` - Utility libraries

## Development

### Running Locally
The application runs on port 5000 with the command:
```bash
npm run dev
```

The workflow "Start application" is configured to automatically start the dev server.

### Environment Variables
Environment variables are stored in `.env.local`. Key variables include:
- `NEXT_PUBLIC_APP_URL` - The application URL (set to http://localhost:5000 for Replit)
- `MONGODB_URI` - MongoDB connection string (needs to be configured)
- `ADMIN_ACCESS_KEY` - Admin dashboard access key

### Build and Production
```bash
npm run build  # Build for production
npm start      # Start production server
```

## Replit Configuration

### Frontend Setup
- The dev server is configured to run on `0.0.0.0:5000` to work with Replit's proxy
- Cross-origin requests are allowed via `allowedDevOrigins: ['*']` in next.config.mjs
- The workflow automatically restarts when changes are made

### Static Assets
The following static assets were imported from the GitHub repository:
- Images: logo.png, hero.png, hero1.png, hotdeals.png, beauty.jpg, fitness.jpg, home.jpg, petcare.jpg, placeholder-product.jpg, spoons.png, category1.png
- SVG icons: bookmark.svg, cart.svg, file.svg, globe.svg, next.svg, profile.svg, vercel.svg, window.svg
- Video: AveoBuddy.mp4
- Fonts: Poppins (Regular, Medium, SemiBold, Bold), ReemKufi-Regular

Placeholder images are used for some community page assets that weren't in the repository.

## Key Features
- Multi-role support (Buyer, Vendor, Admin)
- Shopping cart with persistent state
- Product catalog with sustainability metrics
- Vendor dashboard for product and order management
- Admin dashboard for platform management
- AI chatbot integration
- Address management
- Order tracking

## Database
The application is designed to work with MongoDB. The connection string needs to be configured in `.env.local`.

## AI Assistant Chatbot
The platform includes an enhanced AI assistant chatbot with the following features:

### Components
- **FloatingChatBot.jsx** - Video avatar button with AveoBuddy.mp4 that appears in the bottom-right corner
- **DraggableChatModal.jsx** - Draggable chat modal with user-type awareness
- **ChatBot.jsx** - Full-featured chat component with FAQ tab

### Features
- User-type awareness (vendor/customer/guest) with different welcome messages
- Quick action buttons (Track Order, View Cart, Eco Products, Get Help)
- Suggestion chips for common questions
- FAQ tab with categorized questions (General, Shopping, Orders & Shipping, Payments, Sustainability)
- Connection status indicators
- Clear chat functionality
- Minimize/maximize functionality
- Draggable interface

### Backend
The AI chatbot connects to a backend service via chatService.js. The service URL is configured in NEXT_PUBLIC_CHATBOT_URL (default: http://localhost:8002).

## Theme: Sustainability Earth Tones
The website uses a cohesive earthy color palette representing sustainability and nature:

### Primary Color Palette (Navbar, Footer, General UI)
- **Primary Green**: #047857 (Emerald-700) - Logo, headings, primary actions
- **Secondary Green**: #059669 (Emerald-600) - Buttons, hover states
- **Accent Green**: #10b981 (Emerald-500) - Highlights, accents
- **Light Green**: #d1fae5 (Emerald-100) - Subtle backgrounds
- **Subtle Green**: #ecfdf5 (Emerald-50) - Very light backgrounds
- **Footer Background**: #064e3b (Emerald-900)

### Sustainability Theme (Hot Deals & Best Sellers sections)
- **Olive Green**: #6b8e23 - Primary accent color (nature/leaves)
- **Soil Brown**: #8b7355 - Secondary accent color (earth/soil)
- **River Blue**: #4682b4 - Tertiary accent color (water/rivers)
- **Dark Olive**: #556b2f - Text and darker accents

### Theme Application
- Navbar: Green top banner, green logo text, green navigation hover states
- Footer: Deep green background (emerald-900) with light green text
- Bottom Navigation: All categories use consistent emerald shades
- Hot Deals & Best Sellers: Earthy sustainability theme with olive/brown/blue gradients
- Product carousels: Smooth 3D hover effects with nature-inspired colors
- Chatbot: Green-themed quick actions, suggestions, and UI elements

## Recent Changes (Dec 2024)
- **Updated website theme** to sustainability green and white color scheme
- Unified all color palettes across navbar, footer, bottom navigation, and chatbot
- Enhanced AI Assistant with quick actions, suggestion chips, and FAQ support
- Added user-type awareness (vendor/customer/guest) to chatbot
- Implemented draggable modal with minimize/maximize functionality
- Added connection status indicators and clear chat functionality
- Configured for Replit environment
- Updated dev server to run on port 5000
- Removed Turbopack due to symlink issues in Replit environment
- Added allowedDevOrigins configuration for cross-origin requests
- Set up deployment configuration for Replit

## Recent Changes (Dec 10, 2025)
- **Hot Deals Section Redesign**:
  - Removed excess spacing above section
  - Converted category filter from buttons to dropdown menu
  - Removed "Showing X products" text
  - Removed "Explore All Deals" button
  - Products now display in a moving carousel with smooth 3D effects
  - Applied sustainability theme (olive green, soil brown, river blue)
- **Best Sellers Section Update**:
  - Applied same sustainability earth-tone theme
  - Consistent styling with Hot Deals carousel
  - Smooth hover animations and 3D card effects
