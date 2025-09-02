"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "@/Component/Auth/AuthFuction";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(""); // Pending, Completed, Cancelled

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const currentUser = getCurrentUser();
      if (!currentUser) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      const params: any = { page };
      if (status) params.status = status.toUpperCase();

      const response = await axios.get(
        "https://appointment-manager-node.onrender.com/api/v1/appointments/doctor",
        {
          headers: { Authorization: `Bearer ${currentUser.token}` },
          params,
        }
      );

      setAppointments(response.data.data || []);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch appointments");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [page, status]);

  if (loading) return <div className="text-center mt-20">Loading appointments...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Doctor Dashboard</h1>

      {/* Status Filter */}
      <div className="mb-6 flex gap-2 flex-wrap justify-center">
        {["", "PENDING", "COMPLETED", "CANCELLED"].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-4 py-2 rounded font-medium transition ${
              status === s
                ? "bg-blue-500 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {s === "" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <p className="text-gray-600 text-center">No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {appointments.map((appointment: any) => (
            <div
              key={appointment._id}
              className="w-80 p-5 bg-white border rounded-xl shadow-lg hover:shadow-2xl transition"
            >
              <div className="mb-3 text-center">
                <p className="font-semibold text-lg">{appointment.patient.name}</p>
              </div>
              <p className="text-gray-600">
                <strong>Date:</strong>{" "}
                {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <strong>Status:</strong> {appointment.status}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-white border rounded shadow">{page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
