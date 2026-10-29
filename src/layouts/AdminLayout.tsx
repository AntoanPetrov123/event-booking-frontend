import { NavLink, Outlet } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">Admin Panel</div>

        <nav className="admin-sidebar__nav">
          <NavLink to="/">Site</NavLink>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/events"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Events
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Orders
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Users
          </NavLink>

          <NavLink
            to="/admin/tickets"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Tickets
          </NavLink>
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
