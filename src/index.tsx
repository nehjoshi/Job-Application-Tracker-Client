import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './Home';
import { Login } from './Login';
import { UserApplications } from './UserApplications';
import { Social } from './Social';
import { Dashboard } from './Dashboard';
import { UserProvider } from './context/UserContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/applications",
    element: <UserApplications />
  },
  {
    path: "/social",
    element: <Social />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);