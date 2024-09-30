import React from "react";
import Header_student from "../components/main_page_content_students/header/Header_student";
import NavBar_Student from "../components/main_page_content_students/navbar/NavBar_Student";
import Content from "../components/main_page_content_students/main_content/content";
import "./home_student.css";

const Home_student_page = () => {
  return (
    <div>
      <Header_student />
      <NavBar_Student />
      <div className="diseno_content">
        <Content />
      </div>
    </div>
  );
};

export default Home_student_page;
