import React, { useState } from 'react';
import { Edit2, X, CheckCircle, Lock, Mail, Phone, User } from 'lucide-react';

// --- 1. INITIAL DATA ---
const initialProfileData = {
  initials: 'JS',
  name: 'John Smith',
  email: 'john.smith@realestate.com',
  status: 'Active Agent',
  memberSince: 'Feb 2025',
  stats: {
    totalProperties: 3,
    totalDownloads: 24,
  },
  metrics: [
    {
      title: 'Assigned Properties',
      count: 3,
      img: 'https://res.cloudinary.com/dqkczdjjs/image/upload/v1760912317/Container_4_mdn7xb.png',
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      title: 'Active Listings',
      count: 3,
      img: 'https://res.cloudinary.com/dqkczdjjs/image/upload/v1760913301/Container_5_vn6hql.png',
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      title: 'Downloads This Month',
      count: 24,
      img: 'https://res.cloudinary.com/dqkczdjjs/image/upload/v1760913571/Container_7_dur80i.png',
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
    {
      title: 'Scheduled Viewings',
      count: 8,
      img: 'https://res.cloudinary.com/dqkczdjjs/image/upload/v1760913561/Container_8_tgnlcm.png',
      color: 'text-orange-500',
      bg: 'bg-orange-50',
    },
  ],
  personalInfo: {
    fullName: 'John Smith',
    emailAddress: 'john.smith@realestate.com',
    phoneNumber: '+1 (555) 123-4567',
    accountStatus: 'Active',
    professionalBio:
      'As a seasoned real estate professional with over 10 years of experience, John specializes in luxury waterfront villas in the Miami area.',
  },
};

// --- 2. COMPONENTS ---
const MetricCard = ({ metric }) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between border border-gray-100 transition hover:shadow-lg">
    <div>
      <p className="text-3xl font-semibold text-gray-900 mb-1">{metric.count}</p>
      <p className="text-sm text-gray-500">{metric.title}</p>
    </div>
    <div className={`p-2 rounded-xl ${metric.bg} flex items-center justify-center`}>
      <img src={metric.img} alt={metric.title} className="w-12 h-12 object-contain" />
    </div>
  </div>
);

const InfoField = ({ label, value, status, isBio = false, icon: Icon }) => {
  const statusClasses =
    status === 'Active'
      ? 'bg-green-100 text-green-700'
      : status === 'Active Agent'
      ? 'bg-teal-100 text-teal-700 font-medium'
      : 'bg-gray-100 text-gray-700';

  const placeholderText = isBio
    ? 'Tell us about your real estate experience and specialties...'
    : 'N/A';

  const displayValue = value || placeholderText;
  const isPlaceholder = !value && !status;

  return (
    <div className="flex flex-col mb-4">
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <div
        className={`p-3 rounded-lg border border-gray-200 flex items-center ${
          isBio ? 'h-24' : ''
        }`}
      >
        {Icon && !isBio && <Icon className="w-5 h-5 text-gray-400 mr-2" />}
        {status ? (
          <span className={`text-xs px-2 py-1 rounded-full ${statusClasses}`}>
            {status}
          </span>
        ) : (
          <span
            className={`text-base ${isPlaceholder ? 'text-gray-400 italic' : 'text-gray-900'}`}
          >
            {displayValue}
          </span>
        )}
      </div>
      {isBio && (
        <p className="text-xs text-gray-500 mt-1">
          This bio will be visible to clients and team members
        </p>
      )}
    </div>
  );
};

const EditProfileModal = ({ isOpen, onClose, currentInfo, onSave }) => {
  const [formData, setFormData] = useState(currentInfo);
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Edit Personal Information</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full name"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  disabled
                  className="w-full p-3 pl-10 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed"
                  placeholder="Enter email"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter phone number"
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Account Status</label>
              <span className="inline-flex items-center text-sm font-medium px-3 py-2 bg-gray-50 rounded-lg">
                {formData.accountStatus}
                <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
              </span>
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Professional Bio</label>
            <textarea
              name="professionalBio"
              value={formData.professionalBio}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about your real estate experience and specialties..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">This bio will be visible to clients and team members.</p>
          </div>
        </div>
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const SecurityTab = () => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      console.error('Error: New password and confirmation do not match.');
      return;
    }
    console.log(JSON.stringify(passwordForm, null, 2));
    setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  };

  const PasswordInput = ({ label, name, value, placeholder }) => (
    <div className="mb-4">
      <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
      <div className="relative">
        <input
          type="password"
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full py-3 pl-12 pr-4 text-base border border-gray-300 rounded-lg focus:ring-gray-900 focus:border-gray-900 transition duration-150"
        />
        <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Change Password</h3>
      <PasswordInput
        label="Current Password"
        name="currentPassword"
        value={passwordForm.currentPassword}
        placeholder="Enter current password"
      />
      <PasswordInput
        label="New Password"
        name="newPassword"
        value={passwordForm.newPassword}
        placeholder="Enter new password"
      />
      <PasswordInput
        label="Confirm New Password"
        name="confirmNewPassword"
        value={passwordForm.confirmNewPassword}
        placeholder="Confirm new password"
      />
      <button
        onClick={handleUpdatePassword}
        className="mt-6 w-full md:w-auto px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition duration-150 shadow-md shadow-gray-400/50"
      >
        Update Password
      </button>
    </div>
  );
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Security');
  const [profileData, setProfileData] = useState(initialProfileData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ['Personal Information', 'Security'];

  const handleSaveProfile = (updatedInfo) => {
    setProfileData((prev) => ({
      ...prev,
      personalInfo: updatedInfo,
      name: updatedInfo.fullName,
      email: updatedInfo.emailAddress,
      initials: updatedInfo.fullName
        .split(' ')
        .map((n) => n[0])
        .join(''),
    }));
  };

  const mainCardInitials = profileData.personalInfo.fullName
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-8">
      <div className="mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Profile</h1>
          <p className="text-gray-600 text-sm">
            Manage your account settings and preferences
          </p>
        </header>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16  h-16 bg-gray-200 text-gray-700 font-bold text-xl rounded-full flex items-center justify-center border-4 border-white shadow-inner">
                {mainCardInitials}
              </div>

              <img className='absolute ml-10 mt-10' src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1761008036/Button_3_xrz3oo.png" alt="" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {profileData.personalInfo.fullName}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  {profileData.personalInfo.emailAddress}
                </p>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-teal-600 font-medium">{profileData.status}</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-500">
                    Member since {profileData.memberSince}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6 text-right">
              <div className="border-r pr-6">
                <p className="text-2xl font-bold text-gray-900">{profileData.stats.totalProperties}</p>
                <p className="text-sm text-gray-500">Properties</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{profileData.stats.totalDownloads}</p>
                <p className="text-sm text-gray-500">Downloads</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {profileData.metrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="inline-flex space-x-4 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium transition duration-150 ${
                  activeTab === tab
                    ? 'border-b-2 border-gray-900 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'Personal Information' && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <p className="text-sm text-gray-500">Update your personal details and contact information</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                <InfoField label="Full Name" value={profileData.personalInfo.fullName} icon={User} />
                <InfoField label="Email Address" value={profileData.personalInfo.emailAddress} icon={Mail} />
                <InfoField label="Phone Number" value={profileData.personalInfo.phoneNumber} icon={Phone} />
                <InfoField label="Account Status" status={profileData.personalInfo.accountStatus} />
              </div>

              <div className="pt-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">Professional Bio</p>
                <InfoField isBio={true} value={profileData.personalInfo.professionalBio} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Security' && <SecurityTab />}

        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentInfo={profileData.personalInfo}
          onSave={handleSaveProfile}
        />
      </div>
    </div>
  );
};

export default Profile;
