// src/App.tsx
import './assets/fonts/fontawesome';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/context/ThemeContext';
import { routes } from './routes';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </ThemeProvider>
  );
}
export default App;