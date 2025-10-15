
import AgentCard from './AgentCard'; 
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';

const agentData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "agent",
    email: "sarah.johnson@realestate.com",
    phone: "+1 (555) 123-4567",
    propertiesCount: 2,
    permissions: "Download",
    status: "active",
    lastLogin: "2025-10-09 09:30",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "agent",
    email: "michael.chen@corp.com",
    phone: "+1 (555) 987-6543",
    propertiesCount: 15,
    permissions: "Edit",
    status: "inactive",
    lastLogin: "2025-10-08 11:15",
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "agent",
    email: "emma.davis@corp.com",
    phone: "+1 (555) 543-2198",
    propertiesCount: 9,
    permissions: "Download",
    status: "active",
    lastLogin: "2025-10-07 15:20",
  },
  {
    id: 4,
    name: "Md Juyel Rana",
    role: "agent",
    email: "daniel.white@corp.com",
    phone: "+1 (555) 654-8723",
    propertiesCount: 12,
    permissions: "Edit",
    status: "inactive",
    lastLogin: "2025-10-06 10:05",
  },
];

const App = () => {
  return (
   <div>
    <div>
            <div className='flex justify-between items-center mt-5'>
                <div>
                    <h1 className='text-3xl font-semibold'>Properties</h1>
                    <p className='text-gray-500'>Your portfolio, beautifully organized.</p>
                </div>
                <Link
                    to="/create-property"
                    className="bg-[#009689] text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-colors duration-150"
                >
                    <CgProfile className="h-5 w-5" /> Add Agent
                </Link>
            </div>


    </div>
     <div className=" bg-gray-50  mt-10 flex  font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full ">
        {agentData.map(agent => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
   </div>
  );
};

export default App;
