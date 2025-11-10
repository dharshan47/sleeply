🌙 Sleeply

A modern  sleep tracking web application built with Next.js 16, featuring real-time analytics, personalized insights, and comprehensive sleep data visualization.

Next.js React TypeScript Tailwind CSS

✨ Features
📊 Sleep Analytics
Sleep Duration Tracking: Record and monitor your daily sleep hours
Visual Charts: Beautiful data visualizations using Chart.js
Best & Worst Sleep Analysis: Track your sleep patterns and extremes
Average Sleep Calculation: Get insights into your sleep habits

💼 Core Functionality
Sleep Record Management: Add, edit, and delete sleep entries with ease
Real-time Statistics: Comprehensive sleep analytics dashboard
Sleep History: Complete sleep record history with search and filter
Date-based Tracking: Track sleep patterns over time

🎨 Modern UI/UX
Fully Responsive: Optimized for all screen sizes and devices
Beautiful Animations: Smooth interactions and hover effects
Gradient Designs: Modern card layouts with backdrop blur effects
Clean Interface: Intuitive design focused on sleep data visualization

🔐 Authentication & Security
Multiple Login Options: Google, GitHub, Facebook, or email/password
Secure Sessions: Managed by Better Auth authentication
User Profiles: Personalized dashboards with user information
Protected Routes: Secure access to sleep data

🛠️ Tech Stack
Frontend
Next.js 16 - React framework with App Router
React 19 - Latest React with concurrent features
TypeScript - Type-safe development
Tailwind CSS - Utility-first CSS framework
Chart.js - Beautiful charts and visualizations
React Chart.js 2 - React wrapper for Chart.js

Backend & Database
Neon - Serverless PostgreSQL database
Prisma - Type-safe database ORM
Server Actions - Direct server functions in Next.js

Authentication
Better Auth - Complete authentication solution

Deployment
Vercel - Serverless deployment platform


🚀 Getting Started
Prerequisites
Node.js 18+
npm, yarn, or pnpm
Neon PostgreSQL database
Installation
Clone the repository

git clone https://github.com/dharshan47/sleeply.git
cd sleeply
Install dependencies

npm install
# or
yarn install
# or
pnpm install
Set up environment variables Create a .env file in the root directory:

# Database
DATABASE_URL="your-neon-database-url"

# Better Auth Authentication
BETTER_AUTH_SECRET=Your Better Auth Secret Key
BETTER_AUTH_URL=http://localhost:3000

#Better Auth Google Provider 
GOOGLE_CLIENT_ID= Your google client id
GOOGLE_CLIENT_SECRET = Your Google clent secret



# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
