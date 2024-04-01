import NavBar from "./components/navBar/NavBar";
import Home from "./views/Home/Home";
import NewEvent from "./views/NewEvents/NewEvent";
import { Route, Routes } from "react-router-dom";
import EventDetail from "./views/detail/EventDetail";
import { Toaster } from "sonner";
import Footer from "./components/footer/Footer";
import Category from "./views/categorias/Category";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/evento/:id" element={<EventDetail />} />
        <Route path="/categories/:category" element={<Category />} />
        <Route path="/crear-evento" element={<NewEvent />} />
      </Routes>
      <Toaster richColors position="top-right" />
      <Footer />
    </div>
  );
}

export default App;
