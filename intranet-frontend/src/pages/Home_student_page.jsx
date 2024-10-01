import Header_student from "../components/Home/cursos/header/Header_student";
import NavBar_Student from "../components/Home/cursos/navbar/NavBar_Student";
import Content from "../components/Home/cursos/main_content/content";
import "./home_student.css";

const Home_student_page = () => {
  return (
    <div>
      <Header_student />
      <NavBar_Student />
      <div className="diseno_content">
      <Content/>
      </div>
    </div>
  );
};

export default Home_student_page;
