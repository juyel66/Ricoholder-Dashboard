"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "@/Component/Auth/AuthFuction";

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Appointment states
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [date, setDate] = useState("");
  const [booking, setBooking] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://appointment-manager-node.onrender.com/api/v1/doctors?page=${page}&limit=10&search=${search}&specialization=${specialization}`
      );
      console.log("🩺 Doctors fetched:", response.data.data);

      setDoctors(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch doctors");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [page, search, specialization]);

  // search change হলে page reset
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // specialization change হলে page reset
  const handleSpecializationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSpecialization(e.target.value);
    setPage(1);
  };

  // Appointment booking
  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentUser = getCurrentUser();
    if (!currentUser) {
      setMessage("⚠️ User not logged in");
      return;
    }

    if (!selectedDoctor) {
      setMessage("⚠️ No doctor selected");
      return;
    }

    try {
      setBooking(true);

     
      const payload = {
        doctorId: selectedDoctor._id || selectedDoctor.id, 
        date,
      };

      console.log(" Sending payload:", payload);

      const res = await axios.post(
        "https://appointment-manager-node.onrender.com/api/v1/appointments",
        payload,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      console.log(" API Response:", res.data);

      if (res.data.success) {
        alert(" Appointment booked successful");
        setMessage("Appointment Book successfully!");
        
        setDate("");
        (document.getElementById("appointment_modal") as HTMLDialogElement).close();
        
      } else {
        setMessage(res.data.message || "Something went wrong!");
      }
      setBooking(false);
    } catch (err: any) {
      console.error(" API Error:", err.response?.data);
      setMessage(err.response?.data?.message || "Failed to create appointment");
      setBooking(false);
    }
  };

  if (loading) return <div>Loading doctors...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>

      {/* Search & Filter */}
      <div className="lg:flex text-white gap-4 mb-4 w-40 items-center">
        <input
          type="text"
          placeholder="Search doctors..."
          value={search}
          onChange={handleSearchChange}
          className="border px-3   py-2 rounded flex-1"
        />

        <select
          value={specialization}
          onChange={handleSpecializationChange}
          className="border  mt-2 px-3 py-2 rounded"
        >
          <option value="" className="text-white">All Specializations</option>
          <option value="Cardiologist" className="text-black">Cardiologist</option>
          <option value="Dentist" className="text-black">Dentist</option>
          <option value="Neurologist" className="text-black">Neurologist</option>
        </select>
      </div>

      {/* Doctor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <div
            key={doctor._id || doctor.id}
            className="p-4 border rounded shadow hover:shadow-lg transition"
          >
            <img
              src={doctor.photo_url || "/default-doctor.png"}
              alt=""
              className="w-24 border-2 h-24 object-cover rounded-full mb-2"
            />
            <h2 className="font-bold">{doctor.name}</h2>
            <p className="text-white">{doctor.specialization}</p>

            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => {
                console.log("🩺 Selected doctor:", doctor);
                setSelectedDoctor(doctor);
                (document.getElementById("appointment_modal") as HTMLDialogElement).showModal();
              }}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
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

      {/* Modal */}
      <dialog id="appointment_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {selectedDoctor && (
            <>
              <h3 className="font-bold text-lg text-gray-700 mb-4">
                Book Appointment with {selectedDoctor.name}
              </h3>
              <form  onSubmit={handleBookAppointment} className="space-y-4">
                <div>
                  <label className="block mb-1 text-gray-700 ">Date:</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-black border rounded px-3 py-2"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={booking}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded"
                >
                  {booking ? "Booking..." : "Confirm Appointment"}
                </button>
              </form>
            </>
          )}
        </div>
      </dialog>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default PatientDashboard;
