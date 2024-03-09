import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const authLinks = [
    {
      name: "Home",
      path: "/",
      status: true,
    },
    {
      name: "Login",
      path: "/login",
      status: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      status: !authStatus,
    },
    {
      name: "My Posts",
      path: "/myposts",
      status: authStatus,
    },
    {
      name: "Create Post",
      path: "/create",
      status: authStatus,
    },
  ];

  return (
    <header className="flex justify-between items-center">
      <div className="text-2xl font-bold">Blog App</div>
      <nav>
        <ul className="flex space-x-4">
          {authLinks.map((items) => {
            items.status ? (
              <li key={items.name}>
                <button onClick={() => navigate(items.path)}>
                  <Link to={items.path}>{items.name}</Link>
                </button>
              </li>
            ) : null;
          })}
          // authStatus is true means user is Logged in, then show the logout
          button
          {authStatus ? (
            <li>
              <button>
                <Link to="/logout">Logout</Link>
              </button>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default header;
