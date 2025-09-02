"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerUser } from "./AuthFuction";
import { useNavigate } from "react-router-dom";

// Zod schema
const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  specialization: z.string().optional(),
  photo_url: z.string().optional(),
});

// Type
type SignUpFormData = z.infer<typeof signupSchema>;

const SignUp = () => {
  const [role, setRole] = useState<"PATIENT" | "DOCTOR">("PATIENT");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  });
  const navigate = useNavigate();
  



  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    try {
      const response = await registerUser({ ...data, role });
      console.log("User registered:", response);
      navigate("/signin")


      if (response.success) {
        alert("Registration successful! Please sign in");
      } else {
        alert("Registration failed: " + response.message);
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

      {/* Left Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://i.ibb.co/4RTKzV6C/images.png')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

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
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                {...register("name")}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>

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

            {role === "DOCTOR" && (
              <div>
                <label className="block mb-1 font-medium">Specialization</label>
                <input
                  type="text"
                  {...register("specialization")}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <p className="text-red-500 text-sm">{errors.specialization?.message}</p>
              </div>
            )}

            <div>
              <label className="block mb-1 font-medium">Photo URL (Optional)</label>
              <input
                type="text"
                {...register("photo_url")}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? "Registering..." : `Sign Up as ${role}`}
            </button>

            <p className="text-gray-600 text-sm text-center">
              Already have an account? <a href="/signin" className="text-slate-900 hover:underline">Sign in</a>
            </p>
          </form>
        </div>
      </div>

    </div>
  );
};

export default SignUp;
