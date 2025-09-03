"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "@/Component/Auth/AuthFuction";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

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
        `https://appointment-manager-node.onrender.com/api/v1/appointments/patient?page=${page}${
          statusFilter ? `&status=${statusFilter}` : ""
        }`,
        {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        }
      );
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
  }, [page, statusFilter]);

  return (
    <div className="p-4 md:p-8 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        My Appointments
      </h1>

      {/* Status Filter */}
      <div className="mb-6 flex justify-center md:justify-start">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="PENDING" className="text-black">Pending</option>
          <option value="COMPLETED" className="text-black">Complete</option>
          <option value="CANCELLED" className="text-black">Cancelled</option>
        </select>
      </div>

      {/* Appointments List */}
      {loading ? (
        <p className="text-center text-white mt-20">
          Loading your appointments...
        </p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-white mt-20 mb-20">
          No appointments available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="font-semibold text-lg mb-2">
                  Doctor: {appt.doctor?.name || "N/A"}
                </h2>
                <p className="text-white mb-1">
                  Date: {new Date(appt.date).toLocaleDateString()}
                </p>
                <p className="text-white mb-1">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      appt.status === "COMPLETED"
                        ? "text-green-600"
                        : appt.status === "PENDING"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {appt.status}
                  </span>
                </p>
                {appt.reason && (
                  <p className="text-gray-600">Reason: {appt.reason}</p>
                )}
              </div>
            </div>
          ))}
        </div>
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

export default MyAppointments;
