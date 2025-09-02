import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://appointment-manager-node.onrender.com/api/v1/doctors?page=${page}&limit=10&search=${search}&specialization=${specialization}`
      );

      setDoctors(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch doctors");
      setLoading(false);
    }
  };

  // page change বা search/specialization change হলে fetch
  useEffect(() => {
    fetchDoctors();
  }, [page, search, specialization]);

  // search change হলে page reset
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // reset page
  };

  // specialization change হলে page reset
  const handleSpecializationChange = (e) => {
    setSpecialization(e.target.value);
    setPage(1); // reset page
  };

  if (loading) return <div>Loading doctors...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
        <p>{doctors.length}</p>
      <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search doctors..."
          value={search}
          onChange={handleSearchChange}
          className="border px-3 py-2 rounded flex-1"
        />

        <select
          value={specialization}
          onChange={handleSpecializationChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Specializations</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dentist">Dentist</option>
          <option value="Neurologist">Neurologist</option>
        </select>
      </div>

      {/* Doctor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="p-4 border rounded shadow hover:shadow-lg transition"
          >
            <img
              src={doctor.photo_url || "/default-doctor.png"}
              alt={doctor.name}
              className="w-24 h-24 object-cover rounded-full mb-2"
            />
            <h2 className="font-bold">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.specialization}</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
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
    </div>
  );
};

export default PatientDashboard;
