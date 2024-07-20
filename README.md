# ts-auth-service-1818" 

## Overview

This project is an authentication service built using Node.js, Express, and Prisma. It handles user registration, login, token management, and more.

## Prerequisites

- Node.js (v18.x or later)
- PostgreSQL (or another supported SQL database)
- Prisma CLI

## Setup and Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Configure Environment Variables

```bash
DATABASE_URL=your_database_connection_string
PORT=your_port_number
JWT_SECRET=your_jwt_secret

```

### 4. Run Database Migrations

```bash
npx prisma migrate deploy

```

### 5. Start the Application

```bash
npm run dev

```

## API Endpoints

### 1. User Registration

- Endpoint: POST /auth/register
- Request Body:

```bash
{
  "email": "user@example.com",
  "password": "yourpassword",
  "username": "username"
}

```