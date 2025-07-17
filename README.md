Auth App
A modern authentication system built with Next.js, MongoDB, and Tailwind CSS, featuring animated login and register forms with MVC architecture.
Features

Login with email or username and password validation.
Register with username, email, date of birth, gender, terms agreement, and password confirmation.
Smooth animations using Framer Motion.
Responsive design with Tailwind CSS.
MongoDB for secure user data storage.
Client-side and server-side validation with Zod.

Prerequisites

Node.js (v16 or higher)
MongoDB Atlas account

Setup

Clone the repository:git clone <repository-url>
cd auth-app


Install dependencies:npm install


Create a .env.local file in the root directory and add your MongoDB URI:MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/auth-app?retryWrites=true&w=majority


Run the development server:npm run dev


Open http://localhost:3000 in your browser.

File Structure

/app: Next.js pages and API routes.
/components: Reusable React components.
/controllers: Business logic for authentication.
/models: MongoDB schemas.
/lib: Database connection and validation logic.
/styles: Custom styles and Tailwind configuration.

Dependencies

next: Next.js framework.
mongoose: MongoDB ORM.
bcryptjs: Password hashing.
framer-motion: Animations.
zod: Validation.
tailwindcss: Styling.

License
MIT