// src/components/services/ServiceList.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceApi } from '../../api/services';
import { useAuth } from '../../context/AuthContext';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await serviceApi.getAllServices();
      setServices(response.data.data);
    } catch (err) {
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (serviceId) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/appointments/new?service=${serviceId}` } });
      return;
    }
    navigate(`/appointments/new?service=${serviceId}`);
  };

  if (loading) {
    return <div className="loading-spinner mx-auto"></div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-10">{error}</div>;
  }

  return (
    <div className="page-container">
      <h2 className="section-title">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="relative overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            {/* Service Header */}
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
              <p className="mt-1 text-gray-600">{service.description}</p>
            </div>

            {/* Service Details */}
            <div className="px-6 py-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">
                    ${service.price}
                  </span>
                  <span className="ml-1 text-sm text-gray-600">/session</span>
                </div>
                <div className="flex items-center">
                  <svg 
                    className="w-5 h-5 text-gray-400 mr-1" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-gray-600">{service.duration} mins</span>
                </div>
              </div>

              <button
                onClick={() => handleBooking(service._id)}
                className="w-full btn-primary flex items-center justify-center"
              >
                <span>Book Appointment</span>
                <svg 
                  className="ml-2 w-4 h-4" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>

            {/* Optional: Add a subtle pattern or accent */}
            <div className="absolute top-0 right-0 -mt-3 -mr-3 w-20 h-20 bg-blue-500 opacity-10 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;