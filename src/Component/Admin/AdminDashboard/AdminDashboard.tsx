import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  CheckCircleIcon,
  ClockIcon,
  UsersIcon,
  HomeIcon,
  PlusCircle,
  UploadCloud
} from "lucide-react";


const AdminDashboard = () => {
    // --- STATE MANAGEMENT ---
    // 1. State for Recent Properties
    const [showAllProperties, setShowAllProperties] = useState(false);
    const handleViewAllProperties = () => {
        setShowAllProperties(!showAllProperties);
    };

    // 2. State for Recent Activity (NEW)
    const [showAllActivity, setShowAllActivity] = useState(false);
    const handleViewAllActivity = () => {
        setShowAllActivity(!showAllActivity);
    };
    // -------------------------

    // Recent property data
    const propertiesData = [
        { id: 1, image: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760554174/Image_Luxury_Modern_Villa_with_Pool_sdpezo.png", title: "Luxury Modern Villa with Pool", price: "$2,850,000", status: "Published" },
        { id: 2, image: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760554255/Image_Downtown_Penthouse_with_City_Views_gfrhxe.png", title: "Downtown Penthouse with City Views", price: "$1,650,000", status: "Pending Review" },
        { id: 3, image: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760554174/Image_Luxury_Modern_Villa_with_Pool_sdpezo.png", title: "Elegant Suburban Estate", price: "$3,200,000", status: "Draft" },
        { id: 4, image: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760554255/Image_Downtown_Penthouse_with_City_Views_gfrhxe.png", title: "Ocean View Apartment", price: "$850,000", status: "Sold" },
        { id: 5, image: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760554174/Image_Luxury_Modern_Villa_with_Pool_sdpezo.png", title: "Charming Lake House", price: "$1,200,000", status: "Draft" },
        { id: 6, image: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760554255/Image_Downtown_Penthouse_with_City_Views_gfrhxe.png", title: "Spacious Family Home", price: "$950,000", status: "Draft" },
        { id: 7, image: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760554174/Image_Luxury_Modern_Villa_with_Pool_sdpezo.png", title: "Cozy Studio Flat", price: "$450,000", status: "Pending Review" },
    ];



    
    // Recent activity data (I added two more for the "View All" functionality to be meaningful)



    const activityData = [
        { id: 1, type: "Property Published", propertyName: "Casablanca Luxury Villa", agent: "Sarah Johnson", time: "2 hours ago", status: "Live" },
        { id: 2, type: "New Property Added", propertyName: "Sunset Paradise Estate", agent: "Michael Chen", time: "5 hours ago", status: "Pending" },
        { id: 3, type: "Agent Assigned", propertyName: "Marina Bay Residence", agent: "Emma Williams", time: "1 day ago", status: "Updated" },
        { id: 4, type: "Media Updated", propertyName: "Palm Heights Villa", agent: "David Martinez", time: "1 day ago", status: "Updated" },
        { id: 5, type: "Price Changed", propertyName: "Mountain Retreat Cabin", agent: "Alice Smith", time: "1 day ago", status: "Updated" },
        { id: 6, type: "Status Changed", propertyName: "New York Apt", agent: "Bob Brown", time: "2 days ago", status: "Updated" },
        { id: 7, type: "New Comment", propertyName: "Dallas Mansion", agent: "Charlie Davis", time: "2 days ago", status: "Live" },
    ];


    // --- CONDITIONAL DATA SLICING ---
    // 1. Properties: If showAllProperties is true, use all data; otherwise, use only the first 5 items.
    const propertiesToShow = showAllProperties ? propertiesData : propertiesData.slice(0, 5);

    // 2. Activity (NEW): If showAllActivity is true, use all data; otherwise, use only the first 4 items.
    const activityToShow = showAllActivity ? activityData : activityData.slice(0, 4);
    // --------------------------------


    // -----------------------------------------------------------------------------------
    // CONDITIONAL COLOR LOGIC FUNCTIONS (Unchanged, but now correctly defined)
    // -----------------------------------------------------------------------------------

    // Logic for Property Status (Published, Draft, etc.)
    const getPropertyStatusClass = (status) => {
        const normalizedStatus = status.toLowerCase();
        return (
            normalizedStatus === 'published' ? 'bg-green-100 text-green-700' :
            normalizedStatus === 'pending review' ? 'bg-orange-100 text-orange-700' :
            normalizedStatus === 'draft' ? 'bg-gray-200 text-gray-700' :
            normalizedStatus === 'sold' ? 'bg-red-100 text-red-700' :
            'bg-blue-100 text-blue-700'
        );
    };

    // Logic for Activity Status (Live, Pending, Updated, etc.)
    const getActivityStatusClass = (status) => {
        const normalizedStatus = status.toLowerCase();
        return (
            normalizedStatus === 'live' ? 'bg-teal-100 text-teal-700' :
            normalizedStatus === 'pending' ? 'bg-orange-100 text-orange-700' :
            normalizedStatus === 'updated' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-700'
        );
    };
    // -----------------------------------------------------------------------------------


    return (
        <div className="p-4 bg-gray-50 min-h-screen"> 

            {/* --- 1. Action Buttons Section --- */}
            <div className="flex flex-col sm:flex-row gap-4 py-6">
                <Button className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-colors duration-150"> <PlusCircle className="h-5 w-5 text-teal-600" /> Create Property </Button>
                <Button className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-colors duration-150"> <UsersIcon className="h-5 w-5 text-teal-600" /> Add Agent </Button>
                <Button className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-colors duration-150"> <UploadCloud className="h-5 w-5 text-teal-600" /> Bulk Upload </Button>
            </div>



            {/* --- 2. Static Dashboard Cards Section --- */}


            
            <div className="mb-8"> 
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Cards (omitted for brevity) */}
                    <div className="bg-white rounded-lg border-2 border-gray-200 p-5 flex flex-col items-start shadow-sm" style={{ minHeight: '120px' }}> <div className="mb-3"><HomeIcon className="h-6 w-6 text-teal-500" /></div> <div className="text-3xl font-semibold text-gray-800 mb-1">24</div> <div className="text-gray-500 text-sm">Total Properties</div> </div>
                    <div className="bg-white rounded-lg border-2 border-gray-200 p-5 flex flex-col items-start shadow-sm" style={{ minHeight: '120px' }}> <div className="mb-3"><CheckCircleIcon className="h-6 w-6 text-teal-500" /></div> <div className="text-3xl font-semibold text-gray-800 mb-1">18</div> <div className="text-gray-500 text-sm">Active Listings</div> </div>
                    <div className="bg-white rounded-lg border-2 border-gray-200 p-5 flex flex-col items-start shadow-sm" style={{ minHeight: '120px' }}> <div className="mb-3"><ClockIcon className="h-6 w-6 text-orange-500" /></div> <div className="text-3xl font-semibold text-gray-800 mb-1">4</div> <div className="text-gray-500 text-sm">Pending Reviews</div> </div>
                    <div className="bg-white rounded-lg border-2 border-gray-200 p-5 flex flex-col items-start shadow-sm" style={{ minHeight: '120px' }}> <div className="mb-3"><UsersIcon className="h-6 w-6 text-teal-500" /></div> <div className="text-3xl font-semibold text-gray-800 mb-1">8</div> <div className="text-gray-500 text-sm">Active Agents</div> </div>
                </div>
            </div>


            {/* --- 3. Recent Properties & Activity Section --- */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>

                {/* LEFT COLUMN: Recent Properties (Using Properties State) */}
                <div className="bg-white rounded-lg shadow-md p-6"> 
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Recent Properties</h2>
                        
                        {/* Property Button Logic */}
                        {propertiesData.length > 5 && (
                            <Button
                                onClick={handleViewAllProperties} // <-- Updated handler
                                variant="outline"
                                className="text-gray-600 border-gray-400 hover:bg-blue-50"
                            >
                                {showAllProperties ? 'View Less' : 'View All'} 
                            </Button>
                        )}
                    </div>

                    <div className="space-y-4">
                        {/* Map over propertiesToShow */}
                        {propertiesToShow.map((property) => {
                            const statusClass = getPropertyStatusClass(property.status);
                            return (
                                <div
                                    key={property.id}
                                    className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-200"
                                >
                                    <img src={property.image} alt={property.title} className="w-20 h-20 object-cover rounded-md flex-shrink-0"/>
                                    <div className="flex-grow">
                                        <h3 className="text-base font-medium text-gray-800 line-clamp-1">{property.title}</h3>
                                        <p className="text-gray-600 text-sm">{property.price}</p>
                                    </div>
                                    <div className={`px-3 py-1 text-xs font-medium rounded-full ${statusClass}`}>
                                        {property.status}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>




                {/* RIGHT COLUMN: Recent Activity (Using Activity State) */}




                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
                            <p className="text-gray-500 text-sm">Latest updates from your team</p>
                        </div>
                        
                        {/* Activity Button Logic (NEW) */}
                        {activityData.length > 4 && ( // Only show button if there are more than 4 items
                            <Button
                                onClick={handleViewAllActivity} // <-- New handler
                                variant="outline"
                                className="text-gray-600 border-gray-400 hover:bg-blue-50"
                            >
                                {showAllActivity ? 'View Less' : 'View All'} 
                            </Button>
                        )}
                    </div>

                    <div className="space-y-4">
                        {/* Map over activityToShow */}
                        {activityToShow.map((activity) => {
                            const statusClass = getActivityStatusClass(activity.status);
                            const dotColor = 
                                activity.status.toLowerCase() === 'live' ? 'bg-teal-500' :
                                activity.status.toLowerCase() === 'pending' ? 'bg-orange-500' :
                                'bg-blue-500';

                            return (
                                <div
                                    key={activity.id}
                                    className="flex justify-between items-start bg-white p-4 rounded-lg border border-gray-200"
                                >
                                    <div className="flex items-start gap-3 flex-grow">
                                        {/* Status Dot */}
                                        <div className={`w-2.5 h-2.5 rounded-full mt-2 ${dotColor}`}></div>
                                        
                                        {/* Text Content */}
                                        <div>
                                            <h3 className="text-base font-medium text-gray-800">{activity.type}</h3>
                                            <p className="text-gray-700 text-sm font-medium">{activity.propertyName}</p>
                                            <p className="text-gray-500 text-xs">
                                                By {activity.agent} • {activity.time}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Section: Status Badge */}
                                    <div
                                        className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${statusClass}`}
                                    >
                                        {activity.status}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div> {/* End of Recent Properties & Activity Section */}
        </div>
    );
};

export default AdminDashboard;