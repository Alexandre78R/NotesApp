import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { modifyAccount, getUser } from "../../../../services/users";

function UserEdit() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();

  const [modify, setModify] = useState({
    email: "",
    username: "",
    role: "",
  });

  const [error, setError] = useState(null);

  const searchData = async () => {
    try {
      const userData = await getUser(id);
      console.log("userData", userData);
      setModify(userData?.data[0]);
    } catch (err) {
      console.log("err", err);
      const { email, username, role } = modify;
      if (email === "" || username === "" || role === "") {
        // navigate("/admin/users");
      } else {
        console.log("err", err);
        setError("Nous rencontrons un problème");
      }
    }
  };

  useEffect(() => {
    if (!auth.user) return navigate("/login");
    searchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username } = modify;
    if (email === "" || username === "") {
      return setError("Veuillez remplir tous les champs !");
    } else {
      try {
        await modifyAccount(modify, id);
        navigate("/admin/users");
      } catch (err) {
        console.log("err.reponse", err.reponse);
        if (err.response.status === 400) {
          setError(
            "L'adresse e-mail est déjà utilisée par un autre utilisateur."
          );
        } else if (err.response.status === 403) {
          setError("Impossible d'upload cette image sur notre serveur ! ");
        } else {
          setError("Nous rencontrons un problème");
        }
      }
    }
  };

  return (
    <div className="useredit-box">
      <div className="containers">
        <h1 className="useredit-title2">Modifier l'utilisateur !</h1>
        {error && <p className="useredit-p-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="useredit-button-admin">
            <label htmlFor="email">Email:</label>
            <input
              className="useredit-input"
              type="email"
              name="email"
              id="email"
              placeholder="Courriel"
              value={modify.email}
              onChange={(e) => setModify({ ...modify, email: e.target.value })}
            />
          </div>

          <div className="useredit-button-admin">
            <label htmlFor="username">Username:</label>
            <input
              className="useredit-input"
              type="text"
              name="username"
              id="username"
              placeholder="Nom"
              value={modify.username}
              onChange={(e) =>
                setModify({ ...modify, username: e.target.value })
              }
            />
          </div>

          <div className="useredit-button-admin">
            <label htmlFor="role">Role:</label>
            <select
              id="select"
              value={modify.role}
              onChange={(e) => setModify({ ...modify, role: e.target.value })}
            >
              <option key="ROLE_USER" value="ROLE_USER">
                No Admin
              </option>
              <option key="ROLE_ADMIN" value="ROLE_ADMIN">
                Admin
              </option>
            </select>
          </div>

          <div className="useredit-button-admin">
            <button type="submit" className="useredit-connexion">
              Modifier le compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserEdit;
