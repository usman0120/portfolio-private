import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaEnvelope, 
  FaCalendar, 
  FaSearch,
  FaTrash,
  FaDownload,
  FaFilter,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import { 
  collection, 
  getDocs, 
  deleteDoc, 
  doc,
  query,
  orderBy,
  where
} from 'firebase/firestore';
import { db } from '../../firebase-admin';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

interface Subscriber {
  id: string;
  email: string;
  timestamp: any;
  active?: boolean;
  createdAt?: any; // Added for compatibility
}

const NewsletterSubscriptions = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'recent'>('all');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const subscribersQuery = query(
        collection(db, 'newsletter'), 
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(subscribersQuery);
      const subscribersData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          email: data.email || 'No email',
          timestamp: data.timestamp || data.createdAt || new Date(),
          active: data.active !== false,
          ...data
        };
      }) as Subscriber[];
      setSubscribers(subscribersData);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast.error('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  const deleteSubscriber = async (subscriber: Subscriber) => {
    if (!confirm('Are you sure you want to remove this subscriber?')) return;
    
    try {
      await deleteDoc(doc(db, 'newsletter', subscriber.id));
      setSubscribers(prev => prev.filter(sub => sub.id !== subscriber.id));
      toast.success('Subscriber removed successfully!');
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      toast.error('Failed to remove subscriber');
    }
  };

  const exportToExcel = () => {
    try {
      const data = subscribers.map(sub => ({
        Email: sub.email,
        'Subscribed Date': formatDateForExport(sub.timestamp),
        Status: sub.active !== false ? 'Active' : 'Inactive'
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Subscribers');
      XLSX.writeFile(workbook, 'newsletter-subscribers.xlsx');
      toast.success('Subscribers exported successfully!');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      toast.error('Failed to export subscribers');
    }
  };

  const copyEmailsToClipboard = () => {
    const emails = subscribers.map(sub => sub.email).join(', ');
    navigator.clipboard.writeText(emails).then(() => {
      toast.success('Emails copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy emails');
    });
  };

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'recent') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const subscriberDate = getSubscriberDate(subscriber.timestamp);
      return matchesSearch && subscriberDate >= sevenDaysAgo;
    }
    
    return matchesSearch;
  });

  // Safe date extraction
  const getSubscriberDate = (timestamp: any): Date => {
    try {
      return timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    } catch (error) {
      return new Date(); // Fallback to current date
    }
  };

  const formatDate = (timestamp: any) => {
    try {
      const date = getSubscriberDate(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Unknown date';
    }
  };

  const formatDateForExport = (timestamp: any) => {
    try {
      const date = getSubscriberDate(timestamp);
      return date.toLocaleDateString('en-US');
    } catch (error) {
      return 'Unknown date';
    }
  };

  const getRecentSubscribersCount = () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return subscribers.filter(sub => {
      const subDate = getSubscriberDate(sub.timestamp);
      return subDate >= sevenDaysAgo;
    }).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Newsletter Subscriptions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your newsletter subscribers ({subscribers.length} total)
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={copyEmailsToClipboard}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 flex items-center"
          >
            <FaCheck className="h-4 w-4 mr-2" />
            Copy Emails
          </button>
          <button
            onClick={exportToExcel}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center"
          >
            <FaDownload className="h-4 w-4 mr-2" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <FaUsers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Subscribers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{subscribers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <FaUsers className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Week</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {getRecentSubscribersCount()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FaEnvelope className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {subscribers.filter(sub => sub.active !== false).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search subscribers by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              All Subscribers
            </button>
            <button
              onClick={() => setFilter('recent')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'recent'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Recent (7 days)
            </button>
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Subscription Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {filteredSubscribers.map((subscriber, index) => (
                <motion.tr
                  key={subscriber.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <FaEnvelope className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {subscriber.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <FaCalendar className="h-4 w-4 mr-2 text-gray-400" />
                      {formatDate(subscriber.timestamp)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      subscriber.active !== false
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {subscriber.active !== false ? (
                        <>
                          <FaCheck className="h-3 w-3 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <FaTimes className="h-3 w-3 mr-1" />
                          Inactive
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => deleteSubscriber(subscriber)}
                      className="text-red-600 hover:text-red-900 dark:hover:text-red-400 flex items-center justify-end w-full"
                    >
                      <FaTrash className="h-4 w-4 mr-2" />
                      Remove
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSubscribers.length === 0 && (
          <div className="text-center py-12">
            <FaUsers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No subscribers found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search terms or filters' 
                : 'No subscribers yet'
              }
            </p>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {subscribers.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Bulk Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={exportToExcel}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center"
            >
              <FaDownload className="h-4 w-4 mr-2" />
              Export All to Excel
            </button>
            <button
              onClick={copyEmailsToClipboard}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 flex items-center"
            >
              <FaCheck className="h-4 w-4 mr-2" />
              Copy All Emails
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to remove all subscribers? This cannot be undone.')) {
                  // Implement bulk delete
                  toast('Bulk delete feature coming soon');
                }
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 flex items-center"
            >
              <FaTrash className="h-4 w-4 mr-2" />
              Remove All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterSubscriptions;