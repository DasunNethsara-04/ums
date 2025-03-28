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
import UserDashboard from './Pages/User/UserDashboard.tsx'
import AddModerator from './Pages/Admin/Moderators/AddModerator.tsx'
import ShowModerators from './Pages/Admin/Moderators/ShowModerators.tsx'
import ModeratorProfile from './Pages/Admin/Moderators/ModeratorProfile.tsx'
import UserProfile from './Pages/Admin/Users/UserProfile.tsx'
import AdminProfile from './Pages/Admin/AdminProfile.tsx'
import ModeratorDashboard from './Pages/Moderator/ModeratorDashboard.tsx'

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
    path: '/admin/profile',
    element: <AdminProfile />
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
    path: '/admin/users/profile/:userId',
    element: <UserProfile />,
  },
  {
    path: '/admin/moderators/add',
    element: <AddModerator />,
  },
  {
    path: '/admin/moderators/show',
    element: <ShowModerators />
  },
  {
    path: '/admin/moderators/profile/:moderatorId',
    element: <ModeratorProfile />,
  },
  {
    path: '/moderator/dashboard',
    element: <ModeratorDashboard />,
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
