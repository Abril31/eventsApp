import NavBar from "./components/navBar/NavBar";
import Home from "./views/Home/Home";
import { Route, Routes } from "react-router-dom";
import EventDetail from "./views/detail/EventDetail";
import { Toaster } from "sonner";
import Footer from "./components/footer/Footer";
import Category from "./views/categorias/Category";
import HomeDashboard from "./components/Dashboard/HomeDashboard/HomeDashboard";
import CreateEvent from "./components/Dashboard/Creation/CreateEvent";
import AdminUsers from "./components/Dashboard/AdminUser/AdminUsers";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/evento/:id" element={<EventDetail />} />
        <Route path="/categories/:category" element={<Category />} />
        <Route path="/dashboard" element={<HomeDashboard />} />
        <Route path="/dashboard/creationEvent" element={<CreateEvent />} />
        <Route path="/dashboard/users" element={<AdminUsers />} />
      </Routes>
      <Toaster richColors position="top-right" />
      <Footer />
    </div>
  );
}

export default App;
