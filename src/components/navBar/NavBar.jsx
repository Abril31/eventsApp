import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import profile from "../../assets/icons/profile.svg";
import cart from "../../assets/icons/cart.svg";

const Navbar = () => {
  const { isLogged, logout, user } = useAuthStore();
  return (
    <div className="flex justify-between gap-10 bg-base text-xl h-16 items-center font-jomhuria">
      <div className="flex ml-5">
        <Link to="/">
          <h2 className="text-white border-r-4 border-otro pr-3 cursor-pointer my-5 mx-3">
            HOME
          </h2>
        </Link>
        <Link to="/about">
          <h2 className="text-white border-r-4 border-otro pr-3 cursor-pointer my-5 mx-3">
            ABOUT US
          </h2>
        </Link>
      </div>
      <div className="flex items-center">
        <h1 className="text-white text-4xl font-jomhuria mb-2">EventApp</h1>
      </div>
      <div className="flex gap-6 items-center my-2">
        {/* Mostrar el icono de perfil y el botón de Logout si el usuario ha iniciado sesión */}
        {isLogged ? (
          <>
            <div className="flex items-center gap-2">
              <p className="text-white">{user.name}</p>
              <Link to="/profile">
                <img
                  src={profile}
                  alt="Profile"
                  className="cursor-pointer my-2 mx-3"
                />
              </Link>
              <Link to="/cart">
                <img
                  src={cart}
                  alt="Cart"
                  className="cursor-pointer my-2 mx-3"
                />
              </Link>
            </div>
            <button
              onClick={logout}
              className="bg-button1 text-base font-bold py-2 px-2 rounded mr-5"
            >
              Log out
            </button>
          </>
        ) : (
          // Mostrar los botones de Login y SignUp si el usuario no ha iniciado sesión
          <>
            <div className="flex items-center">
              <Link to="/login">
                <h2 className="text-white cursor-pointer my-2 mx-3">Login</h2>
              </Link>
            </div>
            <div className="bg-deco text-white font-bold py-2 px-2 rounded mr-5">
              <Link to="/register">
                <h2 className="cursor-pointer text-white">Sign up</h2>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
