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
    <div className="p-5 max-w-3xl mx-auto border-2 shadow-md rounded-lg">
      <div className="flex flex-col items-center mb-8">
        {photo_url ? (
          <img
            src={photo_url}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
            <span className="text-white text-xl">No Photo</span>
          </div>
        )}
        <h1 className="text-3xl text-white font-bold">{name}</h1>
        <p className="text-white mt-1">{email}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-white">Name:</span>
          <span className="text-white">{name}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-white">Email:</span>
          <span className="text-white">{email}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-white">Photo URL:</span>
          <span className="text-white">
            {photo_url ? photo_url : "Not Provided"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
