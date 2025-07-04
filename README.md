# Ticket Exchange System (MERN Stack)

## 🔧 Project Overview

This is a basic Ticket Exchange System built using the MERN stack (MongoDB, Express, React, Node.js). It is inspired by a Book Management System but allows users to request exchanges of tickets across categories like movies, sports, events, etc. It was developed for learning and strengthening MERN stack fundamentals.

## 🛠️ Technologies Used

* **Frontend:** React.js, Tailwind CSS, Axios, React Router
* **Backend:** Node.js, Express.js, MongoDB, Mongoose
* **Authentication:** JWT, bcryptjs

## 📁 Project Structure

```
root/
│
├── server/               # Backend code
│   ├── controllers/      # Business logic for tickets, auth, exchange
│   ├── middleware/       # JWT authentication middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   └── server.js         # Express app entry point
│
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Navbar, Cards etc.
│   │   ├── pages/        # Home, Exchange, Login etc.
│   │   ├── App.jsx       # Route handling
│   │   └── index.css     # Tailwind setup
│   └── index.html
│
└── README.md             # Project readme
```

## ✅ Features

* User registration and login with JWT authentication
* Add, view, and delete personal tickets
* Request ticket exchange with another user
* View incoming/outgoing exchange requests
* Accept or reject exchange requests
* Neon-dark futuristic UI (inspired by ticket/event dashboards)

## 🔐 Auth API

* `POST /api/auth/register` — User signup
* `POST /api/auth/login` — User login

## 🎟 Ticket API

* `POST /api/tickets/` — Add a ticket
* `GET /api/tickets/` — Get user's tickets
* `DELETE /api/tickets/:id` — Delete a ticket

## 🔁 Exchange Request API

* `POST /api/exchange/request` — Request an exchange
* `GET /api/exchange/my-requests` — View exchange requests
* `POST /api/exchange/:id/respond` — Accept/Reject exchange request

## ⚙️ How to Run Locally

1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/ticket-exchange-system.git
cd ticket-exchange-system
```

2. **Install Backend Dependencies**

```bash
cd server
npm install
```

3. **Install Frontend Dependencies**

```bash
cd ../client
npm install
```

4. **Create `.env` in `server/` directory**

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

5. **Start Backend**

```bash
cd server
npm run dev
```

6. **Start Frontend**

```bash
cd ../client
npm run dev
```

## 🔄 Future Improvements

* Notification system for request updates
* Chat between users
* Ticket expiration and QR validation
* Admin dashboard for ticket monitoring



**Author:** \[Pranita Mahajan]

