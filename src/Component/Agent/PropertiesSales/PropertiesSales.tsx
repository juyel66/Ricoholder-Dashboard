import React, { useState, useMemo } from "react";
import { Search, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

// --- TYPE DEFINITIONS ---
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

// --- DEMO PROPERTY DATA ---
const initialProperties: Property[] = [
  {
    id: 5234234234,
    title: "Modern Downtown Penthouse",
    address: "10 Heritage Lane, Boston, MA",
    price: 3100000,
    bedrooms: 6,
    bathrooms: 5,
    pool: 3,
    status: "published",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 23523542342,
    title: "Historic Victorian Home",
    address: "456 Sky Tower, New York, NY",
    price: 2800000,
    bedrooms: 3,
    bathrooms: 4,
    pool: 6,
    status: "published",
    imageUrl:
      "https://images.unsplash.com/photo-1560448073-4119a5a86f5e?auto=format&fit=crop&w=400&q=80",
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
];

// --- PRICE FORMATTER ---
const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};

// --- PROPERTY CARD ---
const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const { title, address, price, bedrooms, bathrooms, pool, status, imageUrl } =
    property;

  const StatusBadge = ({ status }: { status: Property["status"] }) => {
    let bgColor = "bg-gray-100 text-gray-700";
    if (status === "published") bgColor = "bg-green-100 text-green-700";
    else if (status === "draft") bgColor = "bg-yellow-100 text-yellow-700";
    else if (status === "pending") bgColor = "bg-blue-100 text-blue-700";
    return (
      <span className={`text-xs font-semibold py-1 px-3 rounded-full ${bgColor}`}>
        {status}
      </span>
    );
  };

  const copyToClipboard = (text: string, action: string) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert(`${action} copied for ${title}`);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex flex-col md:flex-row gap-5 mb-6 w-full">
      {/* Image */}
      <div className="w-full md:w-56 h-48 md:h-auto flex-shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/400x300/D1D5DB/4B5563?text=NO+IMAGE";
          }}
        />
      </div>

      {/* Details */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-bold text-gray-900 truncate">{title}</h2>
            <StatusBadge status={status} />
          </div>

          {/* Address */}
          <p className="text-sm text-gray-500 flex items-center mb-3">
            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
            {address}
          </p>

          {/* Property Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 text-sm">
            <div>
              <p className="text-gray-500 text-xs uppercase">Price</p>
              <p className="font-semibold text-gray-800">{formatPrice(price)}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase">Bedrooms</p>
              <p className="font-semibold text-gray-800">{bedrooms}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase">Bathrooms</p>
              <p className="font-semibold text-gray-800">{bathrooms}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase">Pool</p>
              <p className="font-semibold text-gray-800">{pool}</p>
            </div>
          </div>
        </div>

        {/* Inline Buttons */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
  <Link
    to="/agent-property-rentals-details"
    className="flex w-full items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
  >
    <img
      src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760915210/Icon_29_mqukty.png"
      alt=""
      className="h-5"
    />
    View Details
  </Link>

  <button
    onClick={() => copyToClipboard("Description copied", "Description")}
    className="flex w-full items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
  >
    <img
      src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760915210/Icon_30_lfzqbf.png"
      alt=""
      className="h-5"
    />
    Copy Description
  </button>

  <button
    onClick={() => copyToClipboard("Calendar link copied", "Calendar Link")}
    className="flex w-full items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
  >
    <img
      src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760915210/Icon_31_evyeki.png"
      alt=""
      className="h-5"
    />
    Copy Calendar Link
  </button>

  <button className="flex w-full items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
    <img
      src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760915210/Icon_32_a4vr39.png"
      alt=""
      className="h-5"
    />
    Download Images
  </button>
</div>

      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const PropertiesSales: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return initialProperties.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.address.toLowerCase().includes(lower)
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Properties - Sales
          </h1>
          <p className="text-gray-600 text-sm">
            Access your assigned rental properties and marketing materials.
          </p>
        </header>

        <div className="relative mb-8">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-base focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertiesSales;
