# Doctor Management

A modern, responsive **Doctor Appointment Management System** built with **Next.js, React, Tailwind CSS, and Axios**.  
This application allows patients to browse doctors, book appointments, and manage their schedules, while doctors can manage their appointments efficiently.

---

## Live Demo
[Doctor Management Live (Netlify)](https://hishabee-jobs-tasks1.netlify.app/)

---

## Repository
[GitHub Repository](https://github.com/your-username/doctor-management)

---

## Tech Stack
- Framework: Next.js (React)
- Language: TypeScript (optional but supported)
- Styling: Tailwind CSS
- API Requests: Axios
- Form Handling: React Hook Form + Zod
- State Management: Zustand / Redux Toolkit (optional)
- API Caching: React Query (optional)

---

## Features

### Authentication
- Login as Doctor or Patient
- Role-based authentication
- Registration with real-time validation

### Patient Dashboard
- Browse & search doctors (paginated)
- Filter doctors by specialization
- Book appointments with date picker
- Manage appointments (view, cancel, filter by status)

### Doctor Dashboard
- View patient appointments (paginated)
- Filter appointments by date or status
- Update appointment status: Completed / Cancelled

### UI/UX
- Modern responsive design
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
- `POST /auth/register/doctor`

### Doctors
- `GET /doctors?page={page}&limit={limit}&search={name?}&specialization={specialization?}`

### Specializations
- `GET /specializations`

### Appointments
- `POST /appointments`
- `GET /appointments/patient?status={status?}&page={page}`
- `GET /appointments/doctor?status={status?}&date={yyyy-mm-dd?}&page={page}`
- `PATCH /appointments/update-status`

---

## Screens (Main Pages)
- `/login` → Login page with role selection  
- `/register` → Doctor/Patient registration with tabs  
- `/patient/dashboard` → Patient doctor list, search & filter  
- `/patient/appointments` → Patient’s appointment management  
- `/doctor/dashboard` → Doctor’s appointment management  

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/doctor-management.git
cd doctor-management
