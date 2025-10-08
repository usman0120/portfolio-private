// Use this same component for ALL admin pages temporarily
import { useLocation } from 'react-router-dom';

const TestComponent = () => {
  const location = useLocation();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        ✅ {location.pathname} is Working!
      </h1>
      <div className="space-y-4">
        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <h2 className="text-xl font-semibold">Debug Information:</h2>
          <p><strong>Path:</strong> {location.pathname}</p>
          <p><strong>Component:</strong> TestComponent</p>
          <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
        </div>
        
        <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
          <h3 className="text-lg font-semibold">Next Steps:</h3>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>This page is loading correctly ✅</li>
            <li>Routes are working ✅</li>
            <li>Outlet is rendering child components ✅</li>
            <li>Now you can replace this with the actual component</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestComponent;