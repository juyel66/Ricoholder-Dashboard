import { PiExportThin } from "react-icons/pi";
import { Eye, Download, Sparkles } from "lucide-react";

// --- Recharts Imports for all Charts ---
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart, // Added for Bar Chart
  Bar,       // Added for Bar Chart
} from 'recharts';

// --- Performance Chart Data ---
const performanceData = [
  { name: 'Apr', downloads: 150, inquiries: 50, views: 850 },
  { name: 'May', downloads: 180, inquiries: 60, views: 900 },
  { name: 'Jun', downloads: 200, inquiries: 70, views: 1100 },
  { name: 'Jul', downloads: 220, inquiries: 80, views: 1200 },
  { name: 'Aug', downloads: 250, inquiries: 90, views: 1350 },
  { name: 'Sep', downloads: 260, inquiries: 100, views: 1450 },
  { name: 'Oct', downloads: 240, inquiries: 95, views: 1250 },
];

// --- Properties Chart Data (JSON) ---
const propertiesData = [
  { name: 'Villa', value: 12, color: '#3B82F6' },
  { name: 'Townhouse', value: 6, color: '#EF4444' },
  { name: 'Condo', value: 15, color: '#F59E0B' },
  { name: 'Estate', value: 6, color: '#8B5CF6' },
  { name: 'Penthouse', value: 8, color: '#10B981' },
];

// --- Agent Performance Chart Data (JSON) ---
const agentPerformanceData = [
  { name: 'Sarah J.', download: 45, properties: 10 },
  { name: 'Michael C.', download: 38, properties: 8 },
  { name: 'Emily R.', download: 42, properties: 9 },
  { name: 'David K.', download: 22, properties: 5 },
  { name: 'Lisa M.', download: 30, properties: 7 },
];

// Custom label function for Donut Chart
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

  // --- Performance Overview Chart Component Logic (Line Chart) ---
  const PerformanceOverviewChart = () => (
    <div className="bg-white border border-re-200 rounded-xl shadow-sm pl-4 pr-4 pt-2  h-full">
      <h2 className="text-xl font-semibold text-gray-800">Performance Overview</h2>
      <p className="text-gray-500 text-sm mb-4">Monthly views, downloads, and inquiries</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={performanceData}
          margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} domain={[0, 1600]} ticks={[0, 400, 800, 1200, 1600]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend wrapperStyle={{ position: 'relative', marginTop: '20px' }} />
          <Line type="monotone" dataKey="downloads" stroke="#10B981" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="inquiries" stroke="#9333EA" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
  // -------------------------------------------------------------------


  // --- Properties by Type Chart Component Logic (Donut Chart) ---
  const PropertiesByTypeChart = () => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-full">
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
  // -------------------------------------------------------------------

  // --- Agent Performance Chart Component Logic (Bar Chart) ---
  const AgentPerformanceChart = () => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm pl-4 pt-4  mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Agent Performance</h2>
        <p className="text-gray-500 text-sm mb-4">Properties assigned and downloads generated</p>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={agentPerformanceData}
                margin={{ top: 5, right: 30, left: -20, bottom: 5 }}
                barCategoryGap="20%" // Space between groups of bars
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={[0, 60]} ticks={[0, 15, 30, 45, 60]} />
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="top" align="center" wrapperStyle={{ position: 'relative', marginTop: '20px' }} />
                
                {/* Green Bar: download */}
                <Bar dataKey="download" fill="#10B981" name="download" radius={[4, 4, 0, 0]} /> 
                
                {/* Blue Bar: properties */}
                <Bar dataKey="properties" fill="#3B82F6" name="properties" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
  // -------------------------------------------------------------------


  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div>
        <div className='flex justify-between items-center mt-5'>
          {/* ... (Header remains the same) */}
          <div>
            <h1 className='text-3xl font-semibold'>Properties</h1>
            <p className='text-gray-500'>Your portfolio, beautifully organized.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gray-300 border-2 border-gray-300 text-black flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-colors duration-150">
              Last 30 days
            </div>
            <div
              className="bg-gray-200 border-2 border-gray-300 text-black flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-colors duration-150"
            >
              <PiExportThin className="h-5 w-5" /> Export
            </div>
          </div>
        </div>

        {/* --- Card Section remains the same --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {/* Total Views */}
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

          {/* Downloads */}
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

          {/* Inquiries */}
          <div className="bg-white border  border-gray-200 rounded-xl shadow-sm p-6 flex justify-between items-center hover:shadow-md transition-shadow duration-300">
            <div>
              <p className="text-gray-500 text-sm font-medium">Inquiries</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-1">456</h2>
              <p className="text-green-600 text-sm font-medium mt-1">+14% vs last period</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Charts Section (Row 1) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6  mt-10">
        {/* Performance Overview Chart (2/3 width) */}
        <div className="lg:col-span-2 ">
            <PerformanceOverviewChart />
        </div>

        {/* Properties by Type Chart (1/3 width) */}
        <div className="lg:col-span-1">
            <PropertiesByTypeChart />
        </div>
      </div>


      {/* --- Agent Performance Section (Row 2) --- */}
      <div className="mt-6">
        {/* Agent Performance code here - Replaced with the component call */}
        <AgentPerformanceChart />
      </div>
    </div>
  );
};

export default Analytics;