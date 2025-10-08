// import { RouteObject } from 'react-router-dom';
// import AdminLayout from '../pages/admin/AdminLayout';
// import AdminLogin from '../pages/admin/AdminLogin';
// import AdminDashboard from '../pages/admin/AdminDashboard';
// import ProjectManagement from '../pages/admin/ProjectManagement';
// import MiniProjectManagement from '../pages/admin/MiniProjectManagement';
// import ContactMessages from '../pages/admin/ContactMessages';
// import NewsletterSubscriptions from '../pages/admin/NewsletterSubscriptions';
// import ProtectedRoute from '../pages/admin/components/ProtectedRoute';

// export const adminRoutes: RouteObject[] = [
//   {
//     path: '/admin',
//     element: <AdminLayout />,
//     children: [
//       { path: 'login', element: <AdminLogin /> },
//       { 
//         path: 'dashboard', 
//         element: <ProtectedRoute><AdminDashboard /></ProtectedRoute> 
//       },
//       { 
//         path: 'projects', 
//         element: <ProtectedRoute><ProjectManagement /></ProtectedRoute> 
//       },
//       { 
//         path: 'mini-projects', 
//         element: <ProtectedRoute><MiniProjectManagement /></ProtectedRoute> 
//       },
//       { 
//         path: 'messages', 
//         element: <ProtectedRoute><ContactMessages /></ProtectedRoute> 
//       },
//       { 
//         path: 'subscriptions', 
//         element: <ProtectedRoute><NewsletterSubscriptions /></ProtectedRoute> 
//       },
//       // Redirect to dashboard if no subpath
//       { path: '', element: <ProtectedRoute><AdminDashboard /></ProtectedRoute> }
//     ]
//   }
// ];


// src/routes/admin-routes.tsx (FINAL VERSION)
import { RouteObject } from 'react-router-dom';
import AdminLayout from '../pages/admin/AdminLayout';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ProjectManagement from '../pages/admin/ProjectManagement';
import MiniProjectManagement from '../pages/admin/MiniProjectManagement';
import ContactMessages from '../pages/admin/ContactMessages';
import NewsletterSubscriptions from '../pages/admin/NewsletterSubscriptions';
import ProtectedRoute from '../pages/admin/components/ProtectedRoute';

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'login',
        element: <AdminLogin />
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: 'projects',
        element: (
          <ProtectedRoute>
            <ProjectManagement />
          </ProtectedRoute>
        )
      },
      {
        path: 'mini-projects',
        element: (
          <ProtectedRoute>
            <MiniProjectManagement />
          </ProtectedRoute>
        )
      },
      {
        path: 'messages',
        element: (
          <ProtectedRoute>
            <ContactMessages />
          </ProtectedRoute>
        )
      },
      {
        path: 'subscriptions',
        element: (
          <ProtectedRoute>
            <NewsletterSubscriptions />
          </ProtectedRoute>
        )
      },
      {
        path: '', // /admin
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        )
      }
    ]
  }
];