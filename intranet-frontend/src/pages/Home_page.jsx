import React from "react";
import Header from "../components/Home/header/Header_student";
import NavBar from "../components/Home/navbar/NavBar";

const home = () => {
  const studentLinks = [
    { href: "/social", label: "Social" },
    { href: "/anuncios ", label: "Anuncios" },
    { href: "/cursos ", label: "Cursos" },
    { href: "/demolab", label: "Demolab" },
    { href: "/ingles ", label: "Ingles" },
  ];
  return (
    <div>
      <Header />
      <NavBar links={studentLinks} />
    </div>
  );
};

export default home;
