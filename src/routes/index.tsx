import { RouteObject } from 'react-router-dom';
import Home from '../pages/Home/HomePage';
import Projects from '../pages/Projects/ProjectsPage';
import ProjectDetail from '../pages/Projects/ProjectDetail';
import MiniProjectsPage from '../pages/Projects/Mini-projects';
import HireMePage from '../pages/HireMe/HireMePage';
import Terms from '../pages/Legal/Terms';
import Privacy from '../pages/Legal/Privacy';
import Cookies from '../pages/Legal/Cookies';
import NotFound from '../pages/NotFound';
import ServiceDetail from '../pages/ServiceDetail';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/projects',
    element: <Projects />,
  },
  {
    path: '/projects/:slug',
    element: <ProjectDetail />,
  },
  {
    path: '/projects/mini-projects',
    element: <MiniProjectsPage />,
  },
  {
    path: '/services/:serviceId',
    element: <ServiceDetail />,
  },
  {
    path: '/hireme',
    element: <HireMePage />,
  },
  {
    path: '/legal/terms',
    element: <Terms />,
  },
  {
    path: '/legal/privacy',
    element: <Privacy />,
  },
  {
    path: '/legal/cookies',
    element: <Cookies />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];


// http://192.168.100.27:5173