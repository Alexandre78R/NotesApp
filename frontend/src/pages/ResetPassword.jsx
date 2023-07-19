import { useState, useEffect } from "react";
import { resetPassword } from "../services/auth";
import { useNavigate, useSearchParams } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [error, setError] = useState(null);
  const [params, setParams] = useSearchParams();
  const token = params.get("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkPassword !== "" || password !== "") {
      if (checkPassword === password) {
        try {
          await resetPassword(password, token);
          navigate("/login");
        } catch (error) {
          console.error(error);
          setError("Nous rencontrons un problème, désolé...");
        }
      } else {
        setError(
          "Oups ! Quelque chose s'est mal passé. Le mot de passe et sa confirmation ne concordent pas. Veuillez vérifier et réessayer."
        );
      }
    } else {
      setError("Veuillez remplir tous les champs !");
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            placeholder="***********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Check PassWord:
          <input
            type="password"
            name="password"
            id="password"
            placeholder="***********"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
        </label>
        <input
          type="submit"
          value="Reinitialiser mon mot de passe"
          setValue=""
        />
      </form>
    </>
  );
}

export default ResetPassword;
