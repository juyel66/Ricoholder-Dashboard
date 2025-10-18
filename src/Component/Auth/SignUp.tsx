// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { registerUser } from "./AuthFuction";
// import { useNavigate } from "react-router-dom";

// // Zod schema
// const signupSchema = z.object({
//   name: z.string().min(3, "Name must be at least 3 characters"),
//   email: z.string().email("Invalid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   specialization: z.string().optional(),
//   photo_url: z.string().optional(),
// });

// // Type
// type SignUpFormData = z.infer<typeof signupSchema>;

// const SignUp = () => {
//   const [role, setRole] = useState<"PATIENT" | "ADMIN">("PATIENT");
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignUpFormData>({
//     resolver: zodResolver(signupSchema),
//   });
//   const navigate = useNavigate();
  



//   const onSubmit = async (data: SignUpFormData) => {
//     setLoading(true);
//     try {
//       const response = await registerUser({ ...data, role });
//       console.log("User registered:", response);
//       navigate("/signin")


//       if (response.success) {
//         alert("Registration successful! Please sign in");
//       } else {
//         alert("Registration failed: " + response.message);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-900 flex">

//       {/* Left Image */}
//       <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{ backgroundImage: "url('https://i.ibb.co/4RTKzV6C/images.png')" }}
//         />
//         <div className="absolute inset-0 bg-black/40" />
//       </div>

//       {/* Right Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
//         <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//           <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

//           {/* Role Tabs */}
//           <div className="flex mb-6">
//             <button
//               type="button"
//               className={`flex-1 py-2 ${role === "PATIENT" ? "bg-slate-900 text-white" : "bg-gray-200"} rounded-l`}
//               onClick={() => setRole("PATIENT")}
//             >
//               Patient
//             </button>
//             <button
//               type="button"
//               className={`flex-1 py-2 ${role === "ADMIN" ? "bg-slate-900 text-white" : "bg-gray-200"} rounded-r`}
//               onClick={() => setRole("ADMIN")}
//             >
//               ADMIN
//             </button>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <label className="block mb-1 font-medium">Name</label>
//               <input
//                 type="text"
//                 {...register("name")}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//               />
//               <p className="text-red-500 text-sm">{errors.name?.message}</p>
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Email</label>
//               <input
//                 type="email"
//                 {...register("email")}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//               />
//               <p className="text-red-500 text-sm">{errors.email?.message}</p>
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Password</label>
//               <input
//                 type="password"
//                 {...register("password")}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//               />
//               <p className="text-red-500 text-sm">{errors.password?.message}</p>
//             </div>

//             {role === "ADMIN" && (
//               <div>
//                 <label className="block mb-1 font-medium">Specialization</label>
//                 <input
//                   type="text"
//                   {...register("specialization")}
//                   className="w-full border border-gray-300 rounded px-3 py-2"
//                 />
//                 <p className="text-red-500 text-sm">{errors.specialization?.message}</p>
//               </div>
//             )}

//             <div>
//               <label className="block mb-1 font-medium">Photo URL (Optional)</label>
//               <input
//                 type="text"
//                 {...register("photo_url")}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800 disabled:opacity-50"
//             >
//               {loading ? "Registering..." : `Sign Up as ${role}`}
//             </button>

//             <p className="text-gray-600 text-sm text-center">
//               Already have an account? <a href="/signin" className="text-slate-900 hover:underline">Sign in</a>
//             </p>
//           </form>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default SignUp;


import { useState } from "react";
import { Link } from "react-router-dom";

const EastmondVillasLogo = () => (
  <div className="flex flex-col items-center justify-center space-y-2 p-6 bg-white rounded-t-xl">
    <img
      className="h-16"
      src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760303130/hd_svg_logo_1_rfsh4e.png"
      alt="Eastmond Villas Logo"
    />
    <h1 className="text-2xl font-semibold text-gray-800">Eastmond Villas</h1>
  </div>
);

const SignUp = () => {
  const [role, setRole] = useState("admin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const registerPayload = {
      user_name: name,
      user_email: email,
      user_password: password,
      user_confirm_password: confirmPassword,
      user_role: role,
    };

    console.log(registerPayload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <EastmondVillasLogo />

        {/* Role Tabs */}
        <div className="flex justify-center bg-gray-50 border-b border-gray-200">
          <button
            onClick={() => setRole("admin")}
            className={`w-1/2 py-3 text-sm font-medium transition rounded-t-lg ${
              role === "admin"
                ? "bg-[#00A597] text-white"
                : "text-gray-600 hover:text-[#00A597]"
            }`}
          >
            Admin Portal
          </button>
          <button
            onClick={() => setRole("agent")}
            className={`w-1/2 py-3 text-sm font-medium transition rounded-t-lg ${
              role === "agent"
                ? "bg-[#00A597] text-white"
                : "text-gray-600 hover:text-[#00A597]"
            }`}
          >
            Agent Portal
          </button>
        </div>

        <div className="px-8 py-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-1 capitalize">
            {role} Registration
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Create your {role === "admin" ? "admin" : "agent"} account to manage
            properties and agents
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#00A597] focus:border-[#00A597] text-gray-700 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="admin@realestate.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#00A597] focus:border-[#00A597] text-gray-700 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#00A597] focus:border-[#00A597] text-gray-700 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#00A597] focus:border-[#00A597] text-gray-700 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00A597] hover:bg-[#008f82] text-white font-medium py-3 rounded-md transition duration-150"
            >
              Register as {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            Demo: Use any details to register
          </p>

          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signIn"
                className="font-semibold text-[#00A597] hover:text-[#008f82] transition duration-150"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
