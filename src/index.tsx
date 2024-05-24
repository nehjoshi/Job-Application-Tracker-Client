import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './Home';
import { Login } from './Login';
import { UserApplications } from './UserApplications';

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
  }
])

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);