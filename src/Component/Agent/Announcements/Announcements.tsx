import React, { useState } from 'react';
import { Clock, Download, ChevronDown, ChevronUp, FileText } from 'lucide-react';

// --- 1. JSON DATA ---
const updateData = [
  {
    id: 1,
    title: 'New Marketing Guidelines Released',
    date: 'October 11, 2025',
    priority: 'high',
    details: 'We have updated our marketing guidelines to reflect the latest brand standards. Please review the attached document for detailed information on approved messaging, logo usage, and social media best practices.',
    attachments: [
      { name: 'Marketing_Guidelines_2025.pdf', size: '2.3 MB', downloadUrl: '#' },
    ],
  },
  {
    id: 2,
    title: 'Q4 Financial Report Available',
    date: 'October 15, 2025',
    priority: 'medium',
    details: 'The official Q4 Financial Report is now available. This document contains key performance indicators, revenue analysis, and projections for the next quarter.',
    attachments: [
      { name: 'Q4_Financial_Report.pdf', size: '5.1 MB', downloadUrl: '#' },
      { name: 'Q4_Summary_Deck.pptx', size: '1.2 MB', downloadUrl: '#' },
    ],
  },
  {
    id: 3,
    title: 'Team Building Retreat Scheduled',
    date: 'October 20, 2025',
    priority: 'low',
    details: 'The annual team building retreat has been scheduled for next month. Details regarding the location, activities, and required RSVPs are available in the attachments section.',
    attachments: [],
  },
  {
    id: 4,
    title: 'New Product Launch Details',
    date: 'October 25, 2025',
    priority: 'high',
    details: 'Finalized details for the upcoming new product launch have been approved. Review the attached files for updated timelines, press kit information, and internal training materials.',
    attachments: [
        { name: 'Launch_Timeline.xlsx', size: '0.8 MB', downloadUrl: '#' },
        { name: 'Press_Release.docx', size: '0.3 MB', downloadUrl: '#' },
        { name: 'Internal_Training.mp4', size: '25.0 MB', downloadUrl: '#' },
    ],
  },
];

// --- 2. COMPONENTS ---

// Helper component for the priority badge styling
const PriorityBadge = ({ priority }) => {
  let bgColor, textColor;
  switch (priority) {
    case 'high':
      bgColor = 'bg-red-100';
      textColor = 'text-red-700';
      break;
    case 'medium':
      bgColor = 'bg-amber-100';
      textColor = 'text-amber-700';
      break;
    case 'low':
    default:
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-700';
      break;
  }
  return (
    <span className={`text-xs font-semibold py-1 px-3 rounded-full ${bgColor} ${textColor} capitalize`}>
      {priority} priority
    </span>
  );
};

// Component for a single downloadable attachment
const AttachmentItem = ({ attachment }) => (
    <div className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-teal-500 transition duration-150">
        <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <div>
                <p className="text-sm font-medium text-gray-800 truncate">{attachment.name}</p>
                <p className="text-xs text-gray-500">{attachment.size}</p>
            </div>
        </div>
        <a 
            href={attachment.downloadUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-sm font-medium text-white bg-teal-500 rounded-lg px-3 py-1.5 hover:bg-teal-600 transition duration-150"
        >
            <Download className="w-4 h-4 mr-1" />
            Download
        </a>
    </div>
);

// Component for a single collapsible update card
const UpdateCard = ({ update }) => {
  const [isOpen, setIsOpen] = useState(update.id === 2); // Q4 is open by default, as per the image
  
  const attachmentCount = update.attachments.length;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-4 transition-all duration-300 overflow-hidden">
      
      {/* Collapsible Header */}
      <div 
        className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-4">
           <img src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760910352/Container_3_l81okq.png" alt="" />
            <span className="text-base font-medium text-gray-800">{update.title}</span>
            <PriorityBadge priority={update.priority} />
            
            {/* Attachment Count Badge */}
            <span className={`text-xs font-medium py-1 px-3 rounded-full ${
                attachmentCount > 0 ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-500'
            } flex-shrink-0`}>
                {attachmentCount > 0 ? `${attachmentCount} attachment${attachmentCount > 1 ? 's' : ''}` : 'no attachments'}
            </span>
        </div>
        
        {/* Date and Toggle Icon */}
        <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 hidden md:block">{update.date}</span>
            {isOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
        </div>
      </div>
      
      {/* Collapsible Body */}
      <div 
        className={`transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ transitionProperty: 'max-height, opacity' }} // Ensure transition works smoothly
      >
        <div className="p-5 pt-0 border-t border-gray-100">
            {/* Description */}
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                {update.details}
            </p>
            
            {/* Attachments Section */}
            {attachmentCount > 0 && (
                <>
                    <h4 className="text-sm font-semibold text-gray-800 mb-3 border-t pt-4">Attachments</h4>
                    <div className="space-y-3">
                        {update.attachments.map((att, index) => (
                            <AttachmentItem key={index} attachment={att} />
                        ))}
                    </div>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

// --- 3. MAIN APPLICATION COMPONENT ---
const Announcements = () => {
    // Current active category for the filter bar
    const [activeCategory, setActiveCategory] = useState('All');
    
    // Simple filter to demonstrate navigation functionality
    const filteredUpdates = updateData; 

    const categories = ['All', 'Branding', 'Templates', 'Legal Forms', 'Training', 'Market Research', 'External Tools'];

    return (
        <div className=" bg-gray-50 font-sans p-4 md:p-8">
            <div className=" mx-auto">
                
                {/* Header Section */}
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Updates</h1>
                    <p className="text-gray-600 text-sm">Stay informed with the latest company updates and announcements</p>
                </header>
                
                {/* Search and Category Filter Bar */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
                    {/* Search Bar */}
             <div className="flex items-center border rounded-lg px-3 py-2 w-full max-w-lg">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5 mr-2" // 👈 gap on left side (space between icon and placeholder)
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35m1.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
    />
  </svg>
  <input
    type="text"
    placeholder="Search Resources..."
    className="outline-none w-full text-sm"
  />
</div>
                    
                    {/* Category Tabs */}
                    <div className="overflow-x-auto ml-5 whitespace-nowrap scrollbar-hide">
                        <div className="inline-flex space-x-2 p-1 bg-white border border-gray-200 rounded-xl shadow-sm">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ${
                                        activeCategory === category
                                            ? 'bg-gray-900 text-white shadow-md'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Updates Listings */}
                <main>
                    {filteredUpdates.map((update) => (
                        <UpdateCard key={update.id} update={update} />
                    ))}
                </main>
                
            </div>
        </div>
    );
};

export default Announcements;
