import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider, useAuth } from './context/AuthContext';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar isLoggedIn={!!user} setIsLoggedIn={logout} />}
      <main className="min-h-screen">{children}</main>
      {!isAuthPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
       <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
       </Layout>
    </AuthProvider>
  );
}

export default App;