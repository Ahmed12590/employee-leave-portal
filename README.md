# Employee Leave Portal

A web application to manage employee leave requests and approvals.  
Built with **Next.js** + **TypeScript**, using a **SQL database** for storing data.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Database](#database)  
- [Getting Started](#getting-started)  
- [Project Structure](#project-structure)  
- [Environment Variables](#environment-variables)  
- [Contributing](#contributing)  
- [License](#license)

---

## Features

- Employees can submit leave requests  
- Admin / Manager can approve or reject leave requests  
- View status of leave (pending / approved / rejected)  
- Leave history for each employee   
- Secure authentication & authorization  

---

## Tech Stack

- **Frontend / Fullstack**: Next.js, React, TypeScript  
- **Styling**: CSS / SCSS / Tailwind (depending on your setup)  
- **Backend / API**: Next.js API routes  
- **Database**: SQL (PostgreSQL, MySQL, or SQLite)  
- **ORM / Data Layer**: Prisma / Sequelize / TypeORM (whichever you use)  

---

## Database

This project uses a **SQL database**.

| Aspect | Description |
|---|---|
| Database Type | e.g. PostgreSQL / MySQL / SQLite |
| Schema / Tables | Employees, LeaveRequests, LeaveTypes, Roles |
| ORM / Query Library | Prisma / Sequelize / TypeORM (if applicable) |
| Config | Environment variables (`DB_HOST`, `DB_USER`, `DB_PASS`, etc.) |

---

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
