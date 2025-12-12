import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("Tenant");

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("fullname", formData.fullname);
    params.append("email", formData.email);
    params.append("password", formData.password);
    params.append("role", role);

    try {
      const response = await fetch(
        "https://ush-frontend-challenge.onrender.com/api/v1/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params.toString()
        }
      );

      const data = await response.json().catch(() => ({}));

      if (response.ok && data?.status !== false) {
        alert("Registrasi berhasil! Silakan login.");
        navigate("/login");
        return;
      }

      alert(data?.message || "Gagal register. Coba lagi.");
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan server.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans">
      
      {/* Left Banner */}
      <div className="hidden md:flex bg-slate-900 text-white items-center justify-center p-10 relative overflow-hidden">
        <div className="relative z-10 text-center max-w-md">
          <h2 className="text-5xl font-black mb-4 tracking-tight">Join Rentverse</h2>
          <p className="text-slate-400 text-lg">
            Create functional spaces inspiring joy and connection.
          </p>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-black text-slate-900 mb-2">Register Now</h2>
          <p className="text-slate-500 mb-8">Create your account to start journey.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Role Selector */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                I am a...
              </label>
              <div className="flex gap-4">
                {["Tenant", "Property Owner"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex-1 py-4 rounded-2xl font-bold border-2 transition-all duration-200
                      ${
                        role === r
                          ? "border-orange-500 bg-orange-50 text-orange-600"
                          : "border-transparent bg-gray-50 text-slate-400 hover:bg-gray-100"
                      }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Full Name */}
            <input
              type="text"
              name="fullname"
              required
              placeholder="Full Name"
              className="w-full p-4 bg-gray-50 border-2 border-transparent 
              focus:bg-white focus:border-orange-500 rounded-2xl 
              outline-none transition-all font-medium placeholder-slate-400"
              onChange={handleChange}
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              className="w-full p-4 bg-gray-50 border-2 border-transparent 
              focus:bg-white focus:border-orange-500 rounded-2xl 
              outline-none transition-all font-medium placeholder-slate-400"
              onChange={handleChange}
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className="w-full p-4 bg-gray-50 border-2 border-transparent 
              focus:bg-white focus:border-orange-500 rounded-2xl 
              outline-none transition-all font-medium placeholder-slate-400"
              onChange={handleChange}
            />

            <Button 
              type="submit"
              variant="primary"
              className="w-full py-4 mt-4 text-lg shadow-xl shadow-orange-500/20"
            >
              Register Account
            </Button>
          </form>

          <p className="mt-6 text-center text-slate-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
