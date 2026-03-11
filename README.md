## Blog Application

A server-rendered blogging platform built with Node.js, Express, MongoDB, and EJS. It supports user authentication, blog creation with image uploads, and a comment system.

---

## Features

- **User authentication**
  - Register and log in users with email and password
  - Passwords are salted and hashed using `crypto`
  - Authentication handled via JSON Web Tokens (JWT) stored in cookies

- **Blog management**
  - Create blog posts with title, body, and cover image
  - Each blog is associated with the user who created it
  - Server-side rendered pages using EJS templates

- **File uploads**
  - Cover images uploaded using `multer`
  - Per-user upload directories under `public/uploads/<userId>`

- **Comments**
  - Add comments on individual blog posts
  - Each comment is linked to both the blog and the commenting user

- **Protected routes**
  - Middleware checks authentication before allowing access to core blog and comment routes

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **View Engine**: EJS
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) + cookies
- **File Uploads**: Multer
- **Environment Management**: dotenv
- **Dev Tooling**: Nodemon

---

## Project Structure

```text
.
├── app.js                 # Application entry point
├── package.json
├── .env                   # Environment variables (not committed)
├── models
│   ├── blog.js            # Blog schema/model
│   ├── comment.js         # Comment schema/model
│   └── user.js            # User schema/model (password hashing + JWT helper)
├── routes
│   ├── blog.js            # Blog creation and detail routes
│   ├── comment.js         # Comment creation routes
│   └── user.js            # User auth (login/register) routes
├── middlewares
│   └── validateUsersAction.js  # Auth middleware (checks JWT cookie)
├── services
│   └── auth.js            # JWT token creation helper
├── views
│   ├── home.ejs           # Home page listing blogs
│   ├── addBlog.ejs        # Create blog form
│   ├── blogPage.ejs       # Blog detail + comments
│   └── partials           # Shared EJS partials (head, nav, scripts, etc.)
└── public
    ├── images             # Static images (default avatars, etc.)
    └── uploads            # Uploaded cover images (per user)
```

> Note: Some files/dirs above (like `user.js`, `auth.js`, `partials`, `public`) are inferred from the current codebase and may grow as you add more features.

---

## Installation and Setup

### 1. Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or hosted)

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root with values matching your MongoDB setup. The app currently builds the connection string from individual pieces:

```env
PORT=8000

PROTOCAL=mongodb://
DBUSERNAME=<your-db-username>
PASSWORD=<your-db-password>
HOST=<your-db-host>            # e.g. localhost
DB_PORT=<your-db-port>         # e.g. 27017
DATABASE=<your-database-name>
AUTHSOURCE=admin               # or the DB that stores credentials

JWT_SECRET=<your-jwt-secret>   # used in auth services
```

Ensure that the final resolved connection string looks like:

```text
mongodb://<DBUSERNAME>:<PASSWORD>@<HOST>:<DB_PORT>/<DATABASE>?authSource=<AUTHSOURCE>
```

### 4. Run the application

- **Development (with hot reload via nodemon):**

```bash
npm run dev
```

- **Production:**

```bash
npm start
```

The server will start on `http://localhost:<PORT>` (default `http://localhost:8000`).

---

## Basic Usage

- Visit the home page to see the list of blogs.
- Register/log in via the user routes (under `/user`) to obtain a valid session.
- After logging in, you can:
  - Create new blogs at `/blog/add-blog`
  - View a blog at `/blog/:blogId`
  - Add comments to a blog via the form on the blog detail page.

