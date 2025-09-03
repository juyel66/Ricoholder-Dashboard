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
  status: "PENDING" | "COMPLETE" | "CANCELLED";
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

  const API_BASE_URL = "https://appointment-manager-node.onrender.com/api/v1";

  const currentUser = getCurrentUser();
  const token = currentUser?.token;

  // Fetch appointments
  const fetchAppointments = async () => {
    if (!token) {
      setError("⚠️ User not logged in");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}/appointments/doctor?page=${page}${
          statusFilter ? `&status=${statusFilter}` : ""
        }${dateFilter ? `&date=${dateFilter}` : ""}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Fetched Appointments:", res.data);
      setAppointments(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
      setLoading(false);
    } catch (err: any) {
      console.error("Fetch Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch appointments");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [page, statusFilter, dateFilter]);

  // Update appointment status
  const updateStatus = async (_id: string, status: "COMPLETE" | "CANCELLED") => {
    if (!token) return;
    if (!confirm(`Are you sure you want to mark this as ${status}?`)) return;

    try {
      console.log("Updating Status:", { appointment_id: _id, status });
      const res = await axios.patch(
        `${API_BASE_URL}/appointments/update-status`,
        { appointment_id: _id, status }, // 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Update Response:", res.data);

      // Update UI instantly
      setAppointments((prev) =>
        prev.map((appt) => (appt._id === _id ? { ...appt, status } : appt))
      );
    } catch (err: any) {
      console.error("Update Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) return <div className="p-5 text-center">Loading appointments...</div>;
  if (error) return <div className="p-5 text-center text-red-500">{error}</div>;

  return (
    <div className="p-5 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-5">Doctor Dashboard</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETE">Complete</option>
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
        <p className="text-center text-gray-500 mt-10">No appointments found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {appointments.map((appt) => (
            <li key={appt._id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={appt.patient.photo_url || "/default-patient.png"}
                  alt={appt.patient.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold">{appt.patient.name}</p>
                  {appt.patient.email && <p className=" text-sm text-gray-300">{appt.patient.email}</p>}
                </div>
              </div>

              <p>
                <strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}
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
                <div className="flex gap-2 mt-3">
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
      <div className="flex justify-center mt-6 gap-3">
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
