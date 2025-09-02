"use client";

import { useState } from "react";
import axios from "axios";
import { getCurrentUser } from "@/Component/Auth/AuthFuction";


const Appointments = () => {
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentUser = getCurrentUser();
    if (!currentUser) {
      setMessage("User not logged in");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://appointment-manager-node.onrender.com/api/v1/appointments",
        {
          doctorId,
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      if (response.data.success) {
        setMessage("Appointment created successfully!");
      } else {
        setMessage(response.data.message);
      }

      setLoading(false);
    } catch (err: any) {
      console.log(err);
      setMessage(err.response?.data?.message || "Failed to create appointment");
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Appointment</h1>
      <form onSubmit={handleCreateAppointment} className="space-y-4">
        <div>
          <label className="block mb-1">Doctor ID:</label>
          <input
            type="text"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? "Creating..." : "Create Appointment"}
        </button>
      </form>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default Appointments;
