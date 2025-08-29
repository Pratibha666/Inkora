# Inkora  

Inkora is a full-stack **MERN (MongoDB, Express, React, Node.js)** e-bookstore application where users can **browse and purchase books**. Styled with **Tailwind CSS**, Inkora provides a modern and user-friendly bookstore experience.  

---

## Features  

- Browse and view available e-books  
- Shopping cart for adding/removing books  
- User authentication and authorization with **JWT**  
- Admin panel for managing books  
---

## Tech Stack  

**Frontend**  
- React  
- Tailwind CSS  

**Backend**  
- Node.js  
- Express.js  

**Database**  
- MongoDB  

---

## Prerequisites  

Before running the project, ensure you have the following installed:  

- [Node.js](https://nodejs.org/) (>= 16.x)  
- npm (>= 8.x) or yarn (>= 1.22.x)  
- [MongoDB](https://www.mongodb.com/) (>= 5.x)  

---

## Environment Variables 

### Server `.env`  
```
PORT=your-port-number   
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secure-jwt-secret
```

## Setup and Installation
Follow these steps to set up and run the project locally

### 1. Clone the repository
```
git clone https://github.com/your-username/Inkora.git
cd Inkora
```
### 2. Setup Server
```
cd server
npm install
npm start
```
### 3. Setup Client
```
cd ../client
npm install
npm run dev
```
### 4. Start MongoDB
```
Make sure MongoDB is running locally or via Atlas
```

## Folder Structure
Folder Structure for project is listed below.

---
```
Inkora/
├── client/             # Frontend (React + Vite + Tailwind)
│ ├── node_modules/
│ ├── public/
│ └── src/
│ ├── assets/           
│ ├── components/       # Reusable React components
│ ├── store/            # State management (Redux)
│ ├── App.css
│ ├── App.jsx
│ ├── main.jsx
│ ├── eslint.config.js
│ ├── index.html
│ ├── package.json
│ ├── vite.config.js
│ └── README.md

├── server/             # Backend (Node.js + Express + MongoDB)
│ ├── controllers/      # Controllers for handling requests
│ ├── database/         # DB connection setup
│ ├── models/           # Mongoose models
│ ├── routes/           # API routes
│ ├── sendEmail/        # Email service logic
│ ├── utils/            # Utility functions
│ │ ├── forgotPasswordTemplate.js
│ │ ├── generateOtp.js
│ │ └── userAuth.js
│ ├── .env              # Server environment variables
│ ├── index.js          # Server entry point
│ ├── package.json
│ └── vercel.json

├── .gitignore
```
## Live Demo
[Inkora Live Website](https://inkora-w8vd.vercel.app/)

## Contributing
Contributions are welcome ! 
If you'd like to contribute, please fork the repository and create a pull request.
Steps:
1. Fork the project
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add some feature"`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request