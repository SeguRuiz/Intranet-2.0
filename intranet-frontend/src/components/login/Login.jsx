import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/FWD - Logotipo-01.svg";
import flecha2 from "../../assets/flechas/flechas2.png";
import flecha from "../../assets/flechas/Flechas-03.svg";
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
    console.log(status_fetch[0]);

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
    <div className="login-div-container">
      <form onSubmit={validar_espacios} className="login-form">
        <div className="Cuadro_login">
          <div className="img-inputs">
            <div className="foward-logo-container">
              <img className="foward-logo" src={logo} alt="logo" />
            </div>

            <div className="square_email_password">
              <div className="inputs-containers">
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
                <button onClick={validar_espacios} className="b-t-n_class">
                  Log in
                </button>
              </div>
             
            </div>

          </div>
          <div className="triangulo-container">
                <img className="imagen-triangulo" src={flecha} alt="" />
            </div>
        </div>
      </form>
    </div>
  );
};
