import React, { useState } from 'react';
import { Search, ChevronRight, ChevronDown } from 'lucide-react';

// --- 1. JSON DATA ---
const faqData = [
  {
    id: 1,
    question: 'How do I schedule a property viewing?',
    answer: 'Property viewings can be scheduled directly through the "Calendars" tab. Find the property you are interested in and use the "Open Calendar" button to select an available time slot with the assigned agent.',
    category: 'Property Viewings',
  },
  {
    id: 2,
    question: 'Can I upload multiple images at once?',
    answer: 'Yes, the "Create/Edit Property" form supports multi-file upload. You can select and upload up to 20 images simultaneously for better workflow efficiency.',
    category: 'Property Management',
  },
  {
    id: 3,
    question: 'How are commissions calculated?',
    answer: 'Commissions are calculated based on the net sale price of the property, minus any third-party fees. The specific commission structure for your agent type is available in the "Commissions" document under the Resources tab.',
    category: 'Commissions',
  },
  {
    id: 4,
    question: 'The calendar link isn\'t syncing. What should I do?',
    answer: 'If your calendar link is not syncing, first check your network connection. If the issue persists, please clear your browser cache and try again. For continuous problems, contact Technical Support.',
    category: 'Technical Support',
  },
  {
    id: 5,
    question: 'How do I download marketing materials for a property?',
    answer: 'Marketing materials, such as high-resolution images and descriptive PDFs, can be downloaded from the "Resources" tab or directly from the property card on the "Rental Properties" dashboard.',
    category: 'Marketing Materials',
  },
  {
    id: 6,
    question: 'Where can I find the latest brand logo files?',
    answer: 'The most up-to-date brand logo files and usage guidelines are located in the "Branding" category on the Resources page.',
    category: 'Marketing Materials',
  },
];

// --- 2. COMPONENTS ---

// Component for a single collapsible FAQ item
const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md mb-4 border border-gray-100 transition-all duration-300">
      
      {/* Question Header */}
      <div 
        className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base font-medium text-gray-800 flex-grow pr-4">{faq.question}</span>
        
        {/* Toggle Icon with border and rounded full */}
        <div className="border border-gray-300 rounded-full p-1 flex items-center justify-center">
          {isOpen ? (
              <ChevronDown className="w-5 h-5 text-gray-600" />
          ) : (
              <ChevronRight className="w-5 h-5 text-gray-600" />
          )}
        </div>
      </div>
      
      {/* Answer Body (Collapsible) */}
      <div 
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ transitionProperty: 'max-height, opacity' }}
      >
        <div className="p-5 pt-0 border-t border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed">
                {faq.answer}
            </p>
        </div>
      </div>
    </div>
  );
};

// --- 3. MAIN APPLICATION COMPONENT ---
const FAQs = () => {
    const [activeCategory, setActiveCategory] = useState('All Categories');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        'All Categories', 
        'Marketing Materials', 
        'Property Viewings', 
        'Property Management', 
        'Commissions', 
        'Technical Support'
    ];
    
    const filteredFAQs = faqData.filter(faq => {
        const categoryMatch = activeCategory === 'All Categories' || faq.category === activeCategory;
        const searchMatch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
    });

    return (
        <div className="font-sans p-4 md:p-8">
            <div className=" mx-auto">
                
                {/* Header Section */}
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Frequently Asked Questions</h1>
                    <p className="text-gray-600 text-sm">Find answers to common questions about the agent portal</p>
                </header>
                
                {/* Search and Category Filter Bar */}
                <div className="flex flex-col mb-8 space-y-4">
                    <div className='flex items-center border-2 p-2 rounded-xl gap-2'>
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Search FAQs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-gray-900 focus:border-gray-900 transition shadow-sm"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    
                        {/* Category Tabs */}
                        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
                            <div className="inline-flex space-x-2 p-1 rounded-xl shadow-sm">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            setActiveCategory(category);
                                            setSearchTerm('');
                                        }}
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
                </div>

                {/* FAQ List */}
                <main>
                    {filteredFAQs.map((faq) => (
                        <FAQItem key={faq.id} faq={faq} />
                    ))}
                    
                    {filteredFAQs.length === 0 && (
                        <p className="col-span-full text-center text-gray-500 py-10">
                            No frequently asked questions found matching your filter and search criteria.
                        </p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default FAQs;
