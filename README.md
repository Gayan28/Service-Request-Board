# GlobalTNA Full Stack Developer Assessment

A professional full-stack service request board built for the GlobalTNA Full-Stack Developer Intern technical assessment.

## Live Demo

Frontend:
https://your-frontend.vercel.app

Backend:
https://your-backend.onrender.com

---

## Tech Stack

### Frontend
- Next.js 15
- Tailwind CSS
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

---

## Features

### Core Features
- Create service requests
- Browse jobs
- View job details
- Update job status
- Delete jobs
- Category filtering

### Bonus Features
- JWT authentication
- Search functionality
- Protected routes
- Responsive UI
- Seed script
- Error handling
- Rate limiting

---

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=YOUR_MONGO_URI
JWT_SECRET=YOUR_SECRET
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## API Endpoints

### Jobs

GET /api/jobs

POST /api/jobs

GET /api/jobs/:id

PATCH /api/jobs/:id

DELETE /api/jobs/:id

### Authentication

POST /api/auth/register

POST /api/auth/login

---

## Seed Sample Data

```bash
npm run seed
```

---

## Author

Gayan Kavinda