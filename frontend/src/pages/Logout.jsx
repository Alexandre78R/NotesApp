import { useEffect, useState } from "react";
import authService from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../store/auth";
import { useSelector, useDispatch } from "react-redux";

function Logout() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="submit" value="Disconnect" />
    </form>
  );
}

export default Logout;
