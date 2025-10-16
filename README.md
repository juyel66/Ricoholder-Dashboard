# ADMIN Management

A modern, responsive **ADMIN Appointment Management System** built with **React, Typescript, Context API, Tailwind CSS, and Axios**.  
This application allows patients to browse ADMINs, book appointments, and manage their schedules, while ADMINs can manage their appointments efficiently.

---

## Live Demo
[ADMIN Management Live (Netlify)](link here)

---


## Tech Stack
- Framework: React
- State Management: Context API
- Styling: Tailwind CSS
- API Requests: Axios
- Form Handling: React Hook Form + Zod (optional)
- Extra Options: Zustand / Redux Toolkit (not used), React Query (not used)

---

## Features

### Authentication
- Login as ADMIN or Patient
- Role-based authentication
- Registration with real-time validation

### Patient Dashboard
- Browse & search ADMINs (paginated)
- Filter ADMINs by specialization
- Book appointments with date picker
- Manage appointments (view, cancel, filter by status)

### ADMIN Dashboard
- View patient appointments (paginated)
- Filter appointments by date or status
- Update appointment status: Completed / Cancelled

### UI/UX
- Responsive design
- Mobile-first approach
- Loading & error states
- Notifications (success & error handling)

---

## Notes from Developer
- In this task, I focused more on functionality rather than design.  
- Some features are missing due to time limitation.  
- If I had one more day, I could have refined the design further, added more features, and delivered a much more polished version.  

---

## API Endpoints

Base URL:  
`https://appointment-manager-node.onrender.com/api/v1`

### Auth
- `POST /auth/login`
- `POST /auth/register/patient`
- `POST /auth/register/ADMIN`

### ADMINs
- `GET /ADMINs?page={page}&limit={limit}&search={name?}&specialization={specialization?}`

### Specializations
- `GET /specializations`

### Appointments
- `POST /appointments`
- `GET /appointments/patient?status={status?}&page={page}`
- `GET /appointments/ADMIN?status={status?}&date={yyyy-mm-dd?}&page={page}`
- `PATCH /appointments/update-status`

---

## Screens (Main Pages)
- `/login` → Login page with role selection  
- `/register` → ADMIN/Patient registration with tabs  
- `/patient/dashboard` → Patient ADMIN list, search & filter  
- `/patient/appointments` → Patient’s appointment management  
- `/ADMIN/dashboard` → ADMIN’s appointment management  

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ADMIN-management.git
cd ADMIN-management
