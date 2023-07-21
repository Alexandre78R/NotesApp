import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../../store/auth";
import authService from "../../../services/auth";

function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (login.email != "" && login.password != "") {
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
    } else {
      setError("Veuillez remplir tous les champs !");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {error && <p className="login-form-error animated-error">{error}</p>}
      <label htmlFor="email" className="login-form-label animated-label">
        Email:
        <input
          type="email"
          name="email"
          id="email"
          placeholder="test@blabla.com"
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
          className="login-form-input animated-input"
        />
      </label>
      <br />
      <label htmlFor="password" className="login-form-label animated-label">
        Mot de passe :
        <input
          type="password"
          name="password"
          id="password"
          placeholder="***********"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
          className="login-form-input animated-input"
        />
      </label>
      <br />
      <button type="submit" className="login-form-submit animated-submit">
        Connexion
      </button>
    </form>
  );
}

export default Login;
