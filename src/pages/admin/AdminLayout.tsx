// src/pages/admin/AdminLayout.tsx
import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaTimes,
  FaTachometerAlt, 
  FaProjectDiagram, 
  FaCode, 
  FaEnvelope, 
  FaUsers,
  FaSignOutAlt,
  FaHome
} from 'react-icons/fa';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase-admin';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: FaTachometerAlt },
    { name: 'Projects', href: '/admin/projects', icon: FaProjectDiagram },
    { name: 'Mini Projects', href: '/admin/mini-projects', icon: FaCode },
    { name: 'Messages', href: '/admin/messages', icon: FaEnvelope },
    { name: 'Subscribers', href: '/admin/subscriptions', icon: FaUsers },
  ];

  // Auth state management
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      // Redirect to login if not authenticated and on admin route
      if (!user && location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') {
        navigate('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const currentPage = navigation.find(item => isActive(item.href))?.name || 'Dashboard';

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  const goToPortfolio = () => {
    navigate('/');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // If no user and not on login page, redirect will happen in useEffect
  if (!user && location.pathname !== '/admin/login') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Mobile Sidebar Overlay - Only show if user is logged in */}
      {user && (
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              
              {/* Mobile Sidebar */}
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: 'spring', damping: 30 }}
                className="fixed inset-y-0 left-0 z-50 w-64 md:hidden"
              >
                <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">UA</span>
                      </div>
                      <span className="ml-3 text-lg font-semibold text-white">
                        Admin Panel
                      </span>
                    </div>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="text-gray-300 hover:text-white"
                    >
                      <FaTimes className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex-1 flex flex-col overflow-y-auto py-4">
                    <nav className="flex-1 px-4 space-y-2">
                      {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        
                        return (
                          <button
                            key={item.name}
                            onClick={() => navigate(item.href)}
                            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                              active
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-gray-400'}`} />
                            <span className="ml-3">{item.name}</span>
                          </button>
                        );
                      })}
                    </nav>
                    
                    {/* User Info & Actions */}
                    <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Logged in as: <span className="font-medium text-gray-900 dark:text-white">{user?.email}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={goToPortfolio}
                          className="flex-1 flex items-center justify-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          <FaHome className="h-4 w-4 mr-2" />
                          Portfolio
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex-1 flex items-center justify-center px-3 py-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <FaSignOutAlt className="h-4 w-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}

      {/* Desktop Sidebar - Only show if user is logged in */}
      {user && (
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="flex items-center h-16 px-4 bg-gray-900">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UA</span>
              </div>
              <span className="ml-3 text-lg font-semibold text-white">
                Admin Panel
              </span>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-4 py-4 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  
                  return (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.href)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        active
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-gray-400'}`} />
                      <span className="ml-3">{item.name}</span>
                    </button>
                  );
                })}
              </nav>
              
              {/* User Info & Actions */}
              <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Logged in as: <span className="font-medium text-gray-900 dark:text-white">{user?.email}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={goToPortfolio}
                    className="flex-1 flex items-center justify-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaHome className="h-4 w-4 mr-2" />
                    Portfolio
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 flex items-center justify-center px-3 py-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <FaSignOutAlt className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={`flex flex-col flex-1 w-full ${user ? 'md:pl-64' : ''}`}>
        {/* Top bar - Only show if user is logged in */}
        {user && (
          <header className="bg-white dark:bg-gray-800 shadow-sm z-10 sticky top-0">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mr-4"
                >
                  <FaBars className="h-6 w-6" />
                </button>
                
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {currentPage}
                </h1>
              </div>
              
              {/* User info on desktop */}
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {user?.email}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={goToPortfolio}
                    className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaHome className="h-4 w-4 mr-2" />
                    Portfolio
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <FaSignOutAlt className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;