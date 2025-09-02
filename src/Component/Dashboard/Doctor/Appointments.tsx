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
  status: "PENDING" | "COMPLETE" | "CANCELLED"; // ✅ FIXED
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

  // Fetch appointments
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

      console.log("API Response:", res.data);
      setAppointments(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
      setLoading(false);
    } catch (err: any) {
      console.error("API Error:", err.response?.data);
      setError(err.response?.data?.message || "Failed to fetch appointments");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [page, statusFilter, dateFilter]);

  // ✅ Update appointment status
  const updateStatus = async (
    appointmentId: string,
    status: "COMPLETE" | "CANCELLED"
  ) => {
    if (!confirm(`Are you sure you want to mark this as ${status}?`)) return;

    const currentUser = getCurrentUser();
    if (!currentUser) return;

    try {
      const res = await axios.patch(
        "https://appointment-manager-node.onrender.com/api/v1/appointments/update-status",
        {
          appointment_id: appointmentId, // ✅ key name correct
          status: status, // ✅ must be "COMPLETE" or "CANCELLED"
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Status Updated:", res.data);

      // Update UI instantly
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, status } : appt
        )
      );
    } catch (err: any) {
      console.error("Update Error:", err.response?.data);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) return <div>Loading appointments...</div>;
  if (error) console.warn(error);

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
          <option value="COMPLETE">Completed</option>
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
      {appointments.length === 0 ? (
        <p className="text-center mt-20 mb-20">No appointments found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((appt) => (
            <li
              key={appt._id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={appt.patient.photo_url || "/default-patient.png"}
                  alt={appt.patient.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold">{appt.patient.name}</p>
                  {appt.patient.email && (
                    <p className="text-gray-600 text-sm">{appt.patient.email}</p>
                  )}
                </div>
              </div>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(appt.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {appt.status}
              </p>
              {appt.reason && (
                <p>
                  <strong>Reason:</strong> {appt.reason}
                </p>
              )}

              {/* Action buttons */}
              {appt.status === "PENDING" && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => updateStatus(appt._id, "COMPLETE")}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Mark Complete
                  </button>
                  <button
                    onClick={() => updateStatus(appt._id, "CANCELLED")}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
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
