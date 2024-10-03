import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ links = [] }) => {
  const navigate = useNavigate();
  return (
    <nav className="links_navbar">
      {links.map((link, index) => (
        <div key={index}>
          <a
            onClick={() => {
              navigate(link.href);
            }}
          >
            {link.label}
          </a>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
