import React, { useState } from 'react';
import { Download, FileText, Search } from 'lucide-react';

// --- 1. JSON DATA ---
const resourceData = [
  {
    id: 1,
    fileType: 'document',
    title: 'Brand Guidelines 2025',
    description: 'Complete brand identity guidelines including logo usage, color palette, typography, and marketing templates.',
    category: 'Templates',
    downloadUrl: '#',
  },
  {
    id: 2,
    fileType: 'document',
    title: 'Client Onboarding Form V3',
    description: 'Official client onboarding and agreement form for new property management contracts.',
    category: 'Legal Forms',
    downloadUrl: '#',
  },
  {
    id: 3,
    fileType: 'document',
    title: 'Q1 Market Research Summary',
    description: 'Detailed summary of the Q1 real estate market trends and competitive analysis.',
    category: 'Market Research',
    downloadUrl: '#',
  },
  {
    id: 4,
    fileType: 'document',
    title: 'Advanced CRM Training Manual',
    description: 'Step-by-step manual for advanced features and automation within the CRM system.',
    category: 'Training',
    downloadUrl: '#',
  },
  {
    id: 5,
    fileType: 'document',
    title: 'Website Asset Pack',
    description: 'High-resolution images, videos, and branding elements for external website use.',
    category: 'Legal Forms',
    downloadUrl: '#',
  },
  {
    id: 6,
    fileType: 'document',
    title: 'External Listing Platform APIs',
    description: 'Technical documentation for integrating with external property listing platforms.',
    category: 'External Tools',
    downloadUrl: '#',
  },
    {
    id: 7,
    fileType: 'document',
    title: 'External Listing Platform APIs',
    description: 'Technical documentation for integrating with external property listing platforms.',
    category: 'Legal Forms',
    downloadUrl: '#',
  },
];

// --- 2. COMPONENTS ---

// Component for a single resource card
const ResourceCard = ({ resource }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 flex flex-col hover:shadow-xl transition duration-300">
            
            {/* Icon and File Type Badge */}
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs  font-medium py-1 px-3 rounded-full bg-gray-100 text-gray-700">
                    {resource.fileType}
                </span>
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">{resource.title}</h3>
            <p className="text-sm text-gray-600 flex-grow mb-4">
                {resource.description}
            </p>

            {/* Category Tag */}
            <div className="flex  justify-between items-center mb-5 border-t pt-4">
                <p className="text-xs text-gray-500 font-medium uppercase">Category</p>
                <span className="text-sm font-medium text-gray-800">{resource.category}</span>
            </div>

            {/* Download Button */}
            <a 
                href={resource.downloadUrl}
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition duration-150 shadow-md"
                onClick={() => console.log(`Downloading ${resource.title}`)}
            >
                <Download className="w-4 h-4 mr-2" />
                Download Files
            </a>
        </div>
    );
};

// --- 3. MAIN APPLICATION COMPONENT ---
const Resources = () => {
    // Current active category for the filter bar
    const [activeCategory, setActiveCategory] = useState('All');
    
    // State for search input
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['All', 'Branding', 'Templates', 'Legal Forms', 'Training', 'Market Research', 'External Tools'];
    
    // Filtering logic
    const filteredResources = resourceData.filter(resource => {
        // 1. Filter by category
        const categoryMatch = activeCategory === 'All' || resource.category === activeCategory;
        
        // 2. Filter by search term
        const searchMatch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            resource.description.toLowerCase().includes(searchTerm.toLowerCase());
                            
        return categoryMatch && searchMatch;
    });


    return (
        <div className=" bg-gray-50 font-sans p-4 md:p-8">
            <div className=" mx-auto">
                
                {/* Header Section */}
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Resources</h1>
                    <p className="text-gray-600 text-sm">Access marketing materials, templates, and training resources</p>
                </header>
                
                {/* Search and Category Filter Bar */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
                    
                    {/* Search Bar */}
                    <div className="relative mr-5 flex-grow lg:w-1/3">
                        <input
                            type="text"
                            placeholder="Search Resources..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500 transition shadow-sm"
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    
                    {/* Category Tabs */}
                    <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <div className="inline-flex space-x-2 p-1 bg-white border border-gray-200 rounded-xl shadow-sm">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setActiveCategory(category);
                                        setSearchTerm(''); // Clear search when category changes
                                    }}
                                    className={`px-4 py-2 text-sm font-medium rounded-xl transition duration-200 ${
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

                {/* Resources Grid */}
                <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                    ))}
                    
                    {filteredResources.length === 0 && (
                        <p className="col-span-full text-center text-gray-500 py-10">
                            No resources found matching your filter and search criteria.
                        </p>
                    )}
                </main>
                
            </div>
        </div>
    );
};

export default Resources;
