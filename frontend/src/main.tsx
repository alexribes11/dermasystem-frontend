import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/Home/HomePage.tsx';
import ImageUpload from './pages/imageUpload/imageUpload.tsx';
import LoginPage from './pages/Auth/Login.tsx';
import RegisterPage from './pages/Auth/Register.tsx';
import ArchivesPage from './pages/Archives/Archives.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/image-upload",
    element: <ImageUpload />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/archives",
    element: <ArchivesPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
