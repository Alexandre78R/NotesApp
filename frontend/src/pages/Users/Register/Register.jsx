import React, { useState } from "react";
import axios from "axios";
import { createAccount } from "../../../services/users";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../../store/auth";

function Register() {
  const [register, setRegister] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, username } = register;
    if (email === "" || password === "" || username === "") {
      setError("Veuillez remplir tous les champs !");
      setMessage(null);
    } else {
      try {
        const result = await createAccount(register);
        setError(null);
        setMessage("Création du compte réussie !");

        setTimeout(() => {
          dispatch(signin(result.data));

          navigate("/");
        }, 1000);
      } catch (err) {
        if (err.response.status === 400) {
          setError(
            "L'adresse e-mail est déjà utilisée par un autre utilisateur."
          );
          setMessage(null);
        } else if (err.response.status === 422) {
          const validationErrors = err.response.data.validationErrors;
          let errorMessage = "Vérifiez les champs suivants : ";
          const fieldTranslations = {
            "Username - FORMAT LIMIT": "Pseudo limit (45)",
            "Email - FORMAT LIMIT": "Email limit (45)",
            "email - FORMAT": "Email non conforme",
            password: "Mot de passe, erreur interne",
          };
          validationErrors.forEach((error) => {
            console.log("error", error);
            const translatedField =
              fieldTranslations[error.field] || error.field;
            errorMessage += `${translatedField}, `;
          });
          errorMessage = errorMessage.slice(0, -2);
          setError(errorMessage);
        } else {
          setError("Nous rencontrons un problème");
          setMessage(null);
        }
      }
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {error && <p className="register-form-error animated-error">{error}</p>}
      {message && <p>{message}</p>}
      <label htmlFor="email" className="register-form-label animated-label">
        Email:
        <input
          type="email"
          name="email"
          id="email"
          placeholder="test@blabla.com"
          value={register.email}
          onChange={(e) => setRegister({ ...register, email: e.target.value })}
          className="register-form-input animated-input"
        />
      </label>
      <br />
      <label htmlFor="username" className="register-form-label animated-label">
        Pseudo:
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Votre pseudo"
          value={register.username}
          onChange={(e) =>
            setRegister({ ...register, username: e.target.value })
          }
          className="register-form-input animated-input"
        />
      </label>
      <br />
      <label htmlFor="password" className="register-form-label animated-label">
        Mot de passe :
        <input
          type="password"
          name="password"
          id="password"
          placeholder="***********"
          value={register.password}
          onChange={(e) =>
            setRegister({ ...register, password: e.target.value })
          }
          className="register-form-input animated-input"
        />
      </label>
      <br />
      <button type="submit" className="register-form-submit animated-submit">
        Validez !
      </button>
    </form>
  );
}

export default Register;
