import React, { useState, useRef } from "react";
import AgentCard from "./AgentCard"; 
import { CgProfile } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";

const agentData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Agent",
    email: "sarah.johnson@realestate.com",
    phone: "+1 (555) 123-4567",
    propertiesCount: 2,
    permissions: "Download",
    status: "active",
    lastLogin: "2025-10-09 09:30",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Manager",
    email: "michael.chen@corp.com",
    phone: "+1 (555) 987-6543",
    propertiesCount: 15,
    permissions: "Full Access",
    status: "active",
    lastLogin: "2025-10-08 11:15",
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Agent",
    email: "emma.davis@corp.com",
    phone: "+1 (555) 543-2198",
    propertiesCount: 9,
    permissions: "Download",
    status: "active",
    lastLogin: "2025-10-07 15:20",
  },
  {
    id: 4,
    name: "Md Juyel Rana",
    role: "Manager",
    email: "daniel.white@corp.com",
    phone: "+1 (555) 654-8723",
    propertiesCount: 12,
    permissions: "Full Access",
    status: "active",
    lastLogin: "2025-10-06 10:05",
  },
];

const App = () => {
  const [agents, setAgents] = useState(agentData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Agent",
    permissions: "Download",
  });

  // Drag state
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [modalPos, setModalPos] = useState({ x: 0, y: 0 });
  const modalRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAgent = {
      id: agents.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role.toLowerCase(),
      permissions: formData.permissions,
      status: "active",
      propertiesCount: 0,
      lastLogin: "-",
    };

    console.log("New Agent Added:", newAgent);

    setAgents([...agents, newAgent]);
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "Agent",
      permissions: "Download",
    });
    setIsModalOpen(false);
  };

  // Drag events
  const handleMouseDown = (e) => {
    const rect = modalRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setModalPos({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="p-6"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="flex justify-between items-center mt-5">
        <div>
          <h1 className="text-3xl font-semibold">Agent</h1> 
          <p className="text-gray-500">Manage agent and manager accounts</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#009689] text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-colors duration-150"
        >
          <CgProfile className="h-5 w-5" /> Add Agent
        </button>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none"
        >
          <div
            ref={modalRef}
            onMouseDown={handleMouseDown}
            className="bg-white border-2 rounded-lg p-6 w-full max-w-md shadow-lg pointer-events-auto relative cursor-grab"
            style={{ left: modalPos.x, top: modalPos.y, position: "absolute" }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <IoMdClose className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold mb-2">Add New Agent</h2>
            <p className="text-gray-500 mb-4 text-sm">
              Create a new account and set permissions.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="block text-gray-700 text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g., John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#009689]"
                required
              />
              <label className="block text-gray-700 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="john.doe@company.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#009689]"
                required
              />
              <label className="block text-gray-700 text-sm font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#009689]"
                required
              />
              <label className="block text-gray-700 text-sm font-medium">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#009689]"
              >
                <option>Agent</option>
                <option>Manager</option> 
              </select>
              <label className="block text-gray-700 text-sm font-medium">Permissions</label>
              <select
                name="permissions"
                value={formData.permissions}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#009689]"
              >
                <option>Download</option>
                <option>View Only</option>
                <option>Full Access</option>
              </select>
              <button
                type="submit"
                className="w-full bg-[#009689] text-white py-2 rounded hover:bg-[#007f73] transition-colors"
              >
                Create Agent
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="mt-10 flex font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
