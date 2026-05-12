Combo Gym - Full-Stack Booking System 🥊
A comprehensive management application for a boxing gym, built with a modern architecture focusing on data integrity and real-time performance. This project was developed to streamline trainer availability and subscriber bookings.

🌟 Key Features
Real-time Booking Engine: Robust reservation system engineered with SQL Transactions and Redis to prevent race conditions during peak booking hours.

Dynamic Token Economy: Integrated payment logic where users purchase tokens to book sessions, featuring tiered pricing models.

Automated Schedule Management: Implementation of Cron jobs for an automated system reset every Sunday at 12:00.

Industrial-Grade UI: High-performance, responsive user interface tailored for an athletic environment using React and Material UI.

🛠️ Tech Stack
Frontend: React, TypeScript, Material UI, Axios.

Backend: Node.js, Express.

Database: PostgreSQL (Relational data management for users and bookings).

Caching & Concurrency: Redis (Ensuring high-speed access to available slots).

🔒 Security & Optimization
JWT Authentication: Secure user sessions and protected API routes.

Data Integrity: Use of PostgreSQL transactions to ensure atomic booking operations.
