import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Tambahkan useNavigate
import Button from './Button'; // Import Button

// Menerima isLoggedIn dan setIsLoggedIn sebagai props
const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    // Gunakan useNavigate untuk redirect setelah logout (optional, tapi disarankan)
    const navigate = useNavigate();

    // Fungsi Logout yang membersihkan LocalStorage dan mengupdate State
    const handleLogout = () => {
        // 1. Hapus status sesi dari LocalStorage
        localStorage.removeItem('isLoggedIn'); 
        localStorage.removeItem('userDB'); 
        
        // 2. Panggil fungsi yang datang dari parent (props) untuk update state
        setIsLoggedIn(false); 

        // 3. Arahkan user ke halaman utama setelah logout
        navigate('/'); 
    };

    return (
        <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100 py-4">
            <div className="container mx-auto px-6 flex justify-between items-center">
                
                {/* Logo */}
                <Link to="/" className="text-2xl font-black text-black tracking-widest">
                    METARFLOW
                </Link>

                {/* Menu Tengah - DESAIN TIDAK DIUBAH */}
                <div className="hidden md:flex space-x-8 font-semibold text-slate-600">
                    {['Home', 'Property', 'About Us', 'Contact'].map((item) => (
                        <Link key={item} to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-orange-500 transition-colors">
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Tombol Auth - DESAIN TIDAK DIUBAH */}
                <div className="flex gap-3">
                    {isLoggedIn ? (
                        // Jika Login: Tampilkan Tombol Logout
                        <Button 
                            // Ubah onClick untuk memanggil fungsi handleLogout yang baru
                            onClick={handleLogout} 
                            variant="outline" 
                            className="border-red-500 text-red-500 hover:bg-red-50" // Desain tetap
                        >
                            Logout
                        </Button>
                    ) : (
                        // Jika Belum Login: Tampilkan Login & Register
                        <div className="flex items-center gap-3">
                            {/* Tombol Login: Outline Orange */}
                            <Button to="/login" variant="outline">
                                Login
                            </Button>
                            
                            {/* Tombol Register: Solid Orange */}
                            <Button to="/register" variant="primary">
                                Register
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;