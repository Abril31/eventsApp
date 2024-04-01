import NavBar from "./components/navBar/NavBar";
import Home from "./views/Home/Home";
import NewEvent from "./views/NewEvents/NewEvent";
import { Route, Routes } from "react-router-dom";
import EventDetail from "./views/detail/EventDetail";
import { Toaster } from "sonner";
import LoginForm from "./components/login/login";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/evento/:id" element={<EventDetail />} />
        <Route path="/crear-evento" element={<NewEvent />} />
        <Route path="/login" element={<LoginForm/>} />
      </Routes>
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;
