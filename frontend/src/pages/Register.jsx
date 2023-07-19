import { useState } from "react";
import axios from "axios";
import { createAccount } from "../services/users";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../store/auth";

function Register() {
  const [register, setRegister] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = register;
    if (email === "" || password === "") {
      return setError("Veuillez remplir tous les champs !"), setMessage(null);
    } else {
      try {
        const result = await createAccount(register);
        setError(null);
        setMessage("Création du compte réussi !");

        setTimeout(() => {
          dispatch(signin(result.data));

          navigate("/");
        }, 1000);
      } catch (err) {
        if (err.response.status === 400) {
          setMessage(null);
          setError(
            "L'adresse e-mail est déjà utilisée par un autre utilisateur."
          );
        } else {
          setMessage(null);
          setError(
            "Nous rencontrons un problème, en espérant très vite(.js) chez MAKESENSE !"
          );
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="p_error_register">{error}</p>}
      {message && <p>{message}</p>}
      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          id="email"
          placeholder="test@blabla.com"
          value={register.email}
          onChange={(e) => setRegister({ ...register, email: e.target.value })}
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
          value={register.password}
          onChange={(e) =>
            setRegister({ ...register, password: e.target.value })
          }
        />
      </label>
      <br />
      <input type="submit" value="Création de compte" />
    </form>
  );
}

export default Register;
