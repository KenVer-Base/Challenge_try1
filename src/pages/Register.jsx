import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  // 1. STATE: Menampung inputan
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // 2. VALIDASI: Cek apakah password dan confirm password sama
    if (formData.password !== formData.confirmPassword) {
      alert("Password dan Confirm Password tidak cocok!");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password minimal 6 karakter!");
      return;
    }

    // 3. SIMPAN DATA (KUNCI UTAMA DISINI)
    // Kita simpan object user agar bisa dibaca di halaman Login nanti
    const userData = {
      email: formData.email,
      password: formData.password
    };

    // 'userDB' harus SAMA PERSIS dengan yang dipanggil di Login.jsx
    localStorage.setItem('userDB', JSON.stringify(userData));

    // Cek di console browser untuk memastikan data tersimpan
    console.log("Data tersimpan:", userData);

    alert("Registrasi Berhasil! Silakan Login.");
    navigate('/login'); // Pindah ke halaman login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register Now</h2>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          
          {/* Input Email */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email..."
              className="border p-3 rounded-lg bg-[#FFF8E7]"
              required
            />
          </div>

          {/* Input Password */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password..."
              className="border p-3 rounded-lg bg-[#FFF8E7]"
              required
            />
          </div>

          {/* Input Confirm Password */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Ulangi password..."
              className="border p-3 rounded-lg bg-[#FFF8E7]"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-orange-400 text-white font-bold py-3 rounded-lg hover:bg-orange-500 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have a Rentverse account? <a href="/login" className="text-orange-500 font-bold">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;