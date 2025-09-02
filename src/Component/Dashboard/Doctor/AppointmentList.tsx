"use client";

import React, { useEffect, useState } from "react";

interface Appointment {
  _id: string;
  patient: {
    name: string;
    email?: string;
    photo_url?: string;
  };
  date: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  reason?: string;
}

// Dummy data
const dummyAppointments: Appointment[] = [
  {
    _id: "1",
    patient: { name: "John Doe", email: "john@example.com", photo_url: "/default-patient.png" },
    date: "2025-09-05",
    status: "PENDING",
    reason: "Regular checkup",
  },
  {
    _id: "2",
    patient: { name: "Jane Smith", email: "jane@example.com" },
    date: "2025-09-06",
    status: "COMPLETED",
  },
  {
    _id: "3",
    patient: { name: "Alice Johnson", email: "alice@example.com" },
    date: "2025-09-07",
    status: "CANCELLED",
    reason: "Feeling better",
  },
  {
    _id: "4",
    patient: { name: "Bob Brown", email: "bob@example.com" },
    date: "2025-09-08",
    status: "PENDING",
  },
  {
    _id: "5",
    patient: { name: "Charlie Davis" },
    date: "2025-09-09",
    status: "COMPLETED",
    reason: "Follow-up visit",
  },
];

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(dummyAppointments);
  const [page, setPage] = useState(1);
  const [totalPages] = useState(2); // Dummy pagination
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filteredAppointments = appointments.filter((appt) => {
    const statusMatch = statusFilter ? appt.status === statusFilter : true;
    const dateMatch = dateFilter ? appt.date === dateFilter : true;
    return statusMatch && dateMatch;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-col md:flex-row">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Appointment List */}
      {filteredAppointments.length === 0 ? (
        <p className="text-center mt-20 mb-20">No appointments found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAppointments.map((appt) => (
            <li key={appt._id} className="border p-4 rounded shadow hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={appt.patient.photo_url || "/default-patient.png"}
                  alt={appt.patient.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold">{appt.patient.name}</p>
                  {appt.patient.email && <p className="text-gray-600 text-sm">{appt.patient.email}</p>}
                </div>
              </div>
              <p><strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {appt.status}</p>
              {appt.reason && <p><strong>Reason:</strong> {appt.reason}</p>}
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1 border rounded">{page}</span>
        <button
          onClick={() => setPage(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
