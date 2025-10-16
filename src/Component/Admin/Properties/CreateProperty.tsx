import React, { useState } from 'react';
import { User, UploadCloud, X, Save, Plus, ChevronDown, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreateProperty = () => {
    const [formData, setFormData] = useState({
        title: 'Luxury Modern Villa with Pool',
        description: '',
        price: 500000,
        propertyType: '',
        bedrooms: 3,
        bathrooms: 4,
        pool: 1,
        address: '123 Ocean Drive',
        city: 'Miami',
        seoTitle: '',
        seoDescription: '',
        status: 'Draft',
        image: {
            url: 'https://placehold.co/120x80/2563EB/FFFFFF?text=Property',
            isPrimary: true
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData((prev) => ({
                ...prev,
                image: { url: imageUrl, isPrimary: true },
            }));
        }
    };

    const handleRemoveImage = () => {
        setFormData((prev) => ({
            ...prev,
            image: { url: '', isPrimary: false },
        }));
    };

    const FormCard = ({ title, children }) => (
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8 w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">{title}</h2>
            <div className="space-y-6">{children}</div>
        </div>
    );

    const FormField = ({ label, name, type = 'text', placeholder, children, grid = 'col-span-12' }) => (
        <div className={grid}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            {type === 'select' ? (
                <div className="relative">
                    <select
                        id={name}
                        name={name}
                        className="w-full border border-gray-300 rounded-lg py-2.5 px-3 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-10"
                        value={formData[name]}
                        onChange={handleChange}
                    >
                        {children}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
            ) : type === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 p-3"
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                ></textarea>
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    className="w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3"
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                />
            )}
        </div>
    );

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen w-full">

              <Link to="/properties"
                        className="flex items-center text-gray-500 hover:text-gray-800 transition-colors mb-4"
                        onClick={() => console.log('Back button clicked')}
                        aria-label="Back to Agent List"
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        <span className="text-sm font-medium">Back</span>
                    </Link>

            <div className="lg:flex space-x-10 justify-between items-center mb-10 mt-6 w-full">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">Create New Property Listing</h1>
                    <p className="text-gray-500 mt-2">Fill out the details to create a comprehensive property listing.</p>
                </div>
                <div className="flex mt-2 items-center gap-4">
                    <button className="border border-gray-300 text-black flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                        <User className="lg:h-5 lg:w-5" /> Preview Agent Portal
                    </button>
                </div>
            </div>

            <form className="max-w-full mx-auto space-y-8">
                <FormCard title="Basic Information">
                    <div className="grid grid-cols-12 gap-6">
                        <FormField label="Property Title" name="title" placeholder="Luxury Modern Villa with Pool" grid="col-span-12" />
                        <FormField label="Description" name="description" type="textarea" placeholder="Describe the property..." grid="col-span-12" />
                        <FormField label="Price" name="price" type="number" placeholder="0" grid="col-span-12 md:col-span-6" />
                        <FormField label="Property Type" name="propertyType" type="select" grid="col-span-12 md:col-span-6">
                            <option value="">Select type</option>
                            <option value="villa">Villa</option>
                            <option value="townhouse">Townhouse</option>
                            <option value="condo">Condo</option>
                        </FormField>
                        <FormField label="Bedrooms" name="bedrooms" type="number" placeholder="0" grid="col-span-4" />
                        <FormField label="Bathrooms" name="bathrooms" type="number" placeholder="0" grid="col-span-4" />
                        <FormField label="Pool" name="pool" type="number" placeholder="0" grid="col-span-4" />
                        <FormField label="Address" name="address" placeholder="Address" grid="col-span-12 md:col-span-6" />
                        <FormField label="City" name="city" placeholder="City" grid="col-span-12 md:col-span-6" />
                    </div>
                </FormCard>

                <FormCard title="Media & Assets">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {formData.image.url && (
                            <div className="relative border border-gray-300 rounded-lg overflow-hidden h-32">
                                <img
                                    src={formData.image.url}
                                    alt="Property Preview"
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                    Primary
                                </span>
                                <button
                                    onClick={handleRemoveImage}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <label
                            htmlFor="imageUpload"
                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer text-gray-500 hover:border-blue-500 hover:text-blue-600 transition h-32"
                        >
                            <UploadCloud className="w-6 h-6 mb-1" />
                            <p className="text-sm">Upload Image</p>
                            <input
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </label>
                    </div>

                    <FormField label="Calendar Link (Calendly/Google)" name="calendarLink" placeholder="https://calendly.com/..." grid="col-span-12" />
                </FormCard>

                <FormCard title="SEO Optimization">
                    <FormField label="SEO Title" name="seoTitle" placeholder="Property title for search engines" grid="col-span-12" />
                    <FormField label="SEO Description" name="seoDescription" type="textarea" placeholder="Brief description for search results" grid="col-span-12" />
                </FormCard>

                <FormCard title="Publishing">
                    <div className="grid grid-cols-12 gap-6">
                        <FormField label="Status" name="status" type="select" grid="col-span-12 md:col-span-6">
                            <option value="Draft">Draft</option>
                            <option value="Pending Review">Pending Review</option>
                            <option value="Published">Published</option>
                            <option value="Archived">Archived</option>
                        </FormField>
                    </div>
                </FormCard>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 justify-center w-full">
                    <button
                        type="button"
                        className="flex items-center justify-center w-full sm:w-auto px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="flex items-center justify-center w-full sm:w-auto px-4 py-2 text-blue-700 bg-blue-50 border border-blue-300 rounded-lg hover:bg-blue-100 transition"
                    >
                        <Save className="w-5 h-5 mr-2" /> Save as Draft
                    </button>

                    <button
                        type="submit"
                        className="flex items-center justify-center w-full sm:w-auto px-4 py-2 text-white bg-teal-600 border border-teal-700 rounded-lg hover:bg-teal-700 transition"
                        onClick={(e) => {
                            e.preventDefault();
                            console.log('Form Data:', formData);
                        }}
                    >
                        <Plus className="w-5 h-5 mr-2" /> Create Property
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProperty;
