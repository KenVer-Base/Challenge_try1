import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Button from '../components/Button'; 

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const [role, setRole] = useState("Tenant");

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    // Tambahkan field untuk konfirmasi password
    confirmPassword: "" 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Fungsi untuk menyimpan ke Local Storage (Fallback/Simulasi)
  const saveToLocalStorage = (data) => {
      localStorage.setItem('userDB', JSON.stringify(data)); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ** 1. VALIDASI FRONTEND **
    if (formData.password !== formData.confirmPassword) {
      alert("Password dan Konfirmasi Password tidak cocok!");
      setLoading(false);
      return;
    }
    
    // Data yang akan disimpan ke Local Storage (untuk fallback login)
    const localData = {
        fullname: formData.fullname,
        email: formData.email,
        role: role,
        password: formData.password 
    };

    // ** 2. KONEKSI API **
    try {
      const params = new URLSearchParams();
      params.append("fullname", formData.fullname);
      params.append("email", formData.email);
      params.append("password", formData.password);
      params.append("role", role); // Mengirim role

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
        // API BERHASIL: Simpan juga di Local Storage agar Login lokal bisa jalan
        saveToLocalStorage(localData);
        alert("Registrasi berhasil! Silakan login.");
        navigate("/login");
      } else {
        // API GAGAL: Tampilkan pesan error dan simpan sebagai FALLBACK
        alert(data?.message || "Gagal register. Data disimpan secara lokal untuk Challenge.");
        saveToLocalStorage(localData); 
      }
      
    } catch (error) {
      // Error Jaringan/CORS: Simpan ke Local Storage sebagai FALLBACK
      console.error("Error saat Register:", error);
      alert("Terjadi kesalahan koneksi. Data disimpan secara lokal untuk Login.");
      saveToLocalStorage(localData); 
    }
    
    setLoading(false);
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

          {/* Binding: Pastikan onSubmit memanggil handleSubmit */}
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

            {/* Full Name Input */}
            <input
              type="text"
              name="fullname"
              required
              placeholder="Full Name"
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-500 rounded-2xl outline-none transition-all font-medium placeholder-slate-400"
              value={formData.fullname}
              onChange={handleChange}
            />

            {/* Email Input */}
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-500 rounded-2xl outline-none transition-all font-medium placeholder-slate-400"
              value={formData.email}
              onChange={handleChange}
            />

            {/* Password Input */}
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-500 rounded-2xl outline-none transition-all font-medium placeholder-slate-400"
              value={formData.password}
              onChange={handleChange}
            />
            
            {/* Konfirmasi Password Input (Penting untuk validasi) */}
            <input
              type="password"
              name="confirmPassword" // Wajib ada
              required
              placeholder="Confirm Password"
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-500 rounded-2xl outline-none transition-all font-medium placeholder-slate-400"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {/* Tombol Register */}
            <button 
              type="submit"
              className="w-full py-4 mt-4 text-lg bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Register Account'}
            </button>
          </form>
          
          <p className="mt-6 text-center text-slate-500 text-sm">
            By registering, I agree to Rentverse Terms & Conditions and Privacy Policy
          </p>
          <p className="mt-2 text-center text-slate-500 text-sm font-medium">
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