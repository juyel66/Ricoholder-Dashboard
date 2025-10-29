import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  CheckCircleIcon,
  ClockIcon,
  UsersIcon,
  PlusCircle,
  UploadCloud
} from "lucide-react";

const AdminDashboard = () => {
    // --- STATE MANAGEMENT ---
    const [showAllProperties, setShowAllProperties] = useState(false);
    const handleViewAllProperties = () => setShowAllProperties(!showAllProperties);

    const [showAllActivity, setShowAllActivity] = useState(false);
    const handleViewAllActivity = () => setShowAllActivity(!showAllActivity);

    // --- DATA ---
    const propertiesData = [
        { id: 1, image: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760554174/Image_Luxury_Modern_Villa_with_Pool_sdpezo.png", title: "Luxury Modern Villa with Pool", price: "$2,850,000", status: "Published" },
        { id: 2, image: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760554255/Image_Downtown_Penthouse_with_City_Views_gfrhxe.png", title: "Downtown Penthouse with City Views", price: "$1,650,000", status: "Pending Review" },
        { id: 3, image: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760554174/Image_Luxury_Modern_Villa_with_Pool_sdpezo.png", title: "Elegant Suburban Estate", price: "$3,200,000", status: "Draft" },
        { id: 4, image: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760554255/Image_Downtown_Penthouse_with_City_Views_gfrhxe.png", title: "Ocean View Apartment", price: "$850,000", status: "Published" },
        { id: 5, image: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760554174/Image_Luxury_Modern_Villa_with_Pool_sdpezo.png", title: "Charming Lake House", price: "$1,200,000", status: "Draft" },
        { id: 6, image: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760554255/Image_Downtown_Penthouse_with_City_Views_gfrhxe.png", title: "Spacious Family Home", price: "$950,000", status: "Draft" },
        { id: 7, image: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760554174/Image_Luxury_Modern_Villa_with_Pool_sdpezo.png", title: "Cozy Studio Flat", price: "$450,000", status: "Pending Review" },
    ];

    const activityData = [
        { id: 1, type: "Property Published", propertyName: "Casablanca Luxury Villa", agent: "Sarah Johnson", time: "2 hours ago", status: "Live" },
        { id: 2, type: "New Property Added", propertyName: "Sunset Paradise Estate", agent: "Michael Chen", time: "5 hours ago", status: "Pending" },
        { id: 3, type: "Agent Assigned", propertyName: "Marina Bay Residence", agent: "Emma Williams", time: "1 day ago", status: "Updated" },
        { id: 4, type: "Media Updated", propertyName: "Palm Heights Villa", agent: "David Martinez", time: "1 day ago", status: "Updated" },
        { id: 5, type: "Price Changed", propertyName: "Mountain Retreat Cabin", agent: "Alice Smith", time: "1 day ago", status: "Updated" },
        { id: 6, type: "Status Changed", propertyName: "New York Apt", agent: "Bob Brown", time: "2 days ago", status: "Updated" },
        { id: 7, type: "New Comment", propertyName: "Dallas Mansion", agent: "Charlie Davis", time: "2 days ago", status: "Live" },
    ];

    const propertiesToShow = showAllProperties ? propertiesData : propertiesData.slice(0, 5);
    const activityToShow = showAllActivity ? activityData : activityData.slice(0, 4);

    // --- STATUS BADGE CLASSES (border only, text color unchanged) ---
    const getPropertyStatusClass = (status) => {
        const normalizedStatus = status.toLowerCase();
        return (
            normalizedStatus === 'published' ? 'border bg-green-50 text-green-600 border-green-500' :
            normalizedStatus === 'pending review' ? 'border bg-orange-50  text-orange-600 border-orange-500' :
            normalizedStatus === 'draft' ? 'border border-gray-400' :
            normalizedStatus === 'sold' ? 'border border-red-500' :
            'border border-blue-500'
        );
    };

    const getActivityStatusClass = (status) => {
        const normalizedStatus = status.toLowerCase();
        return (
            normalizedStatus === 'live' ? 'border bg-teal-50 text-teal-600 border-teal-500' :
            normalizedStatus === 'pending' ? 'border bg-orange-50 text-orange-600 border-orange-500' :
            normalizedStatus === 'updated' ? 'border bg-blue-50 text-blue-600 border-blue-500' :
            'border border-gray-400'
        );
    };

    return (
        <div className="">

            {/* --- Action Buttons --- */}
            <div className="flex flex-col sm:flex-row gap-4 py-6">
                <Button className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-colors duration-150">
                    <img className='' src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760922664/Icon_36_ptz5ii.png" alt="" /> Create Property
                </Button>
                <Button className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-colors duration-150">
                    <img src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760922664/Icon_38_h9ps9e.png" alt="" />  Add Agent
                </Button>
                <Button className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-colors duration-150">
                   <img src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760922664/Icon_37_ajwrle.png" alt="" /> Bulk Upload
                </Button>
            </div>

            {/* --- Dashboard Cards --- */}
            <div className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg border-2 border-gray-200 p-5 flex flex-col items-start shadow-sm" style={{ minHeight: '120px' }}>
                        <div className="mb-3"><img className=" bg-[#00968915] p-3 rounded-lg " src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760834371/Icon_4_vocxhj.png" alt="" /> </div>
                        <div className="text-3xl font-semibold text-gray-800 mb-1">24</div>
                        <div className="text-gray-500 text-sm">Total Properties</div>
                    </div>
                    <div className="bg-white rounded-lg border-2 border-gray-200 p-5 flex flex-col items-start shadow-sm" style={{ minHeight: '120px' }}>
                        <div className="mb-3"><img className='bg-[#00968915]  rounded-lg' src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760997613/DashboardView_1_hspyww.png" alt="" /></div>
                        <div className="text-3xl font-semibold text-gray-800 mb-1">18</div>
                        <div className="text-gray-500 text-sm">Active Listings</div>
                    </div>
                    <div className="bg-white rounded-lg border-2 border-gray-200 p-5 flex flex-col items-start shadow-sm" style={{ minHeight: '120px' }}>
                        <div className="mb-3"><img className='bg-[#00968915]  rounded-lg' src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760997613/DashboardView_2_j5n7q7.png" alt="" /></div>
                        <div className="text-3xl font-semibold text-gray-800 mb-1">4</div>
                        <div className="text-gray-500 text-sm">Pending Reviews</div>
                    </div>
                    <div className="bg-white rounded-lg border-2 border-gray-200 p-5 flex flex-col items-start shadow-sm" style={{ minHeight: '120px' }}>
                        <div className="mb-3"><img className='bg-[#00968915] rounded-lg' src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760997599/DashboardView_3_pfflqc.png" alt="" /></div>
                        <div className="text-3xl font-semibold text-gray-800 mb-1">8</div>
                        <div className="text-gray-500 text-sm">Active Agents</div>
                    </div>
                </div>
            </div>
 
            {/* --- Recent Properties & Activity --- */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>

                {/* Recent Properties */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Recent Properties</h2>
                        {propertiesData.length > 5 && (
                            <Button onClick={handleViewAllProperties} variant="outline" className="text-gray-600 border-gray-400 hover:bg-blue-50">
                                {showAllProperties ? 'View Less' : 'View All'}
                            </Button>
                        )}
                    </div>
                    <div className="space-y-4">
                        {propertiesToShow.map((property) => (
                            <div key={property.id} className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-200">
                                <img src={property.image} alt={property.title} className="w-20 h-20 object-cover rounded-md flex-shrink-0"/>
                                <div className="flex-grow">
                                    <h3 className="text-base font-medium text-gray-800 line-clamp-1">{property.title}</h3>
                                    <p className="text-gray-600 text-sm">{property.price}</p>
                                </div>
                                <div className={`px-3 py-1 text-xs font-medium rounded-full  ${getPropertyStatusClass(property.status)}`}>
                                    {property.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
                            <p className="text-gray-500 text-sm">Latest updates from your team</p>
                        </div>
                        {activityData.length > 4 && (
                            <Button onClick={handleViewAllActivity} variant="outline" className="text-gray-600 border-gray-400 hover:bg-blue-50">
                                {showAllActivity ? 'View Less' : 'View All'}
                            </Button>
                        )}
                    </div>
                    <div className="space-y-4">
                        {activityToShow.map((activity) => (
                            <div key={activity.id} className="flex justify-between items-start bg-white p-4 rounded-lg border border-gray-200">
                                <div className="flex items-start gap-3 flex-grow">
                                    <div className={`w-2.5 h-2.5 rounded-full mt-2 ${activity.status.toLowerCase() === 'live' ? 'bg-teal-500' : activity.status.toLowerCase() === 'pending' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                                    <div>
                                        <h3 className="text-base font-medium text-gray-800">{activity.type}</h3>
                                        <p className="text-gray-700 text-sm font-medium">{activity.propertyName}</p>
                                        <p className="text-gray-500 text-xs">By {activity.agent} • {activity.time}</p>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getActivityStatusClass(activity.status)}`}>
                                    {activity.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
