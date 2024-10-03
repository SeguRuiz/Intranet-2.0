import React from "react";
import Header from "../components/Home/header/Header_student";
import NavBar from "../components/Home/navbar/NavBar";
// import Content from "../components/Home/cursos/main_content/content";

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
      {/* <Content /> */}
    </div>
  );
};

export default home;
