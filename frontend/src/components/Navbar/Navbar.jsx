import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Navbar() {
  const auth = useSelector((state) => state.auth);
  return (
    <nav>
      <ul>
        {auth?.user ? (
          <>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/logout">Disconnect</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/forgotpassword">ForgotPassword</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
