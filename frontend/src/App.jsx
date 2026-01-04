import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import DetailDestination from './pages/DetailDestination';
import MapPage from './pages/MapPage';
import WeatherPage from './pages/WeatherPage';
import EssentialInfo from './pages/EssentialInfo';
import ItineraryPage from './pages/ItineraryPage';
import AiAssistant from './components/AiAssistant';
import { LanguageProvider } from './context/LanguageContext';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManageDestinations from './pages/admin/ManageDestinations';
import ManageReviews from './pages/admin/ManageReviews';
import AdminLogin from './pages/admin/Login';

// Simple Auth Guard
const ProtectedAdmin = ({ children }) => {
  const token = localStorage.getItem('admin_token');
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col relative">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedAdmin><AdminLayout><Dashboard /></AdminLayout></ProtectedAdmin>} />
            <Route path="/admin/destinations" element={<ProtectedAdmin><AdminLayout><ManageDestinations /></AdminLayout></ProtectedAdmin>} />
            <Route path="/admin/reviews" element={<ProtectedAdmin><AdminLayout><ManageReviews /></AdminLayout></ProtectedAdmin>} />

            {/* Public Routes with Navbar and Footer */}
            <Route path="/" element={<><Navbar /><main className="container mx-auto px-4 py-6 flex-grow"><Home /></main><AiAssistant /><Footer /></>} />
            <Route path="/destination/:id" element={<><Navbar /><main className="container mx-auto px-4 py-6 flex-grow"><DetailDestination /></main><AiAssistant /><Footer /></>} />
            <Route path="/map" element={<><Navbar /><main className="container mx-auto px-4 py-6 flex-grow"><MapPage /></main><AiAssistant /><Footer /></>} />
            <Route path="/weather" element={<><Navbar /><main className="container mx-auto px-4 py-6 flex-grow"><WeatherPage /></main><AiAssistant /><Footer /></>} />
            <Route path="/essential" element={<><Navbar /><main className="container mx-auto px-4 py-6 flex-grow"><EssentialInfo /></main><AiAssistant /><Footer /></>} />
            <Route path="/itinerary" element={<><Navbar /><main className="container mx-auto px-4 py-6 flex-grow"><ItineraryPage /></main><AiAssistant /><Footer /></>} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
