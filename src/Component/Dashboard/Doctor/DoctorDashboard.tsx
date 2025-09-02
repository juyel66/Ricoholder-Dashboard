"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "@/Component/Auth/AuthFuction";
// import { getCurrentUser } from "./path/to/authService";

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

      setAppointments(response.data.data); // API structure অনুযায়ী adjust
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

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>

      {/* Status Filter */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setStatus("")}
          className={`px-3 py-1 rounded ${
            status === "" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setStatus("PENDING")}
          className={`px-3 py-1 rounded ${
            status === "PENDING" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setStatus("COMPLETED")}
          className={`px-3 py-1 rounded ${
            status === "COMPLETED" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setStatus("CANCELLED")}
          className={`px-3 py-1 rounded ${
            status === "CANCELLED" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment: any) => (
            <div
              key={appointment._id}
              className="p-4 border rounded shadow-sm flex justify-between"
            >
              <div>
                <p>
                  <strong>Patient:</strong> {appointment.patient.name}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(appointment.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong> {appointment.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Previous
        </button>
        <span className="px-3 py-1">{page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
