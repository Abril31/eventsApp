import { Link } from "react-router-dom";
import { useTicketStore } from "../../store/ticketStore";
import { useAuthStore } from "../../store/authStore";
import styles from "./navBar.module.css";
import profile from "../../assets/icons/profile.svg";
import cart from "../../assets/icons/cart.svg";
import fullCart from "../../assets/icons/fullCart.svg";
const Navbar = () => {
  const { isLogged, logout, user } = useAuthStore();
  const cartTickets = useTicketStore((state) => state.cartTickets);
  console.log(cartTickets);
  console.log("user-->", user);
  const renderUserImage = () => {
    if (user.image) {
      return <img src={user.image} alt="Profile" className={styles.image} />;
    } else {
      return <img src={profile} alt="Profile" className={styles.image} />;
    }
  };
  return (
    <>
      <div className="flex justify-between gap-10 bg-base text-xl items-center font-jomhuria">
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
              <div className="flex items-center gap-3">
                <p className="text-white">{user.name}</p>
                <Link to="/profile">{renderUserImage()}</Link>
                <Link to="/cart">
                  {cartTickets.length > 0 ? (
                    <img
                      src={fullCart}
                      alt="Cart"
                      className="cursor-pointer my-2 ml-3 animate-pulse filter brightness-150"
                    />
                  ) : (
                    <img
                      src={cart}
                      alt="Cart"
                      className="cursor-pointer my-2 ml-3"
                    />
                  )}
                </Link>
              </div>
              <button
                onClick={logout}
                className="bg-button1 text-base font-bold py-2 px-2 rounded mr-5"
              >
                Sign Out
              </button>
              {user.type_user === "admin" && (
                <Link to="/dashboard">
                  <button className="bg-button1 text-base font-bold py-2 px-2 rounded mr-5">
                    Dashboard
                  </button>
                </Link>
              )}
            </>
          ) : (
            // Mostrar los botones de Login y SignUp si el usuario no ha iniciado sesión
            <>
              <div className="flex items-center">
                <Link to="/login">
                  <h2 className="border border-otro text-button1 px-3 py-1 font-semibold rounded">
                    Sign In
                  </h2>
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
    </>
  );
};

export default Navbar;
