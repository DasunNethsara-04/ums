import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './App.tsx'
import Register from './Pages/Auth/Register.tsx'
import AdminDashboard from './Pages/Admin/Dashboard.tsx'
import AddUser from './Pages/Admin/Users/AddUser.tsx'
import ShowUsers from './Pages/Admin/Users/ShowUsers.tsx'
import UserDashboard from './Pages/User/Dashboard.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <App />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />
  },
  {
    path: '/admin/users/add',
    element: <AddUser />,
  },
  {
    path: '/admin/users/show',
    element: <ShowUsers />,
  },
  {
    path: '/user/dashboard',
    element: <UserDashboard />,
  },
  {
    path: '*',
    element: <h1>Page not found</h1>,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
