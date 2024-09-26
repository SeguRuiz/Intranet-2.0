import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/logo.webp";
import { useFetch } from "../../services/llamados";
import Swal from "sweetalert2";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data, fetch_the_data, define_fetch } = useFetch();

  define_fetch("http://localhost:8000/api/login", "", "POST", {
    username: email,
    password: password,
  });

  const validar_espacios = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Swal.fire("No olvides llenar todos los recuadros");
      return;
    }
    const status_fetch = await fetch_the_data();

    if (status_fetch != 200) {
      Swal.fire("Datos incorrectos, intentelo nuevamente puto");
      return;
    }
    Swal.fire("Bienvenido");
    navigate("/home");
  };

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
        <button onClick={validar_espacios} className="b-t-n_class">
          Log in
        </button>
        <div className="triangulo"></div>
        <div className="triangulo1"></div>
      </div>
    </div>
  );
};
