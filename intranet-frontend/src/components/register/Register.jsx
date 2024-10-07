import React from "react";
import "./register.css";
import { useFetch } from "../../services/llamados";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { define_fetch, fetch_the_data_without_token } = useFetch();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [cedula, setCedula] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  define_fetch("http://localhost:8000/api/register", "", "POST", {
    nombre: nombre,
    apellidos: apellido,
    username: usuario,
    cedula: cedula,
    correo: correo,
    password: contrasena,
  });

  const validar_espacios = async (evento) => {
    evento.preventDefault();
    if (
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      usuario.trim() === "" ||
      cedula.trim() === "" ||
      correo.trim() === "" ||
      contrasena.trim() === ""
    ) {
      Swal.fire("No olvides llenar todos los recuadros");
      return;
    }
    const status_fetch = await fetch_the_data_without_token();
    console.log(status_fetch[0]);

    if (status_fetch[0] != 201) {
      Swal.fire("Este usuario ya existe");
      return;
    }
    Swal.fire("Usuario registrado exitosamente");
    navigate("/");
  };

  return (
    <div className="container-padre">
      <form onSubmit={validar_espacios}>
        <div className="formulario">
          <input
            type="text"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
            placeholder="Nombre"
          />
          <input
            type="text"
            onChange={(e) => setApellido(e.target.value)}
            value={apellido}
            placeholder="Apellido"
          />
          <input
            type="text"
            onChange={(e) => setUsuario(e.target.value)}
            value={usuario}
            placeholder="Usuario"
          />
          <input
            type="number"
            onChange={(e) => setCedula(e.target.value)}
            value={cedula}
            placeholder="cedula"
          />
          <input
            type="email"
            onChange={(e) => setCorreo(e.target.value)}
            value={correo}
            placeholder="correo"
          />
          <input
            type="password"
            onChange={(e) => setContrasena(e.target.value)}
            value={contrasena}
            placeholder="contraseña"
          />
        </div>
        <button onClick={validar_espacios}>Registrar Usuario</button>
      </form>
    </div>
  );
};

export default Register;

// {
//   "nombre":"admin",
//   "username": "admin1",
//   "apellidos": "robles",
//   "cedula": 1111,
//   "correo": "admin123@gmail.com",
//   "password": "admin123"
//  }
