# Lost and Found Website

A web application built with Next.js for managing lost and found items at a college. This application allows users to report lost or found items, view reported items, and manage user authentication using NextAuth.js. The backend is powered by PostgreSQL with Prisma as the ORM.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Future Plans](#future-plans)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Aryan-81/LOST-AND-FOUND.git
   cd LOST-AND-FOUND/lost-and-found
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables (see [Environment Variables](#environment-variables) section).**

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Features

- **User Authentication:** Secure sign-up, login, and logout functionalities using [NextAuth.js](https://next-auth.js.org/).
- **Report Management:** Users can report lost or found items through dedicated forms.
- **Items:** View all reported lost and found items in a centralized items.
- **Profile Management:** Users can manage their profiles and view their reported items.
- **API Integration:** Robust API routes for handling authentication and item management.
- **Database Management:** Utilizes PostgreSQL for reliable data storage, managed through Prisma ORM.

 - /home : ![Screenshot 2024-09-23 011432](https://github.com/user-attachments/assets/94b964b8-0a1c-4911-bafd-2f62e3d59076)

 - /items : ![Screenshot 2024-09-23 011041](https://github.com/user-attachments/assets/cb4b1432-5405-4f16-8700-318c51e4896c)
   ![Screenshot 2024-09-23 011112](https://github.com/user-attachments/assets/c57ade8e-6f0a-4c09-b3b2-a3aea9ec28a7)

 - /form : ![Screenshot 2024-09-23 011152](https://github.com/user-attachments/assets/cfe61db4-e9cd-42ba-afe4-8c04d601b6bf)


## Usage

- **Home Page (`/home`):** View the latest lost and found items.
- **Report Form (`/form`):** Submit a report for a lost or found item.
- **Items (`/items`):** Access a comprehensive view of all reported items.
- **Profile (`/profile`):** Manage your user profile and view your submitted reports.
- **Authentication:** Access sign-up and login pages via `/auth`.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# PostgreSQL Database URL
DATABASE_URL=postgresql://user:password@localhost:5432/lost_and_found_db

# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# Optional: Add any other environment variables you need
```

**Note:** Replace `user`, `password`, `localhost`, `5432`, and `your_nextauth_secret_key` with your actual PostgreSQL credentials and a strong secret key for NextAuth.js.

## Database Setup

1. **Install Prisma CLI** (if not already installed):

   ```bash
   npm install prisma --save-dev
   ```

2. **Migrate your database schema:**

   ```bash
   npx prisma migrate dev
   ```

## Future Plans

Here are some potential enhancements and features to consider for future development:

- **Enhanced Search and Filters:**
  - Implement advanced search functionality to allow users to filter lost and found items based on categories, dates, locations, etc.

- **Email Notifications:**
  - Set up email notifications to alert users when a lost item matching their report is found.

- **Admin Dashboard:**
  - Create an admin panel for moderators to manage reports, verify items, and handle user issues.

- **Mobile Application:**
  - Develop a mobile app version of the platform for easier access and notifications on the go.

- **User Ratings and Reviews:**
  - Allow users to rate and review the process, providing feedback for continuous improvement.

- **Security Enhancements:**
  - Implement additional security measures such as two-factor authentication (2FA) for user accounts.

- **Performance Optimization:**
  - Optimize the application for better performance and scalability as the user base grows.

