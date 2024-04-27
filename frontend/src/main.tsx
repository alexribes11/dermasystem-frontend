import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from './pages/Home/HomePage.tsx';
import ImageUpload from './pages/imageUpload/imageUpload.tsx';
import LoginPage from './pages/Auth/Login/Login.tsx';
import RegisterPage from './pages/Auth/Register/Register.tsx';
import ArchivesPage from './pages/Archives/Archives.tsx';
import ProfilePage from './pages/Profiles/profiles.tsx';
import Navbar from './components/Navbar.tsx';
import Faq from './pages/FAQ/Faq.tsx';
import WelcomePage from './pages/Welcome/WelcomePage.tsx';
import PatientsPage from './pages/Patients/PatientsPage.tsx';
import StaffPage from './pages/Staff/StaffPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/image-upload",
        element: <ImageUpload />
      },
      {
        path: "/archives",
        element: <ArchivesPage />
      },
      {
        path: "/profile",
        element: <ProfilePage />
      },
      {
        path: "/faq",
        element: <Faq />
      },
      {
        path: "/staff",
        element: <StaffPage />
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
        path: "/welcome",
        element: <WelcomePage /> 
      },
      {
        path:"/patients",
        element: <PatientsPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
