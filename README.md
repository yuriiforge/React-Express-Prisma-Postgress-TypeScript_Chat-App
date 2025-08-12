# React-Express-Prisma-Postgres-TypeScript Chat App

## 🛠️ Project Overview

A real-time chat application built with a modern, type-safe full-stack stack.  
Users can register, login, and engage in instant messaging within conversations.  
Features robust backend APIs, websocket-powered live communication, and a polished frontend UI.

---

## ✨ Key Features

- **User Authentication:** Secure signup/login with hashed passwords and JWT-based sessions.
- **Real-time Messaging:** Bidirectional live chat using WebSocket (Socket.IO), showing online users dynamically.
- **Conversations:** Create and join private conversations with multiple participants.
- **Message History:** Persistent storage of chat history using PostgreSQL.
- **User Presence:** Show online/offline user statuses in real-time.
- **Input Validation:** Robust validation using Zod to ensure data integrity.
- **Responsive UI:** User-friendly, accessible interface built with React.
- **Type Safety:** Full TypeScript support on frontend and backend for fewer runtime errors.
- **Environment Configuration:** Managed via `.env` files for multiple environments (development, production).

---

## 🧱 Technologies Used

### Frontend

- React
- TypeScript
- Vite
- Zod (validation)

### Backend

- Express.js
- Socket.IO
- TypeScript
- Prisma ORM
- PostgreSQL
- dotenv

---

## 🔧 Development Setup

1. Clone the repository.

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Setup environment variables:

Take .env.example from both folders

4. Apply Prisma migrations:

```bash
npx prisma migrate dev
```

5. Start backend server:

```bash
npm run dev
```

6. Start frontend dev server:

```bash
cd ./frontend
npm run dev
```
