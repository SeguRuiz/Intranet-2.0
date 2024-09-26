import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/logo.webp";
import { useFetch } from "../../services/llamados";
// import { getUsuarios } from "../../services/llamados";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    data, fetch_the_data, define_fetch
  } = useFetch()

  define_fetch('http://localhost:8000/api/login', '', 'POST', {
    username: 'pedro123',
    password: '123'
  })

  // const obtenerDatos = async () => {
  //   if (email.trim() === "" || password.trim() === "") {
  //     Swal.fire("No olvides llenar todos los recuadros");
  //     return; //si está condición no se cumple, se termina.
  //   }
  //   try {
  //     const usuarios = await getUsuarios();
  //     const usuariosRegistrado = usuarios.find(
  //       //utilizamos el metodo find para validar que al logearse, esa información exista antes.
  //       (usuario) => usuario.email === email && usuario.password === password
  //     );
  //     //creamos una condición que al cumplirse creará una llave en el localStorage. Sino entonces te mostrará un aviso.
  //     if (usuariosRegistrado) {
  //       Swal.fire(
  //         "Datos correctos, en breve será dirigido a la página de inicio"
  //       );

  //       navigate("/home");
  //     } else {
  //       Swal.fire("Hubo un error con los datos, intentelo de nuevo");
  //     }
  //   } catch (error) {
  //     Swal.fire("Problemas al subir datos", error);
  //   }
  
  return (
    <div>
      <div className="Cuadro_login">
        <div className="img-inputs">
          <img className="imagen" src={logo} alt="logo" />
          <div className="square_email_password">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="inputs"
              type="text"
              placeholder="Email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="inputs"
              type="text"
              placeholder="Password"
            />
          </div>
        </div>
        <button onClick={fetch_the_data} className="b-t-n_class">
          Hol
        </button>
        <div className="triangulo"></div>
        <div className="triangulo1"></div>
      </div>
    </div>
  );
}
