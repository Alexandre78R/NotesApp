import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Forgotpassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "./services/users";
import { signin } from "./store/auth";
import NavBar from "./components/Navbar/Navbar";

function App() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const reloadStore = async () => {
    try {
      const result = await getCurrentUser();
      console.log("result", result);
      dispatch(signin(result.data, { isLogged: true }));
      setVisible(true);
    } catch (error) {
      console.error(error);
      setVisible(true);
    }
  };

  useEffect(() => {
    reloadStore();
  }, []);

  return visible ? (
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgotpassword" element={<Forgotpassword />} />
          <Route exact path="/resetpassword" element={<ResetPassword />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  ) : (
    ""
  );
}

const admins = [
  0, //  => User
  1, //  => Admin
];

const PrivateRoute = ({ children, admin = 0 }) => {
  const auth = useSelector((state) => state.auth);
  if (auth.isLogged) {
    if (
      auth.user?.admin === admin ||
      admins.indexOf(auth.user?.admin) >= admins.indexOf(admin)
    ) {
      return children;
    }
    return <Navigate to="/" />;
  }
  return <Navigate to="/login" />;
};

const PrivateRouteAdmin = ({ children, admin = 1 }) => {
  const auth = useSelector((state) => state.auth);
  if (auth.isLogged) {
    if (auth.user?.admin === admin) {
      return children;
    }
    return <Navigate to="/" />;
  }
  return <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  if (!auth.isLogged || auth === undefined) {
    return children;
  }
  return <Navigate to="/" />;
};

export default App;
