"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginUser } from "./AuthFuction"; 
import { useNavigate } from "react-router-dom";

// Zod schema
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Type
type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [role, setRole] = useState<"PATIENT" | "DOCTOR">("PATIENT");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const response = await loginUser({ ...data, role });
      console.log("Login response:", response);
      

      if (response.success) {
        const userRole = response.data.user.role;
        navigate("/");

        // FRONTEND VALIDATION: Check role match
        if (userRole !== role) {
          alert(`You cannot login from this portal. Your role is ${userRole}`);
          setLoading(false);
          // navigate("/");
          return;
        }

        // If role matches
        // alert(`Login successful! Welcome ${response.data.user.name}`);
        alert(`Login successful! Welcome to Doctor management website`);
        // Optionally redirect to dashboard
        // router.push(userRole === "DOCTOR" ? "/doctor-dashboard" : "/patient-dashboard");
      } else {
        alert("Login failed: " + response.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Please Sign In</h2>

          {/* Role Tabs */}
          <div className="flex mb-6">
            <button
              type="button"
              className={`flex-1 py-2 ${role === "PATIENT" ? "bg-slate-900 text-white" : "bg-gray-200"} rounded-l`}
              onClick={() => setRole("PATIENT")}
            >
              Patient
            </button>
            <button
              type="button"
              className={`flex-1 py-2 ${role === "DOCTOR" ? "bg-slate-900 text-white" : "bg-gray-200"} rounded-r`}
              onClick={() => setRole("DOCTOR")}
            >
              Doctor
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? "Logging in..." : `Sign In as ${role}`}
            </button>

            <p className="text-gray-600 text-sm text-center">
              Don't have an account?{" "}
              <a href="/signup" className="text-slate-900 hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Left side - Banner Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://i.ibb.co/4RTKzV6C/images.png')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

    </div>
  );
};

export default Login;
