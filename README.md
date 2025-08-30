# Profile Management Application

## Overview
A responsive **React + TypeScript** profile management system built with **Redux Toolkit, React Router, Material UI, and Zod validation**.  
Implements **form validation, routing, global state, localStorage persistence, environment configuration, mock API with delay, and a polished UI/UX**.

## Features
- **Full CRUD Operations:** Create, update, view, and delete user profiles
- **Form Validation with Zod:**
  - **Name:** Required, minimum 3 characters
  - **Email:** Required, valid email format
  - **Age:** Optional, must be a valid number
- **Redux Toolkit** for centralized state management
- **React Router** for navigation (`/profile-form`, `/profile`, `/404`)
- **Material UI** components for modern UI: Inputs, Buttons, Avatar, Dialogs
- **Custom Snackbar Component** for success and error notifications
- **LocalStorage persistence** to retain user profile across sessions
- **Mock API** with Promise-based architecture and simulated network delay
- **Environment configuration** with `.env` files (development & production)
- **Dynamic Navbar** shows first & last name when available
- **Error Handling:** Handled validation errors, API errors, and empty states

## Installation Steps

### Clone the repository
```bash
git clone https://github.com/madhuusudhan/profile-manager.git
cd profile-manager
```

### Install dependencies
```bash
npm install
```

### Create Environment files in project root
.env.development
```bash
VITE_API_BASE_URL=http://localhost:5000
```
.env.production
```bash
VITE_API_BASE_URL=https://your-production-api.com
```

### Start development seerver
```bash
npm run dev
```

### Build for production
```bash
npm run build
```


