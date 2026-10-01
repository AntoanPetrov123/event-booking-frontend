import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CustomButton from "../FormElements/Buttons/CustomButton";

import type { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../store/auth/authSlice";

import "./Navbar.css";
import { resetCartState } from "../../store/cart/cartSlice";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  
    dispatch(resetCartState());
  
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <NavLink to="/" className="navbar__logo">
          Eventify
        </NavLink>

        <div className="navbar__links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navbar__link active" : "navbar__link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive ? "navbar__link active" : "navbar__link"
            }
          >
            Events
          </NavLink>
        </div>

        <div className="navbar__actions">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/user/cart"
                className={({ isActive }) =>
                  isActive ? "navbar__link active" : "navbar__link"
                }
              >
                Cart
              </NavLink>
              <span className="navbar__user">
                {user?.firstName}
              </span>

              <CustomButton
                variant="secondary"
                onClick={handleLogout}
              >
                Logout
              </CustomButton>
            </>
          ) : (
            <>
              <CustomButton
                to="/login"
                variant="secondary"
              >
                Login
              </CustomButton>

              <CustomButton
                to="/register"
                variant="primary"
              >
                Register
              </CustomButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;