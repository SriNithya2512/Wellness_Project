# Arvyax - Secure Wellness Session Platform 🌿

A full-stack web application that enables users to securely **create, draft, and publish wellness sessions**, built with **React + Express + MongoDB + Node.js**.

## 🌟 Features

- 🔐 **Authentication** (JWT-based)
- 📝 **Create & Edit** sessions
- 💾 **Auto-save Drafts**
- 🚀 **Publish** sessions
- 🌈 Stylish UI with **CSS animations**, gradient themes, and responsive layout
- 🎯 Role-based dashboard
- 🌐 URL share support

---

## 📽 Demo Video

👉 [Click here to watch the demo](https://drive.google.com/file/d/1GSXXcKF3dd3RGHAIQnE16fYgu1lSeLJy/view?usp=sharing)

---

## 🖼 Screenshots

### 🔐 Login & Register

<img width="1860" height="931" alt="Screenshot 2025-08-02 231103" src="https://github.com/user-attachments/assets/b6195e66-0478-49f4-a145-443267ea7600" />


### 📋 Dashboard

<img width="1852" height="952" alt="Screenshot 2025-08-02 231207" src="https://github.com/user-attachments/assets/5372ff28-91b9-4a37-b8d0-95c6a150f06b" />


### 🛠 Editor

<img width="1841" height="947" alt="Screenshot 2025-08-02 231246" src="https://github.com/user-attachments/assets/1bea3645-dccc-499f-b733-ecebdfd29e66" />


### 📦 My Sessions

<img width="1822" height="928" alt="Screenshot 2025-08-02 231226" src="https://github.com/user-attachments/assets/c324e7cd-cd67-47bb-a3d8-44aeb5f54270" />


---

## 🛠 Tech Stack

- **Frontend**: React, CSS (custom, responsive), React Router DOM
- **Backend**: Express.js, Node.js, JWT Auth, MongoDB (Mongoose)
- **Database**: MongoDB Atlas
- **Tools**: GitHub, Postman, REST Client

---

## 📁 Folder Structure

```
arvyax-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env.example
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.js
├── README.md
└── package.json
```

---

## 🚀 Getting Started (Local Setup)

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/arvyax-app.git
   cd arvyax-app
   ```

2. Setup backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # fill your MongoDB URI and JWT_SECRET in .env
   npm run dev
   ```

3. Setup frontend:
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

4. Visit: `http://localhost:3000`

---

## ✅ .env Example

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 📌 Notes

- Use `npm run dev` for backend (with nodemon).
- MongoDB must be connected for session save/publish to work.
- Auto-save works every few seconds in the editor.
- Separate `.gitignore` is included for both frontend and backend.

---

##  Author

### Sri Nithya Gajavelli

---

Built with ❤️ for the Arvyax Full Stack Internship Assignment.

---



