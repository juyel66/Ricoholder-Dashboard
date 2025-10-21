import React, { useState } from 'react';
import { PiExportThin } from "react-icons/pi";
import { Eye, Download } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

// --- Performance Chart Data by Date Range ---
const performanceDataSets = {
  "Last 7 Days": [
    { name: 'Mon', downloads: 100, inquiries: 30, views: 20 },
    { name: 'Tue', downloads: 120, inquiries: 35, views: 30 },
    { name: 'Wed', downloads: 130, inquiries: 40, views: 60 },
    { name: 'Thu', downloads: 140, inquiries: 45, views: 70 },
    { name: 'Fri', downloads: 160, inquiries: 50, views: 100 },
    { name: 'Sat', downloads: 180, inquiries: 55, views: 150 },
    { name: 'Sun', downloads: 200, inquiries: 60, views: 200 },
  ],
  "Last 30 Days": [
    { name: 'Apr', downloads: 150, inquiries: 50, views: 250 },
    { name: 'May', downloads: 180, inquiries: 60, views: 300 },
    { name: 'Jun', downloads: 200, inquiries: 70, views: 400 },
    { name: 'Jul', downloads: 220, inquiries: 80, views: 450 },
    { name: 'Aug', downloads: 250, inquiries: 90, views: 650 },
    { name: 'Sep', downloads: 260, inquiries: 100, views: 750 },
    { name: 'Oct', downloads: 240, inquiries: 95, views: 850 },
  ],
  "Last 90 Days": [
    { name: 'Jul', downloads: 400, inquiries: 120, views: 900 },
    { name: 'Aug', downloads: 450, inquiries: 150, views: 1000 },
    { name: 'Sep', downloads: 480, inquiries: 160, views: 1200 },
    { name: 'Oct', downloads: 500, inquiries: 170, views: 1400 },
  ]
};

// --- Properties Chart Data ---
const propertiesData = [
  { name: 'Villa', value: 12, color: '#3B82F6' },
  { name: 'Townhouse', value: 6, color: '#EF4444' },
  { name: 'Condo', value: 15, color: '#F59E0B' },
  { name: 'Estate', value: 6, color: '#8B5CF6' },
  { name: 'Penthouse', value: 8, color: '#10B981' },
];

// --- Agent Performance Data ---
const agentPerformanceData = [
  { name: 'Sarah J.', download: 45, properties: 10 },
  { name: 'Michael C.', download: 38, properties: 8 },
  { name: 'Emily R.', download: 42, properties: 9 },
  { name: 'David K.', download: 22, properties: 5 },
  { name: 'Lisa M.', download: 30, properties: 7 },
];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.5;
  const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.5;
  return (
    <text x={x} y={y} fill={propertiesData[index].color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-sm">
      {`${propertiesData[index].name} (${propertiesData[index].value})`}
    </text>
  );
};

const Analytics = () => {
  const [selectedRange, setSelectedRange] = useState("Last 30 Days");

  const PerformanceOverviewChart = () => (
    <div className="bg-white border border-re-200 rounded-xl shadow-sm pl-4 pr-4 pt-2 h-full">
      <h2 className="text-xl font-semibold text-gray-800">Performance Overview</h2>
      <p className="text-gray-500 text-sm mb-4">Monthly views, downloads, and inquiries</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={performanceDataSets[selectedRange]}
          margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend wrapperStyle={{ position: 'relative', marginTop: '20px' }} />
          <Line type="monotone" dataKey="downloads" stroke="#10B981" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="inquiries" stroke="#9333EA" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const PropertiesByTypeChart = () => (
    <div className="bg-white border lg:mt-0 md:mt-0 mt-10 border-gray-200 rounded-xl shadow-sm p-6 h-full">
      <h2 className="text-xl font-semibold text-gray-800">Properties by Type</h2>
      <p className="text-gray-500 text-sm mb-4">Distribution across categories</p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={propertiesData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {propertiesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  const AgentPerformanceChart = () => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm pl-4 pt-4 mt-6">
      <h2 className="text-xl font-semibold text-gray-800">Agent Performance</h2>
      <p className="text-gray-500 text-sm mb-4">Properties assigned and downloads generated</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={agentPerformanceData}
          margin={{ top: 5, right: 30, left: -20, bottom: 5 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="top" align="center" wrapperStyle={{ position: 'relative', marginTop: '20px' }} />
          <Bar dataKey="download" fill="#10B981" name="download" radius={[4, 4, 0, 0]} />
          <Bar dataKey="properties" fill="#3B82F6" name="properties" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div>
        <div className='flex justify-between items-center mt-5'>
          <div>
            <h1 className='text-3xl font-semibold'>Properties</h1>
            <p className='text-gray-500'>Your portfolio, beautifully organized.</p>
          </div>

          <div className="lg:flex items-center gap-4  relative">
            {/* Dropdown */}
            <div className="bg-gray-100 border-2 border-gray-300 text-black flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-colors duration-150 cursor-pointer relative">
              <select
                value={selectedRange}
                onChange={(e) => setSelectedRange(e.target.value)}
                className="bg-transparent outline-none text-black text-sm cursor-pointer"
              >
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>

            <div
              className="bg-gray-100 lg:mt-0 mt-2 border-2 border-gray-300 text-black flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-colors duration-150"
            >
              <img src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1761005671/Icon_43_rivr8o.png" alt="" /> Export
            </div>
          </div>
        </div>

        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex justify-between items-center hover:shadow-md transition-shadow duration-300">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Views</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-1">8,645</h2>
              <p className="text-green-600 text-sm font-medium mt-1">+23% vs last period</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <Eye className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex justify-between items-center hover:shadow-md transition-shadow duration-300">
            <div>
              <p className="text-gray-500 text-sm font-medium">Downloads</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-1">1,343</h2>
              <p className="text-green-600 text-sm font-medium mt-1">+18% vs last period</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <Download className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex justify-between items-center hover:shadow-md transition-shadow duration-300">
            <div>
              <p className="text-gray-500 text-sm font-medium">Inquiries</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-1">456</h2>
              <p className="text-green-600 text-sm font-medium mt-1">+14% vs last period</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <img src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1761004601/Icon_42_ycz89k.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Charts --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
        <div className="lg:col-span-2">
          <PerformanceOverviewChart />
        </div>
        <div className="lg:col-span-1">
          <PropertiesByTypeChart />
        </div>
      </div>

      <div className="mt-6">
        <AgentPerformanceChart />
      </div>
    </div>
  );
};

export default Analytics;
