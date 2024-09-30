import React from "react";
import Header_student from "../main_page_content_students/header/Header_student";
import NavBar from "../main_page_content_students/navbar/NavBar_Student";
import Modal from "../modal/Modal";
import "./Home_main_content.css";
import { useState } from "react";
import { useFetch } from "../../services/llamados";

const Home_main_content = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { define_fetch, fetch_the_data_without_token } = useFetch();

  define_fetch("http://localhost:8001/cursos", "", "POST", {
    nombre: "Front-end",
    activo: true,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Header_student />
      <NavBar />
      <button onClick={fetch_the_data_without_token}>Crear</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <input type="text" placeholder="Nombre Curso" />
      </Modal>
    </div>
  );
};

export default Home_main_content;
