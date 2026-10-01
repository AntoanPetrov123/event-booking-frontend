import { useEffect } from "react";

import { useDispatch } from "react-redux";

import type { AppDispatch } from "../../store/store";

import { checkAuth } from "../../store/auth/authActions";

import { hydrateCart, resetCartState } from "../../store/cart/cartSlice";

import { loadCart } from "../../store/cart/cartStorage";

const AppBootstrap = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        dispatch(resetCartState());

        return;
      }

      const result = await dispatch(checkAuth());

      if (checkAuth.fulfilled.match(result)) {
        const userId = result.payload.id;

        const userCart = loadCart(userId);

        dispatch(hydrateCart(userCart));

        return;
      }

      dispatch(resetCartState());
    };

    bootstrap();
  }, [dispatch]);

  return children;
};

export default AppBootstrap;
