import React, { useState, useMemo } from "react";
import {
  Search,
  MapPin, // Keeping MapPin for Address for better readability, as it's not an action button
  LayoutDashboard,
  CalendarDays,
  Copy,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";

// --- 0. TYPE DEFINITIONS ---
interface Property {
  id: number;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  pool: number;
  status: "published" | "draft" | "pending";
  imageUrl: string;
}

// --- 1. DEMO PROPERTY DATA (REALISTIC IMAGES) ---
const initialProperties: Property[] = [
  {
    id: 5234234234,
    title: "Historic Victorian Home",
    address: "10 Heritage Lane, Boston, MA",
    price: 3100000,
    bedrooms: 6,
    bathrooms: 5,
    pool: 3,
    status: "pending",
    imageUrl:
      "https://images.unsplash.com/photo-1560448073-4119a5a86f5e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 23523542342,
    title: "Modern Downtown Penthouse",
    address: "456 Sky Tower, New York, NY",
    price: 2800000,
    bedrooms: 3,
    bathrooms: 4,
    pool: 6,
    status: "published",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3234234234,
    title: "Stylish City Apartment",
    address: "200 Urban Street, Seattle, WA",
    price: 850000,
    bedrooms: 3,
    bathrooms: 5,
    pool: 2,
    status: "published",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154512-441fea2b5c0f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 345345,
    title: "Luxury Waterfront Villa",
    address: "123 Ocean Drive, Miami Beach, FL",
    price: 4500000,
    bedrooms: 5,
    bathrooms: 6,
    pool: 5,
    status: "published",
    imageUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4234234234,
    title: "Cozy Mountain Retreat",
    address: "789 Pine Peak Rd, Denver, CO",
    price: 1200000,
    bedrooms: 4,
    bathrooms: 3,
    pool: 4,
    status: "draft",
    imageUrl:
      "https://images.unsplash.com/photo-1505691723518-22f6e81caa36?auto=format&fit=crop&w=400&q=80",
  },
];

// --- 2. FORMATTING HELPERS ---
const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

interface PropertyCardProps {
  property: Property;
}

interface StatusBadgeProps {
  status: Property["status"];
}

// --- 3. PROPERTY CARD ---
const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { title, address, price, bedrooms, bathrooms, pool, status, imageUrl } =
    property;

  const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    let bgColor = "bg-gray-100 text-gray-700";
    if (status === "published") bgColor = "bg-green-100 text-green-700";
    else if (status === "draft") bgColor = "bg-yellow-100 text-yellow-700";
    else if (status === "pending") bgColor = "bg-blue-100 text-blue-700";
    return (
      <span
        className={`text-xs font-semibold py-1 px-3 rounded-full ${bgColor}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const showActionMessage = (action: string) => {
    console.log(`${action} button clicked for: ${title}`);
    alert(`${action} link copied to clipboard for ${title}!`);
  };

  const copyToClipboard = (text: string, action: string) => {
    // This is the implementation for copying to clipboard
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    showActionMessage(action);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-4 mb-6 w-full">
      {/* Image */}
      <div className="flex-shrink-0 w-full md:w-56 h-auto md:h-full">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 md:h-full object-cover rounded-xl" // Added h-48 for mobile height
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src =
              "https://placehold.co/400x300/D1D5DB/4B5563?text=NO+IMAGE";
          }}
        />
      </div>

      {/* Details */}
      <div className="flex-grow min-w-0 flex flex-col justify-between">
        {/* Title and Status */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-900 truncate pr-4">{title}</h2>
          <StatusBadge status={status} />
        </div>

        {/* Address */}
        <p className="text-sm text-gray-500 flex items-center mb-4">
          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
          {address}
        </p>

        {/* Specs - REMOVED ICONS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2 mb-4 text-sm">
          {/* Price */}
          <div className="flex flex-col">
              <p className="text-gray-500 hidden lg:block">Price</p>
              <p className="font-semibold text-gray-800">USD{formatPrice(price)}</p>
          </div>

          {/* Bedrooms */}
          <div className="flex flex-col">
              <p className="text-gray-500 hidden lg:block">Bedrooms</p>
              <p className="font-semibold text-gray-800">{bedrooms}</p>
          </div>

          {/* Bathrooms */}
          <div className="flex flex-col">
              <p className="text-gray-500 hidden lg:block">Bathrooms</p>
              <p className="font-semibold text-gray-800">{bathrooms}</p>
          </div>

          {/* Pools / Amenities */}
          <div className="flex flex-col">
              <p className="text-gray-500 hidden lg:block">Pools</p>
              <p className="font-semibold text-gray-800">{pool}</p>
          </div>
        </div>

        {/* Actions - REMOVED ICONS AND ADJUSTED FOR FULL-WIDTH BUTTONS ON MOBILE */}
       <div className="flex items-center flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
  {/* View Details */}
  <Link
    to="/property-rentals-details"
    className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150"
  >
    <img
      src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760915210/Icon_29_mqukty.png"
      alt=""
      className="w-5 h-5"
    />
    View Details
  </Link>

  {/* Copy Description */}
  <button
    className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150"
    onClick={() =>
      copyToClipboard(
        `Description for ${title}: [Placeholder text for copying]`,
        "Copy Description"
      )
    }
  >
    <img
      src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760915210/Icon_30_lfzqbf.png"
      alt=""
      className="w-5 h-5"
    />
    Copy Description
  </button>

  {/* Copy Calendar Link */}
  <button
    className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150"
    onClick={() =>
      copyToClipboard(`Calendar link for ${title}`, "Copy Calendar Link")
    }
  >
    <img
      src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760915210/Icon_31_evyeki.png"
      alt=""
      className="w-5 h-5"
    />
    Copy Calendar Link
  </button>

  {/* Download Images */}
  <button className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150">
    <img
      src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760915210/Icon_32_a4vr39.png"
      alt=""
      className="w-5 h-5"
    />
    Download Images
  </button>
</div>

      </div>
    </div>
  );
};

// --- 4. MAIN APP ---
const PropertiesRentals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Search icon kept here as it's part of the global search input, not the property card
  const SearchIcon = Search; 

  const filteredProperties = useMemo(() => {
    if (!searchTerm) return initialProperties;
    const lower = searchTerm.toLowerCase();
    return initialProperties.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.address.toLowerCase().includes(lower)
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen font-sans p-4 md:p-8 bg-gray-50"> {/* Added background color for better separation */}
      <div className="mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Properties-Rentals
          </h1>
          <p className="text-gray-600 text-sm">
            Access your assigned rental properties and marketing materials.
          </p>
        </header>

        <div className="relative mb-8 border border-gray-50 rounded-xl bg-white">
          <SearchIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
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
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="text-center p-8 bg-white rounded-xl border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-700">
                No Properties Found
              </h2>
              <p className="text-gray-500 mt-2">
                Try searching for a different name or location, or{" "}
                <span
                  className="font-medium text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setSearchTerm("")}
                >
                  clear the search
                </span>
                .
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PropertiesRentals;