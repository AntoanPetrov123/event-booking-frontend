import { useEffect } from "react";
import type { ReactNode } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../../store/store";
import { checkAuth } from "../../store/auth/authActions";

type AppBootstrapProps = {
  children: ReactNode;
};

const AppBootstrap = ({ children }: AppBootstrapProps) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AppBootstrap;