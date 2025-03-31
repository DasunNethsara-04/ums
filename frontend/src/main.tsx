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
import ModAddUser from './Pages/Moderator/Users/ModAddUser.tsx'
import ModShowUsers from './Pages/Moderator/Users/ModShowUsers.tsx'
import ModUserProfile from './Pages/Moderator/Users/ModUserProfile.tsx'
import EditAdminProfile from './Pages/Admin/EditAdminProfile.tsx'
import EditModeratorProfile from './Pages/Moderator/EditModeratorProfile.tsx'
import EditUserProfile from './Pages/User/EditUserProfile.tsx'
import MainUserProfile from './Pages/User/MainUserProfile.tsx'
import MainModeratorProfile from './Pages/Moderator/MainModeratorProfile.tsx'

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
    path: '/admin/profile/edit',
    element: <EditAdminProfile />,
  },
  {
    path: '/moderator/dashboard',
    element: <ModeratorDashboard />,
  },
  {
    path: '/moderator/users/add',
    element: <ModAddUser />,
  },
  {
    path: '/moderator/users/show',
    element: <ModShowUsers />,
  },
  {
    path: '/moderator/users/profile/:userId',
    element: <ModUserProfile />
  },
  {
    path: '/moderator/profile',
    element: <MainModeratorProfile />
  },
  {
    path: '/moderator/profile/edit',
    element: <EditModeratorProfile />
  },
  {
    path: '/user/dashboard',
    element: <UserDashboard />,
  },
  {
    path: '/user/profile',
    element: <MainUserProfile />
  },
  {
    path: '/user/profile/edit',
    element: <EditUserProfile />
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
