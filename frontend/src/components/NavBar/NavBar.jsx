import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  
  const navigate = useNavigate();

  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <button onClick={() => navigate("/cart")}>Shopping Cart</button>
        </li>
          <li className="brand">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <h1>LIEGE</h1>
            </Link>
          </li>
          <li>
            {user ? (
              <button onClick={logoutUser}>Logout</button>
            ) : (
              <button onClick={() => navigate("/login")}>Login</button>
            )}
            {user ? (
              <b></b>
            ) : (
              <button onClick={() => navigate("/register")}>Sign Up</button>
            )}
          </li>
      </ul>
    </div>
  );
};

export default Navbar;
