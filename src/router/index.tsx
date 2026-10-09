import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Events from '../pages/Events/Events';
import EventDetails from '../pages/Events/EventDetails';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import User from '../pages/Auth/User';
import MyCart from '../pages/User/MyCart';
import MyTickets from '../pages/User/MyTickets'
import PaymentSuccess from '../pages/Payments/PaymentSuccess';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/events',
        element: <Events />,
      },
      {
        path: '/events/:id',
        element: <EventDetails />,
      },
      {
        path: '/my-profile/:id',
        element: <User />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/user/cart',
        element: <MyCart />
      },
      {
        path: '/user/tickets',
        element: <MyTickets />
      },
      {
        path: '/payment/success',
        element: <PaymentSuccess />
      }
    ],
  },
]);