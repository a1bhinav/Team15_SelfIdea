
# BUILD.md

## Project Setup & Build Instructions for Team15_SelfIdea

This document outlines how to install dependencies, run the project locally, deploy to production, and handle database changes.

---

## 🔧 Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (local instance or cloud MongoDB Atlas)
- Git

---

## 📦 Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/a1bhinav/Team15_SelfIdea.git
   cd Team15_SelfIdea
   ```

2. **Install dependencies**  
   Run this inside the root directory:
   ```bash
   npm install
   ```

3. **Environment setup**  
   Create a `.env` file in the root directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/selfidea-db
   PORT=3000
   ```

   If you're using MongoDB Atlas:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/selfidea-db
   ```

---

## 🚀 Running the Project Locally

```bash
npm start
```

The server should be running on `http://localhost:3000/` by default.

---

## 🗃️ Database Setup & Changes

The project uses **MongoDB** with **Mongoose** ODM. The following collections are defined:

- `users` – stores information for students, advisors, and admins.
- `configs` – stores uploaded degree requirement files.
- `plans` – stores a student’s course plan and validation state.

**To initialize the database:**

Make sure MongoDB is running locally or you’re connected to Atlas. Then, use the app’s functionality to:
- Register users
- Upload configuration files (`.csv`)
- Submit academic plans

**To apply schema changes:**
- Modify the appropriate Mongoose model under `backend/models/`
- Ensure validators and references are updated
- Restart the server to apply changes

---

## 🚢 Deployment

To deploy the project to a production environment (e.g., Heroku, Render, or a custom server):

1. **Set environment variables:**
   - `MONGODB_URI` to your cloud database
   - `PORT` as needed

2. **Install production dependencies**
   ```bash
   npm ci --omit=dev
   ```

3. **Start the app**
   ```bash
   npm run start
   ```

4. (Optional) Set up a reverse proxy (e.g., Nginx) and SSL if deploying on your own VM.

---

## ✅ Testing (Coming Soon)

Test suite planned for:
- Backend API routes (Jest or Mocha)
- CSV validation functions
- User authentication flow

---

## 📂 File Structure Highlights

```
Team15_SelfIdea/
├── backend/
│   ├── models/       # Mongoose schemas
│   ├── routes/       # Express route handlers
│   ├── utils/        # File parsing and validation logic
├── public/           # Frontend HTML/CSS
├── .env.example      # Template environment file
├── package.json
├── server.js         # Entry point
```

---

## 🧰 Troubleshooting

- **MongoDB connection error:** Check if MongoDB is running or your Atlas URI is correct.
- **Port in use:** Change the `PORT` in your `.env` file or close the conflicting process.

---

## ✨ Future Improvements

- Dockerfile and docker-compose support
- CI/CD integration
- Production database seeding scripts

---

Maintained by Team 15  
Spring 2025 | CS 520 | University of Massachusetts Amherst
