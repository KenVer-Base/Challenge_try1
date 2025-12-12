import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children,
  to,
  variant = 'primary', // 'primary' (Solid) atau 'outline' (Garis tepi)
  className = '', 
  type = 'button',
  ...props 
}) => {
  
  // Style Dasar
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-2xl font-bold transition-all duration-300 outline-none";
  
  // Varian Warna (Sesuai gambar referensi: Orange & Putih)
  const variants = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 border-2 border-transparent",
    outline: "bg-white text-orange-500 border-2 border-orange-500 hover:bg-orange-50",
  };

  const combinedClass = `${baseStyles} ${variants[variant]} ${className}`;

  // Jika ini Link (navigasi)
  if (to) {
    return (
      <Link to={to} className={combinedClass} {...props}>
        {children}
      </Link>
    );
  }

  // Jika ini Tombol biasa (submit form / action)
  return (
    <button type={type} className={combinedClass} {...props}>
      {children}
    </button>
  );
};

export default Button;