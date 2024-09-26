import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/logo.webp";
import { getUsuarios } from "../../services/llamados";

export const Login = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContresena] = useState("");

  const obtenerDatos = async () => {
    if (correo.trim() === "" || contrasena.trim() === "") {
      Swal.fire("No olvides llenar todos los recuadros");
      return; //si está condición no se cumple, se termina.
    }
    try {
      const usuarios = await obtenerInformacionDatos();
      const usuariosRegistrado = usuarios.find(
        //utilizamos el metodo find para validar que al logearse, esa información exista antes.
        (usuario) =>
          usuario.correo === correo && usuario.contrasena === contrasena
      );
      //creamos una condición que al cumplirse creará una llave en el localStorage. Sino entonces te mostrará un aviso.
      if (usuariosRegistrado) {
        Swal.fire(
          "Datos correctos, en breve será dirigido a la página de inicio"
        );
        localStorage.setItem("token", "Llave");

        navigate("/home");
      } else {
        Swal.fire("Hubo un error con los datos, intentelo de nuevo");
      }
    } catch (error) {
      Swal.fire("Problemas al subir datos", error);
    }
  };
  return (
    <div>
      <div className="Cuadro_login">
        <div className="img-inputs">
          <img className="imagen" src={logo} alt="logo" />
          <div className="square_email_password">
            <input className="inputs" type="text" placeholder="Email" />
            <input className="inputs" type="text" placeholder="Password" />
          </div>
        </div>
        <button className="b-t-n_class">Log in</button>
        <div className="triangulo"></div>
        <div className="triangulo1"></div>
      </div>
    </div>
  );
};
