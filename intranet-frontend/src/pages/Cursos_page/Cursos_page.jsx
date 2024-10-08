import React from "react";
import Header from "../../components/Home/header/Header_student";
import NavBar from "../../components/Home/navbar/NavBar";
import Content from "../../components/Home/cursos/main_content/content";
import "./Cursos_page.css";

const Cursos_page = () => {
  const studentLinks = [
    { href: "/social", label: "Social" },
    { href: "/anuncios ", label: "Anuncios" },
    { href: "/cursos ", label: "Cursos" },
    { href: "/demolab", label: "Demolab" },
    { href: "/ingles ", label: "Ingles" },
  ];

  return (
    <div className="cursos-page-container">
      <div className="cursos-page-navbar-area">
        <Header />
        <NavBar links={studentLinks} />
      </div>
      <div className="cursos-page-content-area">
        <Content />
      </div>
    </div>
  );
};

export default Cursos_page;
