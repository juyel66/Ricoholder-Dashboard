import React, { useState, useCallback } from 'react';
import { LucideTableProperties, Upload, Image as LucideImage } from 'lucide-react';
import { MdOutlinePermMedia } from "react-icons/md";


const FileIcon = ({ color }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth={1.5} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="w-6 h-6"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

const StatCard = ({ label, value, icon, iconBgColor, iconTextColor }) => (
  <div className="p-4 md:p-6 w-full max-w-sm bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex-1">
    <div className="flex items-center space-x-4">
      <div className={`flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-lg ${iconBgColor}`}>
        <div className={`text-xl ${iconTextColor}`}>{icon}</div>
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-800 leading-tight">{value}</p>
      </div>
    </div>
  </div>
);

const FileUploadZone = ({ onFilesAccepted }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = React.useRef(null);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    if (e.target.className.includes('upload-container')) setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback((e) => e.preventDefault(), []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragActive(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onFilesAccepted(files);
        setMessage(`Successfully uploaded ${files.length} file(s)!`);
        setTimeout(() => setMessage(''), 3000);
      }
    },
    [onFilesAccepted]
  );

  const handleSelectFileClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFilesAccepted(files);
      setMessage(`Successfully uploaded ${files.length} file(s)!`);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const containerClasses = `
    flex flex-col items-center justify-center 
    p-8 md:p-16 min-h-[280px] bg-white border-2 
    ${isDragActive ? 'border-blue-400 bg-blue-50 shadow-lg' : 'border-gray-200 shadow-md'} 
    border-dashed rounded-xl transition-all duration-300 ease-in-out
    text-center cursor-pointer upload-container
  `;

  return (
    <div
      className={containerClasses}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleSelectFileClick}
    >
      <input 
        type="file" 
        ref={fileInputRef}
        multiple 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />
      <Upload className="w-16 h-16 text-gray-400 mb-4" strokeWidth={1.5} />
      <p className="text-xl font-semibold text-gray-800 mb-1">
        {isDragActive ? 'Drop the files now!' : 'Drag and drop images here'}
      </p>
      <p className="text-gray-500 mb-6">or click to browse</p>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); handleSelectFileClick(); }}
        className="px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
      >
        Select File
      </button>
      {message && (
        <p className="mt-4 text-sm font-medium text-blue-600 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

const MediaLibrary = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFilesAccepted = (files) => {
    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const filesThisMonth = uploadedFiles.length;
  const totalFiles = uploadedFiles.length;

  return (
    <div className='p-4 md:p-8 bg-gray-50 min-h-screen'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 mb-8'>
        <div>
          <h1 className='text-3xl font-semibold'>Media Library</h1>
          <p className='text-gray-500'>Organized content control for all your properties.</p>
        </div>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); alert("Navigating to Create Property page."); }}
          className="mt-4 sm:mt-0 bg-[#009689] text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-colors duration-150 hover:bg-[#007b71]"
        >
          <MdOutlinePermMedia className="h-5 w-5" /> Upload Media
        </a>
      </div>

      <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 mb-8'>
        <StatCard
          label="Total Files"
          value={totalFiles}
          icon={<FileIcon color="currentColor" />}
          iconBgColor="bg-teal-50"
          iconTextColor="text-teal-600"
        />
        <StatCard
          label="This Month"
          value={filesThisMonth}
          icon={<Upload className="w-6 h-6" />}
          iconBgColor="bg-amber-50"
          iconTextColor="text-amber-600"
        />
      </div>

      <div className='mt-8'>
        <FileUploadZone onFilesAccepted={handleFilesAccepted} />
      </div>

      <div className='mt-10'>
        <h2 className='text-2xl font-semibold mb-4 text-gray-700'>Uploaded Files ({uploadedFiles.length})</h2>
        {uploadedFiles.length === 0 ? (
          <p className='text-gray-500 p-4 border rounded-lg bg-white'>No files uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {uploadedFiles.map((item, index) => (
              <div key={index} className="bg-white p-3 border rounded-lg shadow-sm">
                <img
                  src={item.preview}
                  alt={item.file.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <p className="text-xs truncate font-medium">{item.file.name}</p>
                <p className="text-[10px] text-gray-500">{(item.file.size / 1024).toFixed(1)} KB</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;
