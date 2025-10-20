import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronLeft, CheckCircle } from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface Property {
  title: string;
  status: string;
  location: string;
  image_url: string;
  main_details: { icon_url: string; value: string }[];
  description: string;
  amenities: string[];
  seo_info: {
    meta_title: string;
    meta_description: string;
    keywords: string[];
  };
  viewing_link: string;
}

// --- MOCK DATA ---
const mockData: { property: Property } = {
  property: {
    title: "Luxury Waterfront Villa",
    status: "published",
    location: "123 Ocean Drive, Miami Beach, FL",
    image_url:
      "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760554174/Image_Luxury_Modern_Villa_with_Pool_sdpezo.png",
    main_details: [
      { icon_url: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760920371/user-fill_1_lnonyj.png", value: "12 Guests" },
      { icon_url: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760920370/Frame_7_trc1r6.png", value: "4 Beds" },
      { icon_url: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760920370/Frame_8_yq0nm0.png", value: "3 Baths" },
      { icon_url: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760920370/Frame_9_y3ta9d.png", value: "2 Pools" },
      { icon_url: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760920561/discount-percent-fill_fc6s5e.png", value: "20% Commission offered to agent" },
      { icon_url: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760920560/exchange-dollar-line_dl1mal.png", value: "US$1,000.00 Damage Deposit" },
      { icon_url: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760920560/shake-hands-fill_i83l66.png", value: "Booking TBC by Owner" },
      { icon_url: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760920559/calendar-fill_husixk.png", value: "100% Calendar accuracy" }
    ],
    description: `Welcome to St. James, Barbados, where within the elegant enclave of Derricks lies the majestic Seaclusion Villa. This gorgeous, colonial style, private luxury villa is situated on Barbados’ platinum coast revealing spectacular panoramic sea views and private beach access to the golden sand and clear waters of Barbados’s finest beach.`,
    amenities: [
      "Open-Air Dining Spot",
      "Chill Lounge Area",
      "Grill Area",
      "Electric Gates for Easy Access",
      "Cozy Enclosed Garden",
      "Fairmont Beach Club Pavilion",
      "Free Parking on Site",
      "24/7 Security",
      "Patio Furniture",
      "Outdoor Cooking Area",
      "Private Balconies for Relaxing",
      "Direct Beach Access"
    ],
    seo_info: {
      meta_title: "Modern Penthouse in Downtown NYC | Luxury Sky Living",
      meta_description: "Exclusive 3-bedroom penthouse with panoramic city views, rooftop terrace, and premium amenities in the heart of Manhattan.",
      keywords: ["penthouse nyc", "luxury apartment", "downtown manhattan", "skyline view"]
    },
    viewing_link: "https://calendly.com/agent/property-viewing-2"
  }
};

// --- HELPER FUNCTIONS ---
const showActionMessage = (message: string) => {
  console.log(message);
  alert(message);
};

const copyToClipboard = (text: string, successMessage: string) => {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  showActionMessage(successMessage);
};

// --- QUICK ACTION BUTTON ---
interface QuickActionButtonProps {
  imgSrc: string;
  label: string;
  onClick?: () => void;
}
const QuickActionButton: FC<QuickActionButtonProps> = ({ imgSrc, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 px-3 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg shadow-sm hover:bg-gray-100 transition duration-150 border border-gray-200 cursor-pointer"
  >
    <img src={imgSrc} alt={label} className="w-5 h-5" />
    <span>{label}</span>
  </button>
);

const PropertiesRentalsDetails: FC = () => {
  const { property } = mockData;
  const [isExpanded, setIsExpanded] = React.useState(false);

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-green-100 text-green-700";
      case "draft":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6 w-10">
          <RouterLink
            to="/properties-rentals"
            className="flex items-center  text-gray-700 hover:text-gray-900 font-medium transition"
          >
            <ChevronLeft className="w-5 h-5 mr-1 text-gray-500" /> Back
          </RouterLink>
        </div>

        {/* Quick Actions */}
        <div className="p-4 bg-white rounded-xl shadow-lg mb-8 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <QuickActionButton imgSrc="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760920016/verified-badge-line_gvbpid.png" label="Amenities" />
            <QuickActionButton imgSrc="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760920016/user-community-line_sxrigx.png" label="Show Staff" />
            <QuickActionButton imgSrc="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760920013/search-eye-line_fbpuvn.png" label="Show Availability" />
            <QuickActionButton imgSrc="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760920066/Icon_33_t3wy08.png" label="Copy Description" onClick={() => copyToClipboard(property.description, 'Property description copied!')} /> 
            <QuickActionButton imgSrc="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760920088/Icon_34_cgp4g7.png" label="Copy Calendar Link" onClick={() => copyToClipboard(property.viewing_link, 'Calendar link copied!')} />
            <QuickActionButton imgSrc="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760920087/Icon_35_dskkg0.png" label="Download Images" />
          </div>
        </div>

        {/* Property Section */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Property</h2>
        <div className="bg-white shadow-xl rounded-xl overflow-hidden p-6 mb-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3 flex-shrink-0">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img
                  src={property.image_url}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/800x600/6b7280/ffffff?text=Image+Unavailable"; }}
                />
              </div>
            </div>
            <div className="lg:w-2/3">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-extrabold text-gray-900">{property.title}</h1>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusStyle(property.status)}`}>
                  {property.status}
                </span>
              </div>
              <p className="flex items-center text-lg text-gray-500 font-medium mb-4">
                 {property.location}
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-gray-700">
                {property.main_details.map((item, index) => (
                  <div key={index} className="flex items-center whitespace-nowrap">
                    <img src={item.icon_url} className="w-4 h-4 mr-2" alt={item.value} />
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
          <div className={`text-gray-700 leading-relaxed transition-all duration-300 ${isExpanded ? 'max-h-full' : 'max-h-[150px] overflow-hidden'}`} style={{ whiteSpace: 'pre-line' }}>
            {property.description}
          </div>
          <button onClick={() => setIsExpanded(!isExpanded)} className="mt-2 text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition">
            {isExpanded ? 'See less...' : 'See more...'}
          </button>
        </div>

        {/* Amenities */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Outdoor Amenities</h2>
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {property.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center text-gray-700 text-base">
                <img src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760921593/Frame_1000004304_lba3o7.png" alt="" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Info */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">SEO & Marketing Information</h2>
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200 space-y-4">
          <div>
            <p className="text-gray-500 text-sm font-medium">Meta Title</p>
            <p className="text-gray-800 font-semibold">{property.seo_info.meta_title}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Meta Description</p>
            <p className="text-gray-700">{property.seo_info.meta_description}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-2">Keywords</p>
            <div className="flex flex-wrap gap-2">
              {property.seo_info.keywords.map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full">{keyword}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Viewing Calendar */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Viewing Calendar</h2>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <p className="text-gray-500 text-sm font-medium">Schedule a Viewing</p>
          <a href={property.viewing_link} target="_blank" rel="noopener noreferrer" className="flex items-center  hover:text-indigo-800 transition break-all cursor-pointer">
            <img src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760915210/Icon_31_evyeki.png" alt="Link Icon" className="w-4 h-4 mr-2" /> 
            {property.viewing_link}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertiesRentalsDetails;
