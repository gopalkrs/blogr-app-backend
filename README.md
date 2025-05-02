📝 Blog App
A full-stack CRUD (Create, Read, Update, Delete) blog application built with React, Express, MongoDB, Zustand for state-management.

🚀 Features
Admin-only blog creation and editing

View all blog posts

Single post detail pages

Delete blogs (admin only)

Auth system with JWT and cookies

Protected routes

Responsive and clean UI with Tailwind CSS & ShadCN

🛠️ Tech Stack
Frontend: React, Vite, Zustand, React Router, ShadCN UI, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB Atlas

Auth: JWT + Cookies

Validation: Zod

-> Installation
1. Clone the repo
bash
Copy
Edit
git clone https://github.com/yourusername/blog-app.git
cd blog-app
2. Setup the backend
cd server
npm install
Create a .env file in /server:

-->.env
PORT=4000
MONGO_URL=your_mongo_url
JWT_SECRET_KEY=your_secret

run command 'npm run dev'

3. Setup the frontend
cd ../client
npm install
Create a .env file in /client:

-->.env
VITE_API_URL=http://localhost:4000/api

then run command 'npm run dev'

->Authentication
Only admin users can create or manage posts

->Users can view and read posts

✍️ Author
Gopal choudhary












