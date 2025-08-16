# Backend

## 📌 Overview

This is the backend service for the **E-Voting System**, built with **Node.js**, **Express.js**, and **MySQL**.
It provides authentication and role-based user management (admin, superadmin, student) using JWTs.

The project is fully containerized with **Docker Compose** for easy setup.

---

## 🚀 Prerequisites

* [Docker](https://docs.docker.com/get-docker/) + [Docker Compose](https://docs.docker.com/compose/)
* Node.js (only if you want to run outside Docker)

---

## ⚙️ Setup & Run

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd backend
```

### 2. Create a `.env` file

In the `backend/` directory, create a `.env` file:

```env
# App
PORT=4000
ACCESS_TOKEN_SECRET=your_secret_key
SUPER_ADMIN_EMAIL=superadmin@example.com

# Database
DB_HOST=db
DB_USER=appuser
DB_PASSWORD=app_pass
DB_NAME=mydatabase
DB_PORT=3306
```

👉 Notes:

* `ACCESS_TOKEN_SECRET` should be a long random string.
* Database credentials must match what’s in your `docker-compose.yml`.
* `DB_HOST=db` (the service name in Docker Compose).

---

### 3. Start the stack (API + MySQL)

```sh
docker compose up -d --build
```

This will:

* Start a MySQL container with persistent storage (`mysql-data` volume).
* Start the API container.
* Run initialization scripts (`db-init/*.sql`) to create tables and seed a superadmin.

---

### 4. Verify database tables

To confirm the `Users` table was created:

```sh
docker exec -it backend-db-1 mysql -uroot -psystem -e "USE mydatabase; SHOW TABLES;"
```

You should see `Users`.

---

## 🔑 API Endpoints

### Login

```sh
curl -X POST http://localhost:4000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"superadmin@example.com","password":"system"}'
```

### Get all admins

```sh
curl http://localhost:4000/admins
```

### Get all superadmins

```sh
curl http://localhost:4000/superadmins
```

---

## 🛠 Development (non-Docker)

If you want to run the backend directly (without Docker):

```sh
npm install
npm start
```

Make sure you have a local MySQL running and update `.env` accordingly.

---

## 📦 Dependencies

* **express** – Web framework
* **mysql2** – MySQL client for Node.js
* **jsonwebtoken** – JWT auth
* **dotenv** – Env var management
* **cors** – CORS middleware
* **bcrypt** – (recommended) secure password hashing
* **multer** – File uploads
* **passport** & **passport-jwt** – JWT authentication strategies

---

## 📝 License

This project is licensed under the MIT License.

---

✅ This README now:

* Documents **Docker setup** instead of SQL Server.
* Explains `.env` variables clearly.
* Provides curl examples for quick testing.
* Covers both Docker and bare-metal workflows.

---