import { getCurrentUser } from "@/Component/Auth/AuthFuction";

const PatientProfile = () => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return (
      <div className="p-5 max-w-3xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-5 text-red-500">
          No user logged in
        </h1>
      </div>
    );
  }

  const { name, email, photo_url } = currentUser.user;

  return (
    <div className="p-5 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <div className="flex flex-col items-center mb-8">
        {photo_url ? (
          <img
            src={photo_url}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
            <span className="text-gray-500 text-xl">No Photo</span>
          </div>
        )}
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-gray-500 mt-1">{email}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-700">Name:</span>
          <span className="text-gray-900">{name}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-900">{email}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-700">Photo URL:</span>
          <span className="text-gray-900">
            {photo_url ? photo_url : "Not Provided"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
