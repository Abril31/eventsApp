import NavBar from "./components/navBar/NavBar";
import Home from "./views/Home/Home";
import { Route, Routes } from "react-router-dom";
import EventDetail from "./views/detail/EventDetail";
import { Toaster } from "sonner";
import Login from "./components/login/Login";
import RegistrationForm from "./components/login/signUp";
import Footer from "./components/footer/Footer";
import Category from "./views/categorias/Category";
import Profile from "./components/Profile/Profile";
import HomeDashboard from "./components/Dashboard/HomeDashboard/HomeDashboard";
import CreateEvent from "./components/Dashboard/AdminEvents/CreateEvent";
import AdminEvents from "./components/Dashboard/AdminEvents/AdminEvents";
import AdminUsers from "./components/Dashboard/AdminUser/AdminUsers";
import AdminSponsors from "./components/Dashboard/AdminSponsors/AdminSponsors";
import Purchase from "./views/purchase/Purchase";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <NavBar />
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/evento/:id" element={<EventDetail />} />
        <Route path="/categories/:category" element={<Category />} />
        <Route path="/dashboard" element={<HomeDashboard />} />
        <Route path="/dashboard/events/new" element={<CreateEvent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard/events" element={<AdminEvents />} />
        <Route path="/dashboard/users" element={<AdminUsers />} />
        <Route path="/dashboard/sponsor" element={<AdminSponsors />} />
        <Route path="/purchase" element={<Purchase />} />
      </Routes>
      <Toaster richColors position="top-right" />
      <Footer />
    </div>
  );
}

export default App;
