import { LucideTableProperties } from "lucide-react";
import { Link } from "react-router-dom";


const MediaLibrary = () => {
    return (
        <div>
               <div className='flex justify-between items-center mt-5'>
                <div>
                    <h1 className='text-3xl font-semibold'>Media Library</h1>
                    <p className='text-gray-500'>Organized content control for all your properties.</p>
                </div>
                <Link
                    to="/create-property"
                    className="bg-[#009689] text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-colors duration-150"
                >
                    <LucideTableProperties className="h-5 w-5" /> Create Property
                </Link>
            </div>

            <div>
                
            </div>
            
        </div>
    );
};

export default MediaLibrary;