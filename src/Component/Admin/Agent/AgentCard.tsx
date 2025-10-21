import { Mail, Phone, MoreVertical, Download, Edit, X, Trash2, Building2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const getInitials = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-700';
    case 'inactive':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const validatePermission = (permission) => {
  const allowed = ['only view', 'full access', 'download'];
  return allowed.includes(permission.toLowerCase()) ? permission : 'Only View';
};

const AgentCard = ({ agent }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const initials = getInitials(agent.name);
  const permission = validatePermission(agent.permissions);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 flex flex-col justify-between w-full h-full relative">
      <div>
        {/* Header */}
        <div className="flex justify-between items-start mb-6 relative">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 font-semibold text-xl border border-gray-300">
              {initials}
            </div>
          </div>
          <div className="relative">
            <button
              className="p-1 rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
              aria-label="More options"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                <button
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => console.log('Edit Details clicked')}
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit Details
                </button>

                <Link
                  to="/admin-manage-property"
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Building2 className="w-4 h-4 mr-2" /> Manage Properties
                </Link>

                <button
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => console.log('Deactivate clicked')}
                >
                  <X className="w-4 h-4 mr-2" /> Deactivate
                </button>

                <hr className="my-1" />

                <button
                  className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={() => console.log('Delete clicked')}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Agent Info */}
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-2xl font-semibold text-gray-800">{agent.name}</h2>

          {/* <span
            className={`h-3 w-3 rounded-full ${
              agent.status.toLowerCase() === 'active' ? 'bg-green-500' : 'bg-red-500'
            }`}
            title={agent.status}
          ></span> */}
          
        </div>

        <span className="inline-block px-3 py-1 text-sm font-medium rounded-md bg-[#ECEEF2] text-black mb-6">
          {agent.role}
        </span>

        {/* Contact Info */}
        <div className="space-y-3 mb-6 border-b border-gray-100 pb-6">
          <div className="flex items-center text-base text-gray-600">
            <Mail className="w-5 h-5 text-gray-400 mr-3" />
            <span className="truncate">{agent.email}</span>
          </div>
          <div className="flex items-center text-base text-gray-600">
            <Phone className="w-5 h-5 text-gray-400 mr-3" />
            <span>{agent.phone}</span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 text-base">
          <div className="flex justify-between items-center text-gray-600">
            <span>Properties</span>
            <span className="font-medium text-gray-800">{agent.propertiesCount}</span>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <span>Permissions</span>
            <span className="flex items-center font-medium text-gray-800">
              {permission}

              
             
            </span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-600">Access Level</span>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(
                agent.status
              )}`}
            >
              {agent.status}
            </span>
          </div>
          <div className="text-xs text-gray-400 pt-2">
            Last login: {agent.lastLogin}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
