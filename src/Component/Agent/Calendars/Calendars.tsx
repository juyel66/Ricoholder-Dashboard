import React from 'react';
import { CalendarDays, Copy, ArrowUpRight } from 'lucide-react';

// --- 1. JSON DATA (6 Items) ---
// This data is structured specifically for the Calendar Viewing page.
const calendarData = [
  {
    id: 1,
    title: 'Luxury Waterfront Villa',
    calendarTitle: 'Luxury Waterfront Villa - Viewing Calendar',
    calendarDescription: 'Schedule viewings for the Luxury Waterfront Villa property',
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80',
    calendarUrl: 'https://calendly.com/eastmond-villas/waterfront-villa',
  },
  {
    id: 2,
    title: 'Modern Downtown Penthouse',
    calendarTitle: 'Modern Downtown Penthouse - Viewing Calendar',
    calendarDescription: 'Schedule viewings for the Modern Downtown Penthouse property',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    calendarUrl: 'https://calendly.com/eastmond-villas/downtown-penthouse',
  },
  {
    id: 3,
    title: 'Stylish City Apartment',
    calendarTitle: 'Stylish City Apartment - Viewing Calendar',
    calendarDescription: 'Schedule viewings for the Stylish City Apartment property',
    imageUrl: 'https://images.unsplash.com/photo-1560448073-4119a5a86f5e?auto=format&fit=crop&w=400&q=80',
    calendarUrl: 'https://calendly.com/eastmond-villas/city-apartment',
  },
  {
    id: 4,
    title: 'Cozy Mountain Retreat',
    calendarTitle: 'Cozy Mountain Retreat - Viewing Calendar',
    calendarDescription: 'Schedule viewings for the Cozy Mountain Retreat property',
    imageUrl: 'https://placehold.co/400x250/EF4444/ffffff?text=RETREAT',
    calendarUrl: 'https://calendly.com/eastmond-villas/mountain-retreat',
  },
  {
    id: 5,
    title: 'Historic Victorian Home',
    calendarTitle: 'Historic Victorian Home - Viewing Calendar',
    calendarDescription: 'Schedule viewings for the Historic Victorian Home property',
    imageUrl: 'https://placehold.co/400x250/6366F1/ffffff?text=HISTORIC',
    calendarUrl: 'https://calendly.com/eastmond-villas/historic-home',
  },
  {
    id: 6,
    title: 'Lakeside Cabin',
    calendarTitle: 'Lakeside Cabin - Viewing Calendar',
    calendarDescription: 'Schedule viewings for the Lakeside Cabin property',
    imageUrl: 'https://images.unsplash.com/photo-1505691723518-22f6e81caa36?auto=format&fit=crop&w=400&q=80',
    calendarUrl: 'https://calendly.com/eastmond-villas/lakeside-cabin',
  },
];


// --- 2. HELPERS ---

// Custom alert/message box function (since alert() is forbidden)
const showActionMessage = (action, title) => {
    // In a real app, this would show a proper notification/toast
    console.log(`${action} button clicked for: ${title}`);
    alert(`${action} link copied to clipboard for ${title}!`);
};

const copyToClipboard = (text, action, title) => {
    // Simple fallback copy function compatible with iframe environment
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showActionMessage(action, title);
};


// --- 3. CALENDAR CARD COMPONENT ---
const CalendarCard = ({ data }) => {
    const { calendarTitle, calendarDescription, imageUrl, calendarUrl, title } = data;

    return (
        <div className="bg-white rounded-xl  border-2 border-gray-300 overflow-hidden flex flex-col">
            
            {/* Header and Badge */}
            <div className="p-5 pb-0">
                <div className="flex justify-between items-start mb-2">
                    <div className='flex items-center space-x-2'>
                        <CalendarDays className="w-5 h-5 text-gray-700" />
                        <h3 className="text-base font-semibold text-gray-900 leading-tight">{calendarTitle}</h3>
                    </div>
                    <span className="text-xs font-semibold py-1 px-3 rounded-full bg-gray-100 text-gray-700 flex-shrink-0">
                        Property
                    </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{calendarDescription}</p>
            </div>

            {/* Image */}
            <div className="flex-shrink-0">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full p-2 h-auto object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x250/D1D5DB/4B5563?text=CALENDAR+IMAGE" }}
                />
            </div>

            {/* Buttons and URL */}
            <div className="p-5 pt-4 flex flex-col flex-grow">
                <div className="flex space-x-3 w-full mb-4">
                    
                    {/* Copy Link Button */}
                    <button
                        className="flex items-center justify-center flex-1 px-4 py-2 text-sm font-medium text-teal-600 bg-white border border-teal-300 rounded-lg hover:bg-teal-50 transition duration-150"
                        onClick={() => copyToClipboard(calendarUrl, 'Copy Calendar Link', calendarTitle)}
                    >
                        <Copy className="w-3 h-3 mr-2" />
                        Copy Link
                    </button>
                    
                    {/* Open Calendar Button */}
                    <a
                        href={calendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex  items-center justify-center flex-1 px-4 py-2 text-sm font-medium text-white bg-teal-500 border border-teal-500 rounded-lg hover:bg-teal-600 transition duration-150 shadow-md"
                    >
                       <img className='mr-2' src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760910125/Icon_26_tmwde2.png" alt="" />
                        Open Calendar
                    </a>
                </div>

                {/* Calendar URL Display */}
                <div className="mt-auto pt-2">
                    <p className="text-xs font-medium text-gray-600 mb-1">Calendar URL</p>
                    <p className="text-sm text-[#0F172A] truncate">{calendarUrl}</p>
                </div>
            </div>
        </div>
    );
};

// --- 4. MAIN APPLICATION COMPONENT ---
const Calendars = () => {
    return (
        <div className=" bg-gray-50 font-sans  ">
            <div className=" mx-auto">
                
                {/* Header Section */}
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Calendars</h1>
                    <p className="text-gray-600 text-sm">Access property viewing calendars and schedule appointments.</p>
                </header>
                
                {/* Calendars Grid */}
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {calendarData.map((data) => (
                        <CalendarCard key={data.id} data={data} />
                    ))}
                </main>
               
                
            </div>
        </div>
    );
};

export default Calendars;
