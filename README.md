# 🌙 Sleeply
> A modern sleep tracking web app built with **Next.js 16**, featuring real-time analytics, personalized insights, and comprehensive sleep data visualization.

---

## 🖥️ Tech Stack

### **Frontend**
- ⚛️ **Next.js 16** — React framework with App Router
- ⚛️ **React 19** — Latest concurrent React
- 🦺 **TypeScript** — Type-safe development
- 🎨 **Tailwind CSS** — Utility-first styling
- 📊 **Chart.js + React Chart.js 2** — Beautiful charts & visualizations

### **Backend & Database**
- 🐘 **Neon** — Serverless PostgreSQL
- 🧩 **Prisma** — Type-safe ORM
- ⚙️ **Server Actions** — Next.js direct server functions

### **Authentication**
- 🔐 **Better Auth** — Complete authentication with Google, GitHub, Facebook & Email

### **Deployment**
- ▲ **Vercel** — Fast, serverless deployment platform

---

## ✨ Features

### 📊 **Sleep Analytics**
- Track and visualize your **daily sleep duration**
- Beautiful **data charts** with Chart.js
- Identify **best & worst sleep days**
- Calculate your **average sleep hours**

### 💼 **Core Functionality**
- Add, edit, and delete **sleep records**
- Real-time **statistics dashboard**
- Complete **sleep history** with search & filter**
- **Date-based** analytics to monitor sleep trends

### 🎨 **Modern UI/UX**
- 💻 Fully **responsive** — works on all devices
- 🌀 Smooth **animations** and hover effects
- 🌈 **Gradient & glassmorphism** card layouts
- 🧭 Clean, minimal interface focused on usability

### 🔒 **Authentication & Security**
- Multiple login options: **Google, GitHub, Facebook, Email**
- Secure sessions via **Better Auth**
- Personalized **user dashboards**
- Protected routes for sensitive sleep data

---

## 🚀 Getting Started

### **Prerequisites**
- 🧠 Node.js **10+**
- 📦 npm, yarn, or pnpm
- 🗄️ Neon PostgreSQL database

---

### **Installation**
```bash
# Clone the repository
git clone https://github.com/dharshan47/sleeply.git
cd sleeply

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

---

### **Set up environment variables**
Create a `.env` file in your root directory:

```bash
# Database
DATABASE_URL="your-neon-database-url"

# Better Auth Authentication
BETTER_AUTH_SECRET=your-better-auth-secret-key
BETTER_AUTH_URL=http://localhost:3000

# Google Provider
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) to view the app.

---


