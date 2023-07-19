import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../store/auth";
import authService from "../services/auth";

function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await authService.login(login.email, login.password);
      dispatch(signin(result.data));

      navigate("/");
    } catch (err) {
      if (err.response?.status === 400) {
        setError("email ou mot de passe incorrect");
      } else {
        setError("Nous rencontrons un problème");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          id="email"
          placeholder="test@blabla.com"
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          id="password"
          placeholder="***********"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />
      </label>
      <br />
      <input type="submit" value="Connexion" />
    </form>
  );
}

export default Login;
