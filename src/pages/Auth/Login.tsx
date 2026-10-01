import { useState } from "react";

import CustomButton from "../../components/FormElements/Buttons/CustomButton";
import CustomInput from "../../components/FormElements/Input/CustomInput";

import "./Auth.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../store/auth/authActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const location = useLocation();

  const redirectTo =
    location.state?.redirectTo || "/";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const result = await dispatch(
      login({
        email,
        password,
      })
    );
    
    if (login.fulfilled.match(result)) {
      navigate(redirectTo);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h1 className="auth-card__title">Welcome back</h1>

          <p className="auth-card__subtitle">
            Sign in to your account to continue
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <CustomInput
            label="Email"
            name="email"
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.target.value)}
          />

          <CustomInput
            label="Password"
            name="password"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <div className="auth-form__options">
            <label className="auth-form__remember">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <CustomButton to="/forgot-password" variant="text">
              Forgot password?
            </CustomButton>
          </div>

          <CustomButton type="submit" variant="primary" fullWidth>
            Login
          </CustomButton>
        </form>

        <p className="auth-card__footer">
          Don't have an account?{" "}
          <CustomButton to="/register" variant="text">
            Register
          </CustomButton>
        </p>
      </div>
    </div>
  );
};

export default Login;
