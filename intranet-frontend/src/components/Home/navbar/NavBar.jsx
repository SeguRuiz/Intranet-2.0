import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { set_current_page } from "../../../redux/CursosContenidosSlice";

const Navbar = ({ links = [] }) => {
  const navigate = useNavigate();
  const { page } = useSelector((x) => x.CursosContenidos);
  const accion = useDispatch()

  const set_page = (page) => {
    localStorage.setItem("page", page);
  };
  return (
    <nav className="links_navbar">
      {links.map((link, index) => (
        <div
          key={index}
          className={
            page == link.label
              ? "link-container-nav-selected"
              : "link-container-nav"
          }
        >
          <a
            onClick={() => {
              navigate(link.href);
              set_page(link.label);
              accion(set_current_page(link.label))
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
