# 🍔 Food Video Platform (MERN Stack)

A modern short‑video food sharing platform inspired by **Reels / TikTok**, built using the **MERN Stack** with a premium UI/UX, optimized uploads, and real‑time interactions.

## Live Link:(https://reelappmr.vercel.app/)

## Backend Code Ripo (https://github.com/KGN15/Backend-reel-app-server)
## Frontend Code Ripo (https://github.com/KGN15/FRONTEND-reel-clint-side)

---

## 📌 Table of Contents

* Features
* Tech Stack
* Authentication
* Project Structure
* Environment Variables
* Upload Flow
* ImageKit Limitations
* Video Download Protection
* Lessons Learned
* Screenshots
* Author
* Support
* License

---

## 🚀 Features

### 🎥 Video Feed

* Full‑screen vertical scrolling videos
* Auto‑play / auto‑pause on scroll
* Double‑tap to like animation
* Smooth **Framer Motion** transitions

### ❤️ Engagement System

* Like / Unlike (optimistic UI)
* Save / Unsave foods
* Real‑time like & save counters
* Comment system (UI ready)

### 🍽 Food Partner Dashboard

* Upload food videos
* Preview before publishing
* Review & publish flow
* Secure authentication
* Logout system

### 📦 Media Handling

* Video uploads handled via **ImageKit**
* Optimized media URLs stored in MongoDB
* Custom loading screen during upload
* Success popup after publish

---

## 🛠 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Framer Motion
* Axios
* React Router
* Heroicons

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Multer (file handling)
* ImageKit SDK

---

## 🔐 Authentication

* Cookie‑based JWT authentication
* Protected routes using middleware
* Role‑based access control (`food‑partner`, `user`)

---

## 📁 Project Structure

```
client
 ├── components
 ├── pages
 ├── hooks
 └── utils

server
 ├── controllers
 ├── models
 ├── routes
 ├── middleware
 └── config
```

---

## ⚙️ Environment Variables

Create a `.env` file in the **server root**:

```env
PORT=3000
MONGO_DB_URL=mongodb://localhost:27017/yourDB
JWT_SECRET=your_secret_key

IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

> ⚠️ **Important**
> `require("dotenv").config()` must be the **first line** in `server.js` or `index.js`.

---

## 📤 Upload Flow

1. User selects a video
2. Instant preview is shown
3. On **Publish**:

   * Loading screen appears
   * Video uploads to ImageKit
   * Optimized URL is saved in MongoDB
   * Success popup is shown
   * User is redirected to dashboard

### This prevents:

* Multiple submit clicks
* Extra ImageKit charges
* Bad user experience

---

## ⚠️ ImageKit Video Limitation (Important)

This project uses the **ImageKit Free Plan**.

### Known Limitations

* Video transformation usage is limited

### After limit is exceeded:

* Video URLs still save in the database
* Video playback may stop working

### Why still deployed?

This project is intended for:

* Learning
* Portfolio showcase
* MVP / demo

### Architecture is upgrade‑ready for:

* Backend video streaming
* Cloudflare R2
* Bunny.net
* AWS S3 + CloudFront

---

## 🔒 Video Download Protection

* `controlsList="nodownload"` is used
* UI prevents casual downloads

> ⚠️ Client‑side video protection is **never 100% secure** (industry‑wide limitation).

---

## 🧠 Lessons Learned

* Environment variables must load first
* Optimistic UI significantly improves UX
* Video platforms require backend streaming for scale
* Free tiers are for testing, not production

---

## 📸 Screenshots

*(Add screenshots here)*

* Video feed
* Upload screen
* Review screen
* Success popup

---

## 🧑‍💻 Author

**MD Mashudur Rahman**
MERN Stack Developer
Backend‑focused • Real‑world projects • Learning by building
### FaceBook : (https://www.facebook.com/profile.php?id=61583140887335)
### LinkDine: (https://www.linkedin.com/in/md-mashudur-rahman-233746384/)

---

## ⭐ Support

If you like this project:

* Give it a ⭐ on GitHub
* Share feedback
* Fork & improve

---

## 📜 License

This project is for **educational and portfolio purposes only**