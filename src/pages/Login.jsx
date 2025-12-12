import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  
  // State untuk menangkap inputan user
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi penundaan jaringan/API (Opsional)
    setTimeout(() => {
        
      // 1. Ambil data user yang sudah Register (dari Local Storage)
      const storedUser = JSON.parse(localStorage.getItem('userDB'));
      
      // 2. Cek Validasi
      if (!storedUser) {
        alert("Anda belum terdaftar! Silakan Register dulu.");
        setLoading(false); 
        return;
      }
      
      // 3. Bandingkan Email & Password Inputan vs Data Tersimpan
      if (formData.email === storedUser.email && formData.password === storedUser.password) {
        // BERHASIL MASUK
        localStorage.setItem('isLoggedIn', 'true'); // Simpan sesi
        alert("Login Berhasil!");
        navigate('/'); 
      } else {
        // GAGAL
        alert("Email atau Password Salah!");
      }

      setLoading(false); 
    }, 500);
  };

  // ------------------------------------------------
  // BAGIAN RETURN (HTML/JSX DESAIN KAMU)
  // ------------------------------------------------

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans">
      
      {/* BAGIAN KIRI (IMAGE BANNER) - Pertahankan desain ini */}
      <div className="hidden md:flex flex-col items-center justify-center p-10 bg-slate-900 text-white relative overflow-hidden">
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-black mb-4 tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 text-lg max-w-sm mx-auto">
            Log in to access your dashboard and manage your dream properties.
          </p>
        </div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-orange-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
      </div>

      {/* BAGIAN KANAN (FORM INPUT) - Pertahankan desain ini */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900">Login</h2>
            <p className="text-slate-500 mt-2">Enter your details to proceed.</p>
          </div>

          {/* Binding: Pastikan onSubmit memanggil handleSubmit */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
              <input
                type="email"
                name="email" // Wajib ada
                placeholder="name@example.com"
                className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-500 rounded-2xl outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
                value={formData.email} // Wajib ada
                onChange={handleChange} // Wajib ada
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
              <input
                type="password"
                name="password" // Wajib ada
                placeholder="••••••••"
                className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-500 rounded-2xl outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
                value={formData.password} // Wajib ada
                onChange={handleChange} // Wajib ada
                required
              />
            </div>

            {/* Tombol Login - Ganti Button custom component ke <button> HTML */}
            <button
              type="submit"
              className="w-full py-4 text-lg bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 font-medium">
            No account? <Link to="/register" className="text-orange-500 font-bold hover:underline transition-all">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;