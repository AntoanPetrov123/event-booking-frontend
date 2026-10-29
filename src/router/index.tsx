import { Navigate, createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Events from "../pages/Events/Events";
import EventDetails from "../pages/Events/EventDetails";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import User from "../pages/Auth/User";
import MyCart from "../pages/User/MyCart";
import MyTickets from "../pages/User/MyTickets";
import PaymentSuccess from "../pages/Payments/PaymentSuccess";
import ProtectedRoute from "../components/Routes/ProtectedRoute";
import AdminRoute from "../components/Routes/AdminRoute";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import AdminEvents from "../pages/Admin/Events";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/events/:id",
        element: <EventDetails />,
      },
      {
        path: "/my-profile/:id",
        element: <User />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/user/cart",
            element: <MyCart />,
          },
          {
            path: "/user/tickets",
            element: <MyTickets />,
          },
        ],
      },
      {
        path: "/payment/success",
        element: <PaymentSuccess />,
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: "/admin",
            element: <Navigate to="/admin/dashboard" replace />,
          },
          {
            path: "/admin/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/admin/events",
            element: <AdminEvents />,
          },
          // {
          //   path: "/admin/orders",
          //   element: <AdminOrders />,
          // },
          // {
          //   path: "/admin/users",
          //   element: <AdminUsers />,
          // },
        ],
      },
    ],
  },
]);
