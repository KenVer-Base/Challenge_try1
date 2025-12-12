import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Pastikan sudah install react-router-dom

const Login = () => {
  const navigate = useNavigate();

  // 1. STATE: Untuk menyimpan inputan user sementara
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Fungsi untuk menangkap ketikan user
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 2. LOGIC LOGIN: Disini pengecekan terjadi
  const handleLogin = (e) => {
    e.preventDefault(); // Mencegah halaman refresh otomatis

    // Ambil data user yang sudah Register (disimpan di LocalStorage)
    const storedUser = JSON.parse(localStorage.getItem('userDB'));

    // Cek: Apakah user ada? Apakah Email sama? Apakah Password sama?
    if (storedUser && formData.email === storedUser.email && formData.password === storedUser.password) {
      // JIKA BENAR
      localStorage.setItem('isLoggedIn', 'true'); // Set sesi login
      alert("Login Berhasil!"); 
      navigate('/'); 
    } else {
      // JIKA SALAH
      alert("Email atau Password Salah! Coba lagi.");
      // Tidak ada navigate(), jadi user tetap di halaman ini
    }
  };

  return (
    // Pastikan container utama membungkus Form
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        
        {/* Header Design (Tetap Sesuai Desain Lama) */}
        <h2 className="text-2xl font-bold mb-6 text-center">Login Now</h2>
        
        {/* 3. FORM BINDING: Tambahkan onSubmit di sini */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          
          {/* Input Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}    // Binding value
              onChange={handleChange}   // Binding change
              placeholder="Masukkan email..."
              className="border p-3 rounded-lg bg-[#FFF8E7] focus:outline-none focus:ring-2 focus:ring-orange-300" 
              required
            />
          </div>

          {/* Input Password */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password} // Binding value
              onChange={handleChange}   // Binding change
              placeholder="Masukkan password..."
              className="border p-3 rounded-lg bg-[#FFF8E7] focus:outline-none focus:ring-2 focus:ring-orange-300"
              required
            />
          </div>

          {/* Tombol Login */}
          <button
            type="submit" // Penting: type harus submit
            className="mt-4 bg-orange-400 text-white font-bold py-3 rounded-lg hover:bg-orange-500 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have a Rentverse account yet? <a href="/register" className="text-orange-500 font-bold">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;