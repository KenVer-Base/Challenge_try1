import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';



// Komponen yang Mengelola State Login dan Layout
const AppLayout = ({ children, isLoggedIn, setIsLoggedIn }) => {
    const location = useLocation();
    // Halaman yang tidak menampilkan Navbar dan Footer
    const isAuthPage = ['/login', '/register'].includes(location.pathname);

    return (
        <>
            {/* Tampilkan Navbar kecuali di halaman login/register */}
            {!isAuthPage && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
            
            <main className="min-h-screen">{children}</main>
            
            {/* Tampilkan Footer kecuali di halaman login/register */}
            {!isAuthPage && <Footer />}
        </>
    );
};


// --- FUNGSI UTAMA APP ---

function App() {
    // State utama untuk melacak status login
    const [isLoggedIn, setIsLoggedIn] = useState(
        // Inisialisasi dari Local Storage saat aplikasi dimuat
        localStorage.getItem('isLoggedIn') === 'true'
    );

    // Effect untuk sinkronisasi jika terjadi perubahan status login dari komponen lain
    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
        };

        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    return (
        // Meneruskan state login dan setter ke AppLayout
        <AppLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            <Routes>
                {/* 1. Protected Route: Dashboard hanya bisa diakses setelah Login */}
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                
                {/* 2. Public Routes: Login dan Register */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Tambahkan route untuk halaman lain jika ada, misalnya Home, Property, dll. */}
                <Route path="/property" element={<div>Property Page</div>} />
                <Route path="/about" element={<div>About Us Page</div>} />
                <Route path="/contact" element={<div>Contact Page</div>} />

            </Routes>
        </AppLayout>
    );
}

export default App;