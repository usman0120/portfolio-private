import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaProjectDiagram, 
  FaCode, 
  FaEnvelope, 
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaEye
} from 'react-icons/fa';
import { 
  collection, 
  getCountFromServer,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  Timestamp
} from 'firebase/firestore';
import { db } from '../../firebase-admin';
import { Link } from 'react-router-dom';

interface Stats {
  totalProjects: number;
  totalMiniProjects: number;
  totalMessages: number;
  totalSubscribers: number;
  recentMessages: any[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    totalMiniProjects: 0,
    totalMessages: 0,
    totalSubscribers: 0,
    recentMessages: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch counts from all collections
        const [projectsSnapshot, miniProjectsSnapshot, messagesSnapshot, subscribersSnapshot] = await Promise.all([
          getCountFromServer(collection(db, 'projects')),
          getCountFromServer(collection(db, 'miniProjects')),
          getCountFromServer(collection(db, 'contacts')),
          getCountFromServer(collection(db, 'newsletter'))
        ]);

        // Fetch recent messages
        const messagesQuery = query(
          collection(db, 'contacts'),
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        const messagesSnapshotData = await getDocs(messagesQuery);
        const recentMessages = messagesSnapshotData.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setStats({
          totalProjects: projectsSnapshot.data().count,
          totalMiniProjects: miniProjectsSnapshot.data().count,
          totalMessages: messagesSnapshot.data().count,
          totalSubscribers: subscribersSnapshot.data().count,
          recentMessages
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: FaProjectDiagram,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/projects'
    },
    {
      title: 'Mini Projects',
      value: stats.totalMiniProjects,
      icon: FaCode,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/mini-projects'
    },
    {
      title: 'Messages',
      value: stats.totalMessages,
      icon: FaEnvelope,
      color: 'from-green-500 to-green-600',
      link: '/admin/messages'
    },
    {
      title: 'Subscribers',
      value: stats.totalSubscribers,
      icon: FaUsers,
      color: 'from-orange-500 to-orange-600',
      link: '/admin/subscriptions'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
        <p className="text-purple-100 text-lg">
          Here's what's happening with your portfolio today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={stat.link} className="block">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <FaArrowUp className="h-4 w-4 mr-1" />
                  <span>Updated recently</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Messages
            </h2>
            <Link 
              to="/admin/messages" 
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {stats.recentMessages.length > 0 ? (
              stats.recentMessages.map((message, index) => (
                <div
                  key={message.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {message.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {message.subject || message.message?.substring(0, 50)}...
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {message.createdAt?.toDate().toLocaleDateString()}
                    </p>
                  </div>
                  <FaEye className="h-4 w-4 text-gray-400" />
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No recent messages
              </p>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/admin/projects"
              className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-center hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
            >
              <FaProjectDiagram className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Add Project</span>
            </Link>
            
            <Link
              to="/admin/mini-projects"
              className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-center hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
            >
              <FaCode className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Add Mini Project</span>
            </Link>
            
            <Link
              to="/admin/messages"
              className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-center hover:from-green-600 hover:to-green-700 transition-all duration-200"
            >
              <FaEnvelope className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">View Messages</span>
            </Link>
            
            <Link
              to="/admin/subscriptions"
              className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-center hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
            >
              <FaUsers className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Subscribers</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;