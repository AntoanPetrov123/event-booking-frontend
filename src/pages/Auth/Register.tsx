import { useState } from "react";

import CustomButton from "../../components/FormElements/Buttons/CustomButton";
import CustomInput from "../../components/FormElements/Input/CustomInput";

import "./Auth.css";
import { register } from "../../store/auth/authActions";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    const result = await dispatch(
      register({
        firstName,
        lastName,
        email,
        password,
      })
    );

    if (register.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h1 className="auth-card__title">Create an account</h1>

          <p className="auth-card__subtitle">
            Create your account and start booking events
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <CustomInput
            label="First name"
            name="firstName"
            type="text"
            value={firstName}
            placeholder="Enter your first name"
            onChange={(event) => setFirstName(event.target.value)}
          />

          <CustomInput
            label="Last name"
            name="lastName"
            type="text"
            value={lastName}
            placeholder="Enter your last name"
            onChange={(event) => setLastName(event.target.value)}
          />

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

          <CustomInput
            label="Confirm password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            placeholder="Confirm your password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          <CustomButton type="submit" variant="primary" fullWidth>
            Register
          </CustomButton>
        </form>

        <p className="auth-card__footer">
          Already have an account?{" "}
          <CustomButton to="/login" variant="text">
            Login
          </CustomButton>
        </p>
      </div>
    </div>
  );
};

export default Register;
