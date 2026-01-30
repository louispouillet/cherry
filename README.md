# 🍒 Cherry — Social Event Platform

## Overview

**Cherry** is a web application designed to combat social isolation by helping users discover, create, and join real-life events in their local community. Instead of endless scrolling on social media, Cherry transforms digital connections into actual face-to-face interactions.

### Key Mission
Transform the way people connect by providing a **simple, accessible platform** that bridges the gap between online discovery and real-world social engagement.

### Target Users
- **Young Social Explorers** (18–35): Seeking to transform online interactions into real meetings
- **New City Newcomers** (18–50): Looking to integrate quickly and build a local network
- **Busy Social Planners** (36–65): Needing structured and easy-to-organize activities
- **Active Retirees** (66+): Staying active and avoiding social isolation

---

## Core Features (MVP)

 **User Authentication**: Registration and login with JWT tokens  
 **Event Discovery**: Browse events in your city with swipe interface  
 **Event Creation**: Create new events with photos, descriptions, and age requirements  
 **Event Filtering**: Filter events by activity type (Sports, Culture, Games, etc.)  
 **Group Chat**: Real-time messaging for event participants  
 **User Profiles**: View and manage user information, change city preference  
 **Automatic Token Validation**: Token verification on every action with automatic redirection to login if expired  

---

## Tech Stack

### Frontend
- **React** + **TypeScript**: Component-based UI with type safety
- **Vite**: Fast build tool and dev server
- **Axios**: HTTP client with automatic token injection
- **CSS**: Custom styling with responsive design (hidden scrollbars globally)

### Backend
- **Node.js + Express**: REST API server
- **MongoDB**: NoSQL database for events, users, and messages
- **JWT (jsonwebtoken)**: Secure token-based authentication
- **bcryptjs**: Password hashing for security
- **CORS**: Cross-origin resource sharing

---

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or remote connection)
- npm or yarn

### Backend Setup

```bash
cd mvp/backend

# Install dependencies
npm install

# Create .env file with the following variables:
cat > .env << EOF
PORT
MONGODB_DB_NAME
MONGODB_URI
JWT_SECRET
EOF

# Start development server
npm run dev

# Or run in production
npm start
```

### Frontend Setup

```bash
cd mvp/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The frontend will be available at `http://localhost:5173`  
The backend API runs on `http://localhost:3000`

---

## Deployment Instructions

### Backend Deployment (Node.js)

**Railway**
1. Push code to GitHub
2. Connect repository to platform
3. Set environment variables (MONGODB_URI, JWT_SECRET, etc.)
4. Deploy and auto-redeploy on push

### Frontend Deployment (Static Site)

**Vercel**
```bash
npm install -g vercel
vercel
```
---

## Justification of Technical Choices

### Why React + TypeScript?
- **React**: Industry standard for building interactive UIs with component reusability
- **TypeScript**: Catches bugs at compile-time, improves code maintainability, and provides excellent IDE support

### Why Vite?
- **Speed**: 10-100x faster than Webpack for development and production builds
- **Modern approach**: Uses native ES modules, optimal for modern browsers
- **Better DX**: Instant HMR (Hot Module Replacement) for fast feedback

### Why Express + MongoDB?
- **Express**: Lightweight, flexible, and industry-standard for REST APIs
- **MongoDB**: Flexible schema perfect for evolving application features (events, messages, user profiles)
- **Scalability**: NoSQL allows horizontal scaling for growing user base

### Why JWT Tokens?
- **Stateless**: No session storage needed on server
- **Secure**: Can be validated without database queries
- **Mobile-friendly**: Works seamlessly across web and mobile apps
- **Token expiration**: Enables automatic session timeout for security

Most of all these choices were made because we were already familiar with them and could thus deliver a high-quality product within the tight timeframe.

---

## Project Documentation Structure

The `/docs/` folder contains the complete project research, design, and strategy:

```
docs/
├── 01_research/
│   ├── benchmark.md          # Competitive analysis of existing platforms
│   ├── interviews.md         # User interviews and feedback
│   ├── objectives_constraints.md  # Project goals and limitations
│   └── problem_statement.md  # Detailed problem definition
│
├── 02_personas/
│   └── persona_resume.md     # User personas and their needs
│
├── 03_user_journey/
│   ├── user_journey.md       # Complete user flows and touchpoints
│   └── images/               # Journey diagrams and visualizations
│
├── 04_wireframes/            # Low-fidelity interface sketches
│
├── 05_mockups/
│   └── mockups.md            # High-fidelity UI mockups and specifications
│
├── 06_prototype/
│   └── prototype.md          # Figma prototype details and interactions
│
├── 07_feedback/
│   ├── feedback_summary.md   # User testing feedback and insights
│   └── test_protocol.md      # Testing methodology and results
│
├── 08_prioritization/
│   ├── mvp_definition.md     # MVP scope and essential features
│   └── prioritization_matrix.md  # Feature prioritization framework
│
└── 09_pitch/
    └── pitch_deck.md         # Executive summary and pitch presentation
```

**Key Documents**:
- **problem_statement.md**: Why Cherry exists and the problems it solves
- **mvp_definition.md**: Exact scope of this release
- **prototype.md**: Interactive design and UX flows (with Figma link)
- **pitch_deck.md**: Complete project vision and business rationale

---

## Prototype & Design

🎨 **Figma Prototype**: [View Interactive Prototype](https://www.figma.com/proto/4XaQ9s5ExLys96FkbCEzCy/Cherry-%F0%9F%8D%92?node-id=528-61&p=f&t=gERKOJ8PMHC0B1Pi-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=528%3A61)

The prototype showcases:
- Intuitive swipe-based event discovery
- Simple event creation flow
- Group messaging interface
- User profile management
- Responsive design for all screen sizes

---

## Security Features

 **JWT Authentication**: Secure token-based authentication  
 **Automatic Token Validation**: Every action verifies token validity  
 **Password Hashing**: bcryptjs for secure password storage  
 **CORS Protection**: Cross-origin requests properly configured  
 **Token Expiration**: Automatic logout on token expiration  
 **Protected Routes**: Routes require valid authentication  

---

## Future Enhancements

🚀 **Post-MVP Features**:
- Real-time geolocation and map integration
- Push notifications
- Advanced user profiles with event history
- Event ratings and reviews
- Premium features (event insurance, paid events)
- Mobile app (React Native)