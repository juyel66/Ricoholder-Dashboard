import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react'; 

// --- Dummy Log Data (JSON) ---
const logData = [
  { timestamp: '2025-10-09 10:15', user: 'Sarah Johnson', action: 'Downloaded property pack', details: 'Luxury Modern Villa with Pool', type: 'download' },
  { timestamp: '2025-10-09 10:15', user: 'Michael Chen', action: 'Edited property', details: 'Downtown Penthouse with City Views', type: 'edit' },
  { timestamp: '2025-10-09 10:15', user: 'Admin Emily', action: 'Published property', details: 'Luxury Modern Villa with Pool', type: 'upload' },
  { timestamp: '2025-10-09 10:15', user: 'Rodriguez Sarah', action: 'Logged in', details: 'Successful login from IP 192.168.1.1', type: 'login' },
  { timestamp: '2025-10-09 10:15', user: 'Johnson', action: 'Shared property link', details: 'Downtown Penthouse with City Views', type: 'share' },
  { timestamp: '2025-10-08 11:30', user: 'Admin Emily', action: 'Deleted user account', details: 'User: John Doe', type: 'delete' },
  { timestamp: '2025-10-08 09:00', user: 'Michael Chen', action: 'Uploaded new photos', details: 'Beachfront House, 5 photos', type: 'upload' },
];

// --- Helper function for Tailwind color ---
const getTypeClasses = (type) => {
  switch (type) {
    case 'download': return 'bg-indigo-900 text-white';
    case 'edit': return 'bg-gray-200 text-gray-800';
    case 'upload': return 'bg-black text-white';
    case 'login': return 'bg-blue-100 text-blue-800';
    case 'share': return 'bg-gray-100 text-gray-600';
    case 'delete': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const logTypes = ['All Types', 'download', 'edit', 'upload', 'login', 'share', 'delete'];

// --- Calculate Summary Data ---
const calculateSummary = (logs) => {
  const counts = logs.reduce((acc, log) => {
    acc[log.type] = (acc[log.type] || 0) + 1;
    return acc;
  }, {});

  // Ensure each value is greater than 2
  const adjust = (num) => (num < 3 ? num + 3 : num);

  return [
    { title: 'Total Events', count: adjust(logs.length) },
    { title: 'Logins', count: adjust(counts.login || 0) },
    { title: 'Downloads', count: adjust(counts.download || 0) },
    { title: 'Edits', count: adjust(counts.edit || 0) },
    { title: 'Shares', count: adjust(counts.share || 0) },
  ];
};

const ActivityLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');

  const filteredLogs = logData.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All Types' || log.type === selectedType;
    return matchesSearch && matchesType;
  });

  const summaryData = calculateSummary(filteredLogs);

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* --- Summary Section --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {summaryData.map((item, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 text-center transition-shadow duration-300 hover:shadow-lg"
          >
            <p className="text-3xl font-bold text-gray-900 mb-1">{item.count}</p>
            <p className="text-gray-500 text-sm">{item.title}</p>
          </div>
        ))}
      </div>

      {/* --- Main Logs Section --- */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold">Activity Logs</h1>
            <p className="text-gray-500">Track all system activities and user actions.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gray-100 border-2 border-gray-300 text-black flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-colors duration-150 cursor-pointer hover:bg-gray-300">
              <img src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1761005671/Icon_43_rivr8o.png" alt="" /> 
              Export Log
            </div>
          </div>
        </div>

        {/* --- Search and Filter --- */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by user or details..."
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <select
              className="appearance-none w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {logTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>


        {/* ---- Table ---- */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.timestamp}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{log.user}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{log.action}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{log.details}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${getTypeClasses(log.type)}`}>
                        {log.type}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No activities found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
