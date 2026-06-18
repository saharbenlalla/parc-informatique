import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import AuthPage from "./pages/auth";
import AdminDashboard from "./pages/DashboardAdmin";
import AdminEquipements from "./pages/AdminPage";
import TechnicienDashboard from "./pages/TechPage";
import UserDashboard from "./pages/UserPage";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Stats />
            </>
          }
        />
        <Route
          path="/auth"
          element={
            <>
              <AuthPage />
            </>
          }
        />
        <Route
          path="/espace-admin"
          element={
            <>
              <AdminDashboard />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <>
              <AdminEquipements />
            </>
          }
        />
        <Route
          path="/tech"
          element={
            <>
              <TechnicienDashboard />
            </>
          }
        />
        <Route
          path="/user"
          element={
            <>
              <UserDashboard />
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}