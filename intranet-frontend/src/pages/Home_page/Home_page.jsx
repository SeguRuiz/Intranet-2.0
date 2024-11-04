import React from "react";
import Header from "../../components/Home/header/Header_student";
import NavBar from "../../components/Home/navbar/NavBar";
import InteractiveMap from "../../components/Mapa/InteractiveMap";
import "./home.css";

const home = () => {
  const studentLinks = [
    { href: "/social", label: "Social" },
    { href: "/anuncios ", label: "Anuncios" },
    { href: "/cursos ", label: "Cursos" },
    { href: "/demolab", label: "Demolab" },
    { href: "/ingles ", label: "Ingles" },
  ];
  return (
    <div className="home_page_container">
      <div>
        <Header />
        <NavBar links={studentLinks} />
      </div>
      <div>
        <div className="mapa">
          <InteractiveMap />
        </div>
        <div>
          <p>Encuentra nuestra sedes</p>
          <ul>
            <ol>
              <li>Puntarenas</li>
              <li></li>
            </ol>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default home;
