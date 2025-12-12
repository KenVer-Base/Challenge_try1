import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // State untuk form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- LOGIKA UTAMA (DIADAPTASI DARI TEMANMU) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Siapkan data pakai URLSearchParams (Seperti punya temanmu)
    const params = new URLSearchParams();
    params.append("email", formData.email);
    params.append("password", formData.password);

    try {
      // 2. Kirim Request
      const response = await fetch(
        "https://ush-frontend-challenge.onrender.com/api/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        }
      );

      // 3. Cek Status (Logika Temanmu: if response.ok)
      if (response.ok) {
        // Karena API ini mengembalikan Token berupa String (bukan JSON object seperti punya temanmu),
        // kita sesuaikan sedikit cara ambil datanya agar tidak error.
        const tokenRaw = await response.text();
        const cleanToken = tokenRaw.replace(/^"|"$/g, '').trim(); // Bersihkan tanda kutip

        alert("Login berhasil!"); // Alert sukses ala temanmu
        
        // Simpan data (Session/Local Storage) agar Dashboard bisa diakses
        localStorage.setItem("token", cleanToken); 
        
        // Panggil fungsi login context agar state aplikasi update
        login({ email: formData.email, role: "Tenant" }, cleanToken);

        navigate("/"); // Pindah ke dashboard
      } else {
        // Jika gagal
        const errorData = await response.json().catch(() => ({}));
        console.log("Responsenya: ", errorData);
        alert(errorData.detail || "Login Gagal! Cek email/password.");
      }

    } catch (error) {
      console.error("Error: ", error);
      alert("Login Gagal (Kesalahan Koneksi)");
    } finally {
      setLoading(false);
    }
  };
  // ------------------------------------------------

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans">
      
      {/* BAGIAN KIRI (IMAGE BANNER) - TIDAK DIUBAH */}
      <div className="hidden md:flex flex-col items-center justify-center p-10 bg-slate-900 text-white relative overflow-hidden">
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-black mb-4 tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 text-lg max-w-sm mx-auto">
            Log in to access your dashboard and manage your dream properties.
          </p>
        </div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-orange-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
      </div>

      {/* BAGIAN KANAN (FORM INPUT) - TIDAK DIUBAH */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900">Login</h2>
            <p className="text-slate-500 mt-2">Enter your details to proceed.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-500 rounded-2xl outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full p-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-500 rounded-2xl outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-4 text-lg shadow-xl shadow-orange-500/20"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </Button>
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