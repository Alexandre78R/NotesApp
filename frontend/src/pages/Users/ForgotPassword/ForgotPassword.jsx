import { useState } from "react";
import { sendResetPassword } from "../../../services/auth";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email != "") {
      try {
        await sendResetPassword(email);
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    } else {
      setError("Veuillez remplir tous les champs !");
    }
  };

  return (
    <>
      {error && (
        <p className="forgot-password-form-error animated-error">{error}</p>
      )}
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className="forgot-password-form-label animated-label"
        >
          Email:
          <input
            type="email"
            name="email"
            id="email"
            placeholder="test@blabla.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="forgot-password-form-input animated-input"
          />
        </label>
        <input
          type="submit"
          value="Envoyer une demande de réinitialisation"
          className="forgot-password-form-submit animated-submit"
        />
      </form>
    </>
  );
}

export default ForgotPassword;
