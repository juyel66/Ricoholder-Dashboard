// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { loginUser } from "./AuthFuction"; 
// import { useNavigate } from "react-router-dom";

// // Zod schema
// const loginSchema = z.object({
//   email: z.string().email("Invalid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// // Type
// type LoginFormData = z.infer<typeof loginSchema>;

// const Login = () => {
//   const [role, setRole] = useState<"PATIENT" | "ADMIN">("PATIENT");
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });
//   const navigate = useNavigate();
  

//   const onSubmit = async (data: LoginFormData) => {
//     setLoading(true);
//     try {
//       const response = await loginUser({ ...data, role });
//       console.log("Login response:", response);
      

//       if (response.success) {
//         const userRole = response.data.user.role;
//         navigate("/");

//         // FRONTEND VALIDATION: Check role match
//         if (userRole !== role) {
//           alert(`You cannot login from this portal. Your role is ${userRole}`);
//           setLoading(false);
//           // navigate("/");
//           return;
//         }

//         // If role matches
//         // alert(`Login successful! Welcome ${response.data.user.name}`);
//         alert(`Login successful! Welcome to ADMIN management website`);
//         // Optionally redirect to dashboard
//         // router.push(userRole === "ADMIN" ? "/ADMIN-dashboard" : "/patient-dashboard");
//       } else {
//         alert("Login failed: " + response.message);
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

//       {/* Right side - Login form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
//         <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//           <h2 className="text-2xl font-bold text-center mb-6">Please Sign In</h2>

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

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800 disabled:opacity-50"
//             >
//               {loading ? "Logging in..." : `Sign In as ${role}`}
//             </button>

//             <p className="text-gray-600 text-sm text-center">
//               Don't have an account?{" "}
//               <a href="/signup" className="text-slate-900 hover:underline">
//                 Sign up
//               </a>
//             </p>
//           </form>
//         </div>
//       </div>

//       {/* Left side - Banner Image */}
//       <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{ backgroundImage: "url('https://i.ibb.co/4RTKzV6C/images.png')" }}
//         />
//         <div className="absolute inset-0 bg-black/40" />
//       </div>

//     </div>
//   );
// };

// export default Login;



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

const SignIn = () => {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("admin@realestate.com");
  const [password, setPassword] = useState("password");

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginPayload = {
      user_email: email,
      user_password: password,
      user_role: role,
    };
    console.log(loginPayload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <EastmondVillasLogo />

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
            {role} Login
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Access the {role === "admin" ? "admin dashboard" : "agent panel"} to manage
            properties and agents
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#00A597] focus:border-[#00A597] placeholder-gray-400 text-gray-700 text-sm"
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

            <button
              type="submit"
              className="w-full bg-[#00A597] hover:bg-[#008f82] text-white font-medium py-3 rounded-md transition duration-150"
            >
              Login as {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            Demo: Use any email/password combination
          </p>

          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signUp"
                className="font-semibold text-[#00A597] hover:text-[#008f82] transition duration-150"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;


