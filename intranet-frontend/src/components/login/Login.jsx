import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/FWD - Logotipo-01.svg";
import flecha2 from "../../assets/flechas/flechas2.png";
import flecha from "../../assets/flechas/Flechas-03.svg";
import d from "../../assets/flechas/d.png";
import { useFetch, verificar_token } from "../../services/llamados";
import { setTokenUser } from "../../redux/AuthSlice";
import Swal from "sweetalert2";
import { setUserSession } from "../../redux/AuthSlice";
import { useDispatch } from "react-redux";
import { setAutorized } from "../../redux/AuthSlice";
import { setCookie, getCookie } from "../../utils/Cookies";
import { DecodeToken } from "../../services/llamados";
import { actualizar } from "../../redux/AuthSlice";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { log_fetch } = useFetch();
  const accion = useDispatch();

  useEffect(() => {
    setCookie("token", "", 0);
    setCookie("refresh", "", 0);
  }, []);

  const validar_espacios = async (evento) => {
    evento.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      Swal.fire("No olvides llenar todos los recuadros");
      return;
    }
    const status_fetch = await log_fetch(
      "http://localhost:8000/api/token",
      null,
      "POST",
      {
        username: email,
        password: password,
      }
    );
    console.log(status_fetch);

    if (status_fetch[0] != 200) {
      Swal.fire("Datos incorrectos, intentelo nuevamente");
      return;
    }
    Swal.fire("Bienvenido");

    setCookie("token", status_fetch[1].access, 1);
    setCookie("refresh", status_fetch[1].refresh, 1);
    accion(setAutorized(true));
    accion(actualizar());
    navigate("/cursos");
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
