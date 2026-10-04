# Authentication & Authorization with RBAC Backend API

A production-ready Node.js backend implementing secure user authentication (JWT), refresh token flow, and Role-Based Access Control (RBAC).

---

## 🚀 Features

- **User Authentication**: Secure user registration and login with `bcryptjs` password hashing.
- **JWT Authorization**: Short-lived Access Tokens for authenticated routes.
- **Refresh Token Mechanism**: Long-lived Refresh Tokens to generate new access tokens without re-logging in.
- **Role-Based Access Control (RBAC)**: Role verification middleware restricting access based on user role (`admin`, `user`).
- **Clean Architecture**: Separation of concerns across Models, Controllers, Middlewares, and Routes.
- **MongoDB Integration**: MongoDB Atlas connection via Mongoose with schema validation.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Security & Tokens**: [jsonwebtoken (JWT)](https://github.com/auth0/node-jsonwebtoken), [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Environment**: [dotenv](https://github.com/motdotla/dotenv)

---

## 📁 Project Structure

```text
├── controllers/
│   └── auth-controller.js      # Register, Login, Refresh, Logout logic
├── database/
│   └── db.js                   # MongoDB connection configuration
├── middlewares/
│   ├── auth-middleware.js      # JWT verification middleware
│   └── admin-middleware.js     # RBAC (admin role check) middleware
├── model/
│   └── user.js                 # Mongoose User schema & model
├── routes/
│   ├── auth-route.js           # Auth endpoints (/api/auth)
│   ├── home-route.js           # Protected home route (/api/home)
│   └── admin-route.js          # Admin-only route (/api/admin)
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignore rules for node_modules and secrets
├── package.json                # Project dependencies and scripts
├── server.js                   # Application entry point
└── README.md                   # Documentation
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB instance

### 2. Installation

Clone the repository and install dependencies:
```bash
git clone https://github.com/shahriyarcse-arch/Beginner-Auth-Rbac-Upload.git
cd Beginner-Auth-Rbac-Upload
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory by copying `.env.example`:
```bash
cp .env.example .env
```

Configure your `.env` variables:
```env
PORT=3000
MONGOOSE_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET_KEY=your_jwt_secret_key_here
JWT_REFRESH_KEY=your_jwt_refresh_key_here
```

### 4. Run Application

```bash
# Development mode with Nodemon
npm run dev

# Production mode
node server.js
```

The server will start at `http://localhost:3000`.

---

## 📡 API Endpoints

### 🔐 Auth Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login user & receive tokens | No |
| `POST` | `/api/auth/refresh` | Generate new access token | No |
| `POST` | `/api/auth/logout` | Invalidate refresh token | No |

#### Register Payload (`POST /api/auth/register`)
```json
{
  "firstname": "Shamim",
  "lastname": "Shahriyar",
  "email": "shamim@example.com",
  "phone": "01955512002",
  "password": "strongPassword123",
  "role": "user"
}
```

#### Login Payload (`POST /api/auth/login`)
```json
{
  "firstname": "Shamim",
  "password": "strongPassword123"
}
```

#### Refresh Token Payload (`POST /api/auth/refresh`)
```json
{
  "refreshToken": "<YOUR_REFRESH_TOKEN>"
}
```

---

### 🛡️ Protected Routes

| Method | Endpoint | Description | Headers |
|---|---|---|---|
| `GET` | `/api/home/welcome` | Protected user landing page | `Authorization: Bearer <ACCESS_TOKEN>` |
| `GET` | `/api/admin/admin` | Admin-only dashboard access | `Authorization: Bearer <ADMIN_ACCESS_TOKEN>` |

---

## 🔒 Security Best Practices Implemented

- Passwords salted and hashed with `bcryptjs`.
- Sensitive configuration and database credentials managed via `.env`.
- Explicit `.gitignore` ensures secrets and `node_modules` are excluded from version control.
- Token validation middleware for protected resource access.
- Role-based authorization guarding restricted routes.

---

## 👨‍💻 Author

**Shamim Shahriyar**
- GitHub: [@shahriyarcse-arch](https://github.com/shahriyarcse-arch)
