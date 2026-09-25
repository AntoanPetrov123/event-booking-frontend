import { NavLink } from 'react-router-dom';

import CustomButton from '../FormElements/Buttons/CustomButton';
import './Navbar.css';

const Navbar = () => {
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
              isActive ? 'navbar__link active' : 'navbar__link'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive ? 'navbar__link active' : 'navbar__link'
            }
          >
            Events
          </NavLink>
        </div>

        <div className="navbar__actions">
          <CustomButton to="/login" variant="secondary">
            Login
          </CustomButton>

          <CustomButton to="/register">
            Register
          </CustomButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;