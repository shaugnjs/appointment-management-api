// src/components/layout/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center text-xl font-bold text-gray-800">
              Appointment System
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/services" className="text-gray-600 hover:text-gray-900">
              Services
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/appointments" className="text-gray-600 hover:text-gray-900">
                  My Appointments
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  class="btn-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;