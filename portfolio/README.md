# 🚀 Personal Portfolio — Full-Stack

A production-grade personal portfolio with Node.js/Express backend, MongoDB database, and a striking dark editorial frontend.

---

## ✨ Features

| Layer | Tech | Purpose |
|-------|------|---------|
| Frontend | HTML5, CSS3, Vanilla JS | Animated UI, particle canvas, dynamic content |
| Backend | Node.js + Express.js | REST API with rate limiting & security |
| Database | MongoDB + Mongoose | Projects, skills, contact messages, profile |
| Email | Nodemailer | Auto-reply + owner notification on contact |
| Deploy | Vercel / Netlify + Railway | CI/CD with env var management |

---

## 📁 Project Structure

```
portfolio/
├── frontend/
│   ├── index.html          ← Single-page app entry
│   ├── css/style.css       ← Full design system
│   └── js/app.js           ← API integration + animations
│
├── backend/
│   ├── server.js           ← Express app + middleware
│   ├── config/db.js        ← MongoDB connection
│   ├── models/
│   │   ├── Project.js      ← Project schema
│   │   ├── Skill.js        ← Skill schema
│   │   ├── Contact.js      ← Contact message schema
│   │   └── Profile.js      ← Profile schema
│   ├── routes/
│   │   ├── projects.js     ← GET/POST/PUT/DELETE /api/projects
│   │   ├── skills.js       ← GET/POST /api/skills
│   │   ├── contact.js      ← POST /api/contact
│   │   └── profile.js      ← GET/PUT /api/profile
│   ├── scripts/seed.js     ← Demo data seeder
│   └── Dockerfile
│
├── docker-compose.yml      ← One-command local dev
├── vercel.json             ← Vercel deployment
├── netlify.toml            ← Netlify deployment
└── Procfile                ← Heroku/Railway deployment
```

---

## 🛠 Local Development

### Option A — Docker (easiest, no installs)

```bash
docker-compose up -d
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api
# Seed demo data:
docker-compose exec backend node scripts/seed.js
```

### Option B — Manual

**Prerequisites:** Node.js 18+, MongoDB running locally

```bash
# 1. Install dependencies
npm run setup

# 2. Configure backend environment
cp backend/.env.example backend/.env
# Edit backend/.env with your MONGODB_URI

# 3. Seed database with demo data
npm run seed

# 4. Start both servers
npm run dev
# Frontend → http://localhost:3000
# API      → http://localhost:5000/api
```

---

## 🌐 API Reference

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| GET | `/api/projects?featured=true` | Featured only |
| GET | `/api/projects?category=web` | Filter by category |
| GET | `/api/projects/:id` | Single project |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

### Skills
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/skills` | All skills (grouped by category) |
| POST | `/api/skills/bulk` | Bulk create skills |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form (saves to DB + sends email) |

### Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get active profile |
| PUT | `/api/profile/:id` | Update profile |

---

## 🚀 Deployment

### Option 1 — Vercel (full-stack, recommended)

```bash
npm i -g vercel
vercel

# Set environment variables in Vercel dashboard:
# MONGODB_URI  → your MongoDB Atlas connection string
# FRONTEND_URL → https://your-project.vercel.app
```

### Option 2 — Netlify (frontend) + Railway (backend)

**Backend on Railway:**
```bash
# 1. Push to GitHub
# 2. Connect repo at railway.app
# 3. Set root dir: backend
# 4. Add env vars: MONGODB_URI, FRONTEND_URL
```

**Frontend on Netlify:**
```bash
# 1. Update netlify.toml redirect URL to your Railway backend
# 2. Connect GitHub repo at netlify.com
# 3. Set build dir: frontend, publish: .
```

### Option 3 — Heroku

```bash
heroku create my-portfolio
heroku addons:create mongolab  # or use Atlas
heroku config:set NODE_ENV=production
git push heroku main
```

---

## ⚙️ Customization

### 1. Update your info
Edit `backend/scripts/seed.js` — change name, bio, projects, skills, social links.
Then re-run: `npm run seed`

### 2. Change colors
Edit CSS variables in `frontend/css/style.css`:
```css
:root {
  --ink: #0a0a0f;        /* background */
  --accent: #c8f53e;     /* highlight color */
  --text: #e8e4dc;       /* body text */
}
```

### 3. Add your avatar
Replace the DiceBear URL in seed.js with your own image URL.

### 4. Enable email notifications
In `backend/.env`:
```
EMAIL_USER=you@gmail.com
EMAIL_PASS=your-gmail-app-password   # Generate at myaccount.google.com/apppasswords
OWNER_EMAIL=personal@email.com
```

---

## 🔒 Production Security Checklist

- [ ] Add JWT authentication to POST/PUT/DELETE routes
- [ ] Store secrets in environment variables (never commit `.env`)
- [ ] Set `FRONTEND_URL` to your actual domain in CORS config
- [ ] Enable MongoDB Atlas IP allowlist
- [ ] Add input sanitization (`express-validator`)
- [ ] Set up HTTPS (automatic on Vercel/Netlify)

---

## 📸 Screenshots

The portfolio features:
- **Hero** — Animated particle canvas, typewriter-effect headline
- **Projects** — Filterable grid with modal detail view
- **Skills** — Tabbed view with animated progress bars
- **Contact** — Form with backend persistence + email auto-reply
- **Dark editorial aesthetic** — Syne + DM Mono typography, lime accent

---

Built with ♥ using Node.js, Express, MongoDB & Vanilla JS
