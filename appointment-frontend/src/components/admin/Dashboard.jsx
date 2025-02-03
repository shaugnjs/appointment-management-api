// src/components/admin/Dashboard.jsx
import { useState, useEffect } from 'react';
import { serviceApi, appointmentApi } from '../../api/services';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [sortField, setSortField] = useState('appointmentDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [serviceFormData, setServiceFormData] = useState({
    name: '',
    duration: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    if (activeTab === 'appointments') {
      fetchAppointments();
    } else {
      fetchServices();
    }
  }, [activeTab]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentApi.getAllAppointments();
      setAppointments(response.data.data);
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

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

  const handleStatusUpdate = async (id, status) => {
    try {
      await appointmentApi.updateAppointmentStatus(id, status);
      fetchAppointments();
    } catch (err) {
      alert('Failed to update appointment status');
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      await serviceApi.createService(serviceFormData);
      fetchServices();
      setShowServiceForm(false);
      setServiceFormData({ name: '', duration: '', price: '', description: '' });
    } catch (err) {
      setError('Failed to create service');
    }
  };

  const sortAppointments = (appointments) => {
    return [...appointments].sort((a, b) => {
      let compareA = a[sortField];
      let compareB = b[sortField];

      // Handle nested fields
      if (sortField === 'userId') {
        compareA = a.userId.name;
        compareB = b.userId.name;
      }
      if (sortField === 'serviceId') {
        compareA = a.serviceId.name;
        compareB = b.serviceId.name;
      }
      if (sortField === 'appointmentDate') {
        compareA = new Date(a.appointmentDate);
        compareB = new Date(b.appointmentDate);
      }

      if (compareA < compareB) return sortOrder === 'asc' ? -1 : 1;
      if (compareA > compareB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`${
              activeTab === 'appointments'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base`}
            onClick={() => setActiveTab('appointments')}
          >
            Appointments
          </button>
          <button
            className={`${
              activeTab === 'services'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base`}
            onClick={() => setActiveTab('services')}
          >
            Services
          </button>
        </nav>
      </div>

      {/* Content Area */}
      {activeTab === 'appointments' ? (
        <div>
          {/* Sort Controls */}
          <div className="mb-4 flex items-center justify-end space-x-4">
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="form-input max-w-xs px-4 py-2 border rounded-md"
            >
              <option value="appointmentDate">Sort by Date</option>
              <option value="userId">Sort by Customer Name</option>
              <option value="serviceId">Sort by Service</option>
              <option value="status">Sort by Status</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="form-input max-w-xs px-4 py-2 border rounded-md"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* Appointments Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortAppointments(appointments).map((appointment) => (
                    <tr key={appointment._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.userId.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.serviceId.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(appointment.appointmentDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.timeSlot}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full
                          ${appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            appointment.status === 'accepted' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {appointment.status === 'pending' && (
                          <div className="space-x-2">
                            <button
                              onClick={() => handleStatusUpdate(appointment._id, 'accepted')}
                              className="btn-success"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(appointment._id, 'cancelled')}
                              className="btn-danger"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        // Services Management
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowServiceForm(!showServiceForm)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {showServiceForm ? 'Cancel' : 'Add New Service'}
            </button>
          </div>

          {showServiceForm && (
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <form onSubmit={handleAddService} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Service Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md text-gray-900"
                    value={serviceFormData.name}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Duration (minutes)</label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded-md text-gray-900"
                      value={serviceFormData.duration}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, duration: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full p-2 border rounded-md text-gray-900"
                      value={serviceFormData.price}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    className="w-full p-2 border rounded-md text-gray-900"
                    rows="3"
                    value={serviceFormData.description}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Add Service
                </button>
              </form>
            </div>
          )}

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map((service) => (
                    <tr key={service._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {service.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {service.duration} mins
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${service.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {service.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;