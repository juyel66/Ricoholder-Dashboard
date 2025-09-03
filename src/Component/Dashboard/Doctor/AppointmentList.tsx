"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "@/Component/Auth/AuthFuction";

interface Appointment {
  _id: string;
  patient: {
    name: string;
    email?: string;
    photo_url?: string;
  };
  date: string;
  status: string;
  reason?: string;
}

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const fetchAppointments = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      setError("⚠️ User not logged in");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `https://appointment-manager-node.onrender.com/api/v1/appointments/doctor?page=${page}${
          statusFilter ? `&status=${statusFilter}` : ""
        }${dateFilter ? `&date=${dateFilter}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      console.log("API Response:", res.data); // 

      setAppointments(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
      setLoading(false);
    } catch (err: any) {
      console.error("API Error:", err.response?.data);

      // Dummy data fallback
      const dummyData: Appointment[] = [
        {
          _id: "1",
          patient: { name: "John Doe", email: "john@example.com" },
          date: new Date().toISOString(),
          status: "PENDING",
          reason: "Regular Checkup",
        },
        {
          _id: "2",
          patient: { name: "Jane Smith", email: "jane@example.com" },
          date: new Date().toISOString(),
          status: "COMPLETED",
          reason: "Dental Cleaning",
        },
      ];

      console.log("Using Dummy Data:", dummyData); // 
      setAppointments(dummyData);
      setError(err.response?.data?.message || "Failed to fetch appointments. Showing dummy data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [page, statusFilter, dateFilter]);

  if (loading) return <div>Loading appointments...</div>;
  if (error) console.warn(error); // Warning in console

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-col md:flex-row">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="PENDING" className="text-black">Pending</option>
          <option value="COMPLETED"  className="text-black">Completed</option>
          <option value="CANCELLED"  className="text-black">Cancelled</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <p className="text-center mt-20 mb-20">No appointments available.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((appt) => (
            <li key={appt._id} className="border p-4 rounded shadow hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={appt.patient.photo_url || "/default-patient.png"}
                  alt={appt.patient.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold">{appt.patient.name}</p>
                  {appt.patient.email && <p className="text-gray-400 text-sm">{appt.patient.email}</p>}
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
          disabled={page ===1}

          
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
