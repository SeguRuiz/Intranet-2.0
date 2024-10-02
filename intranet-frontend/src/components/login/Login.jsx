import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/logo.webp";
import flecha2 from "../../assets/flechas/flechas2.png";
import flecha from "../../assets/flechas/flecha4.png";
import d from "../../assets/flechas/d.png";
import { useFetch } from "../../services/llamados";
import Swal from "sweetalert2";
import { setToken } from "../../redux/tokenSlice";
import { useDispatch } from "react-redux";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data, fetch_the_data, define_fetch } = useFetch();
  const accion = useDispatch();

  define_fetch("http://localhost:8000/api/login", "", "POST", {
    correo: email,
    password: password,
  });

  const validar_espacios = async (evento) => {
    evento.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      Swal.fire("No olvides llenar todos los recuadros");
      return;
    }
    const status_fetch = await fetch_the_data();

    if (status_fetch[0] != 200) {
      Swal.fire("Datos incorrectos, intentelo nuevamente");
      return;
    }
    Swal.fire("Bienvenido");
    navigate("/home");
    userAdmin();

    console.log(status_fetch[1]);
  };

  const userAdmin = async () => {
    if (email === "admin@gmail.com") {
      localStorage.setItem("rol", "admin");
    } else {
      localStorage.setItem("rol", "usuario_normal");
    }
  };

  return (
    <div>
      <form onSubmit={validar_espacios}>
        <div>
          <img
            className="triangulos-grandes-fondo"
            src={flecha2}
            alt="flecha"
          />
          <img className="d-logo" src={d} alt="logo-d" />
          <div className="Cuadro_login">
            <div className="img-inputs">
              <img className="imagen" src={logo} alt="logo" />
              <div className="square_email_password">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="inputs"
                  type="email"
                  placeholder="Email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="inputs"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <button onClick={validar_espacios} className="b-t-n_class">
              Log in
            </button>
            <div>
              <img className="imagen-triangulo" src={flecha} alt="" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
