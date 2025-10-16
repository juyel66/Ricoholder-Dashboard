import React, { useState, useMemo } from 'react';
import { Search, MapPin, Bed, Bath, LayoutDashboard, CalendarDays, Copy, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- 1. DEMO PROPERTY DATA (REALISTIC IMAGES) ---
const initialProperties = [
  {
    id: 1,
    title: 'Luxury Waterfront Villa',
    address: '123 Ocean Drive, Miami Beach, FL',
    price: 4500000,
    bedrooms: 5,
    bathrooms: 6,
    pool: 5,
    status: 'published',
    imageUrl: 'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: 'Modern Downtown Penthouse',
    address: '456 Sky Tower, New York, NY',
    price: 2800000,
    bedrooms: 3,
    bathrooms: 4,
    pool: 6,
    status: 'published',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    title: 'Stylish City Apartment',
    address: '200 Urban Street, Seattle, WA',
    price: 850000,
    bedrooms: 3,
    bathrooms: 5,
    pool: 2,
    status: 'published',
    imageUrl: 'https://images.unsplash.com/photo-1560448073-4119a5a86f5e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    title: 'Cozy Mountain Retreat',
    address: '789 Pine Peak Rd, Denver, CO',
    price: 1200000,
    bedrooms: 4,
    bathrooms: 3,
    pool: 0,
    status: 'draft',
    imageUrl: 'https://images.unsplash.com/photo-1505691723518-22f6e81caa36?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    title: 'Historic Victorian Home',
    address: '10 Heritage Lane, Boston, MA',
    price: 3100000,
    bedrooms: 6,
    bathrooms: 5,
    pool: 1,
    status: 'pending',
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80',
  },
];

// --- 2. FORMATTING HELPERS ---
const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// --- 3. PROPERTY CARD ---
const PropertyCard = ({ property }) => {
  const { title, address, price, bedrooms, bathrooms, pool, status, imageUrl } = property;

  const StatusBadge = ({ status }) => {
    let bgColor = 'bg-gray-100 text-gray-700';
    if (status === 'published') bgColor = 'bg-green-100 text-green-700';
    else if (status === 'draft') bgColor = 'bg-yellow-100 text-yellow-700';
    else if (status === 'pending') bgColor = 'bg-blue-100 text-blue-700';
    return (
      <span className={`text-xs font-semibold py-1 px-3 rounded-full ${bgColor}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const showActionMessage = (action) => {
    console.log(`${action} button clicked for: ${title}`);
    alert(`${action} link copied to clipboard for ${title}!`);
  };

  const copyToClipboard = (text, action) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showActionMessage(action);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-4 mb-6 w-full">
      
      {/* Image */}
      <div className="flex-shrink-0 w-full md:w-56 h-full">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/D1D5DB/4B5563?text=NO+IMAGE" }}
        />
      </div>
      
      {/* Details */}
      <div className="flex-grow min-w-0 flex flex-col justify-between">
        
        {/* Title and Status */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-900 truncate">{title}</h2>
          <StatusBadge status={status} />
        </div>
        
        {/* Address */}
        <p className="text-sm text-gray-500 flex items-center mb-4">
          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
          {address}
        </p>





        {/* Specs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2 mb-4 text-sm">

          <div className='flex items-center space-x-2'>
            
            <Bed className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-gray-500 hidden lg:block">Price</p>
              <p className="font-semibold text-gray-800">{formatPrice(price)}</p>
            </div>
          </div>



          <div className='flex items-center space-x-2'>
            
            <Bed className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-gray-500 hidden lg:block">Bedrooms</p>
              <p className="font-semibold text-gray-800">{bedrooms}</p>
            </div>
          </div>


          <div className='flex items-center space-x-2'>
            <Bath className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-gray-500 hidden lg:block">Bathrooms</p>
              <p className="font-semibold text-gray-800">{bathrooms}</p>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <LayoutDashboard className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-gray-500 hidden lg:block">Pools/Amenities</p>
              <p className="font-semibold text-gray-800">{pool}</p>
            </div>
          </div>
        </div>

        {/* Actions */}

        <div className="flex items-center justify-center flex-wrap lg:gap-10 mt-4 pt-4 border-t border-gray-100">
          <Link to="/property-rentals-update" className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition duration-150">
            <Search className="w-4 h-4 mr-2" />
            View Details
          </Link>
          <button 
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150"
            onClick={() => copyToClipboard(`Description for ${title}: [Placeholder text for copying]`, 'Copy Description')}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Description
          </button>
          <button 
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150"
            onClick={() => copyToClipboard(`Calendar link for ${title}`, 'Copy Calendar Link')}
          >
            <CalendarDays className="w-4 h-4 mr-2" />
            Copy Calendar Link
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150">
            <Download className="w-4 h-4 mr-2" />
            Download Images
          </button>
        </div>



      </div>
    </div>
  );
};

// --- 4. MAIN APP ---
const PropertiesRentals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProperties = useMemo(() => {
    if (!searchTerm) return initialProperties;
    const lower = searchTerm.toLowerCase();
    return initialProperties.filter(
      (p) => p.title.toLowerCase().includes(lower) || p.address.toLowerCase().includes(lower)
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen  font-sans p-4 md:p-8">
      <div className="mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Rental Properties</h1>
          <p className="text-gray-600 text-sm">Access your assigned rental properties and marketing materials.</p>
        </header>

        <div className="relative mb-8 border border-gray-50 rounded-xl bg-white">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-base focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <main>
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => <PropertyCard key={property.id} property={property} />)
          ) : (
            <div className="text-center  bg-white rounded-xl border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-700">No Properties Found</h2>
              <p className="text-gray-500 mt-2">
                Try searching for a different name or location, or{' '}
                <span className="font-medium text-blue-600 cursor-pointer hover:underline" onClick={() => setSearchTerm('')}>
                  clear the search
                </span>.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PropertiesRentals;
