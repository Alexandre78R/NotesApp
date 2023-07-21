import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./style.scss";
import Users from "./pages/Admin/Users/UserView/UserView";
import Login from "./pages/Users/Login/Login";
import Register from "./pages/Users/Register/Register";
import Forgotpassword from "./pages/Users/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Users/ResetPassword/ResetPassword";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "./services/users";
import { signin } from "./store/auth";
import NavBar from "./components/Navbar/Navbar";
import NotesView from "./pages/Notes/NotesView";

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
          <Route
            exact
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/forgotpassword"
            element={
              <PublicRoute>
                <Forgotpassword />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/resetpassword"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/admin/users"
            element={
              <PrivateRouteAdmin>
                <Users />
              </PrivateRouteAdmin>
            }
          />

          <Route
            exact
            path="/notes"
            element={
              <PrivateRoute>
                <NotesView />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <NotesView />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  ) : (
    ""
  );
}

const roles = ["ROLE_USER", "ROLE_ADMIN"];

const PrivateRoute = ({ children, role = "ROLE_USER" }) => {
  const auth = useSelector((state) => state.auth);
  if (auth.isLogged) {
    console.log("toto");
    if (
      auth.user?.role === role ||
      roles.indexOf(auth.user?.role) >= roles.indexOf(role)
    ) {
      console.log("eee");
      return children;
    }
    console.log("deddf");
    return <Navigate to="/" />;
  }
  return <Navigate to="/login" />;
};

const PrivateRouteAdmin = ({ children, role = "ROLE_ADMIN" }) => {
  const auth = useSelector((state) => state.auth);
  if (auth.isLogged) {
    if (auth.user?.role === role) {
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
