import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import authService from "../../services/auth";
import { logout } from "../../store/auth";

function NavbarApp() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleNavLinkClick = () => {
    setShowNavbar(false);
  };

  const handleSubmit = async (event) => {
    try {
      await authService.logout();
      dispatch(logout());
      setShowNavbar(false);
      navigate("/login");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <h1>NotesAPP</h1>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <span></span>
          <svg x="0" y="0" width="54px" height="55px" viewBox="0 0 54 54">
            <circle cx="27" cy="27" r="26"></circle>
          </svg>
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            {auth?.user?.role === "ROLE_ADMIN" ? (
              <>
                <li>
                  <Link
                    to="/admin/users"
                    onClick={handleNavLinkClick}
                    className="colorHover"
                  >
                    Admin - Users
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
            {auth?.user ? (
              <>
                <li>
                  <Link
                    to="/"
                    onClick={handleNavLinkClick}
                    className="colorHover"
                  >
                    Notes
                  </Link>
                </li>
                <li>
                  <buttom
                    type="submit"
                    onClick={handleSubmit}
                    className="colorHover"
                  >
                    Disconnect
                  </buttom>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/register"
                    onClick={handleNavLinkClick}
                    className="colorHover"
                  >
                    Inscription
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    onClick={handleNavLinkClick}
                    className="colorHover"
                  >
                    Connexion
                  </Link>
                </li>
                <li>
                  <Link
                    to="/forgotpassword"
                    onClick={handleNavLinkClick}
                    className="colorHover"
                  >
                    Mot de passe oublier ?
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarApp;
