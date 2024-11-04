import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { set_current_page } from "../../../redux/CursosContenidosSlice";

const Navbar = ({ links = [] }) => {
  const navigate = useNavigate();
  const accion = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState("");

  useEffect(() => {
    setPage(location.pathname.split("/").at(-1));  
  }, [location.pathname]);

  return (
    <nav className="links_navbar">
      {links.map((link, index) => (
        <div
          key={index}
          className={
            page.toUpperCase() == link.label?.toUpperCase()
              ? "link-container-nav-selected"
              : "link-container-nav"
          }
        >
          <a
            onClick={() => {
              navigate(link.href);
              accion(set_current_page(link.label));
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
