import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaUser, 
  FaCalendar, 
  FaSearch,
  FaEye,
  FaTrash,
  FaReply,
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
  where,
  updateDoc
} from 'firebase/firestore';
import { db } from '../../firebase-admin';
import toast from 'react-hot-toast';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: any;
  read?: boolean;
  type?: 'contact' | 'hire';
  company?: string;
  project_type?: string;
  budget?: string;
  timeline?: string;
  nda?: boolean;
}

const ContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'hire'>('all');
  const [view, setView] = useState<'list' | 'detail'>('list');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      // Fetch from both collections with proper error handling
      const [contactsSnapshot, hireMessagesSnapshot] = await Promise.all([
        getDocs(query(collection(db, 'contacts'), orderBy('createdAt', 'desc'))),
        getDocs(query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc')))
      ]);

      const contactsData = contactsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          type: 'contact' as const,
          name: data.name || 'Unknown',
          email: data.email || 'No email',
          subject: data.subject || 'No Subject',
          message: data.message || '',
          createdAt: data.createdAt || new Date(),
          read: data.read || false,
          ...data
        };
      });

      const hireData = hireMessagesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          type: 'hire' as const,
          name: data.name || 'Unknown',
          email: data.email || 'No email',
          subject: data.subject || 'Hire Request',
          message: data.message || '',
          createdAt: data.createdAt || new Date(),
          read: data.read || false,
          company: data.company,
          project_type: data.project_type,
          budget: data.budget,
          timeline: data.timeline,
          nda: data.nda,
          ...data
        };
      });

      const allMessages = [...contactsData, ...hireData] as ContactMessage[];
      setMessages(allMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (message: ContactMessage) => {
    try {
      const collectionName = message.type === 'hire' ? 'contactMessages' : 'contacts';
      await updateDoc(doc(db, collectionName, message.id), {
        read: true
      });
      
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, read: true } : msg
      ));
      
      if (selectedMessage?.id === message.id) {
        setSelectedMessage({ ...message, read: true });
      }
      
      toast.success('Marked as read');
    } catch (error) {
      console.error('Error marking as read:', error);
      toast.error('Failed to mark as read');
    }
  };

  const deleteMessage = async (message: ContactMessage) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const collectionName = message.type === 'hire' ? 'contactMessages' : 'contacts';
      await deleteDoc(doc(db, collectionName, message.id));
      
      setMessages(prev => prev.filter(msg => msg.id !== message.id));
      if (selectedMessage?.id === message.id) {
        setSelectedMessage(null);
        setView('list');
      }
      
      toast.success('Message deleted successfully!');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (message.message && message.message.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'unread' && !message.read) ||
      (filter === 'hire' && message.type === 'hire');
    
    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter(msg => !msg.read).length;
  const hireCount = messages.filter(msg => msg.type === 'hire').length;

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Safe message preview function
  const getMessagePreview = (message: string) => {
    if (!message) return 'No message content...';
    return message.length > 50 ? message.substring(0, 50) + '...' : message;
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
            Contact Messages
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage inquiries and project requests ({messages.length} total, {unreadCount} unread)
          </p>
        </div>
      </div>

      {/* Stats and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FaEnvelope className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{messages.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <FaEnvelope className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Unread</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{unreadCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <FaUser className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hire Requests</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{hireCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <FaCalendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {messages.filter(msg => {
                  try {
                    const msgDate = msg.createdAt?.toDate ? msg.createdAt.toDate() : new Date(msg.createdAt);
                    const today = new Date();
                    return msgDate.toDateString() === today.toDateString();
                  } catch (error) {
                    return false;
                  }
                }).length}
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
              placeholder="Search messages by name, email, or content..."
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
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilter('hire')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'hire'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Hire Requests
            </button>
          </div>
        </div>
      </div>

      {view === 'list' ? (
        /* Messages List */
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Sender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
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
                {filteredMessages.map((message) => (
                  <motion.tr
                    key={message.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                      !message.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                    onClick={() => {
                      setSelectedMessage(message);
                      setView('detail');
                      if (!message.read) {
                        markAsRead(message);
                      }
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {message.name?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {message.name || 'Unknown'}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {message.email || 'No email'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white font-medium">
                        {message.subject || 'No Subject'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                        {getMessagePreview(message.message)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        message.type === 'hire'
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      }`}>
                        {message.type === 'hire' ? 'Hire Request' : 'Contact'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(message.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {message.read ? (
                        <span className="inline-flex items-center px-2 py-1 text-xs text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900 rounded-full">
                          <FaCheck className="h-3 w-3 mr-1" />
                          Read
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 text-xs text-yellow-800 dark:text-yellow-200 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                          <FaTimes className="h-3 w-3 mr-1" />
                          Unread
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMessage(message);
                            setView('detail');
                            if (!message.read) {
                              markAsRead(message);
                            }
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                        >
                          <FaEye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMessage(message);
                          }}
                          className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMessages.length === 0 && (
            <div className="text-center py-12">
              <FaEnvelope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No messages found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm || filter !== 'all' 
                  ? 'Try adjusting your search terms or filters' 
                  : 'No messages received yet'
                }
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Message Detail View */
        selectedMessage && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedMessage.subject || 'No Subject'}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <FaUser className="h-4 w-4 mr-1" />
                      {selectedMessage.name || 'Unknown'}
                    </span>
                    <span className="flex items-center">
                      <FaEnvelope className="h-4 w-4 mr-1" />
                      {selectedMessage.email || 'No email'}
                    </span>
                    <span className="flex items-center">
                      <FaCalendar className="h-4 w-4 mr-1" />
                      {formatDate(selectedMessage.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your Message'}`);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <FaReply className="h-4 w-4 mr-2" />
                    Reply
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Back to List
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Hire Request Details */}
              {selectedMessage.type === 'hire' && (
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Project Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedMessage.company && (
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company</label>
                        <p className="text-gray-900 dark:text-white">{selectedMessage.company}</p>
                      </div>
                    )}
                    {selectedMessage.project_type && (
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Type</label>
                        <p className="text-gray-900 dark:text-white">{selectedMessage.project_type}</p>
                      </div>
                    )}
                    {selectedMessage.budget && (
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Budget</label>
                        <p className="text-gray-900 dark:text-white">{selectedMessage.budget}</p>
                      </div>
                    )}
                    {selectedMessage.timeline && (
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Timeline</label>
                        <p className="text-gray-900 dark:text-white">{selectedMessage.timeline}</p>
                      </div>
                    )}
                    {selectedMessage.nda !== undefined && (
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">NDA Required</label>
                        <p className="text-gray-900 dark:text-white">{selectedMessage.nda ? 'Yes' : 'No'}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Message Content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Message
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {selectedMessage.message || 'No message content'}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-between">
              <button
                onClick={() => deleteMessage(selectedMessage)}
                className="text-red-600 hover:text-red-700 dark:hover:text-red-500 flex items-center"
              >
                <FaTrash className="h-4 w-4 mr-2" />
                Delete Message
              </button>
              
              {!selectedMessage.read && (
                <button
                  onClick={() => markAsRead(selectedMessage)}
                  className="text-green-600 hover:text-green-700 dark:hover:text-green-500 flex items-center"
                >
                  <FaCheck className="h-4 w-4 mr-2" />
                  Mark as Read
                </button>
              )}
            </div>
          </motion.div>
        )
      )}
    </div>
  );
};

export default ContactMessages;