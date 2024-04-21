import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserOnboarding from './pages/UserOnboarding.jsx';
import ShowUserList from './pages/ShowUserList.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />

  },
  {
    path: "/UserOnboarding",
    element: <UserOnboarding />

  },
  {
    path: "/ShowUserList",
    element: <ShowUserList />

  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
