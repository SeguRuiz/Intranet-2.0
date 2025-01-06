import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/FWD - Logotipo-01.svg";
import { useFetch } from "../../services/llamados";
import { useDispatch } from "react-redux";
import { setAutorized } from "../../redux/AuthSlice";
import { setCookie } from "../../utils/Cookies";
import foto_1 from "../../assets/Fotos/foto_fwd_1.jpg";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { Button, TextField } from "@mui/material";
import { actualizar } from "../../redux/AuthSlice";
import { toast } from "react-toastify";

const fetch_login_errors = {
  404: "Tus datos son incorrectos, intenta denuevo",
  500: "Ocurrio un error al conectar con el servidor..😶‍🌫️",
  401: "Tus datos son incorrectos, intenta denuevo",
};

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fetch_error, setFetchError] = useState(null);
  const [password, setPassword] = useState("");
  const [mostrar, setMostrar] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const info = () => toast.info("Bienvenido devuelta");

  const { log_fetch, fetching } = useFetch();
  const accion = useDispatch();

  useEffect(() => {
    setCookie("token", "", 0);
    setCookie("refresh", "", 0);
  }, []);

  const validar_espacios = async (evento) => {
    evento.preventDefault();

    setFetchError(null);

    if (email.trim() == "") {
      setEmailError("Ingresa tu correo");
      setTimeout(() => {
        setEmailError("");
      }, 2000);
      return;
    }

    if (password.trim() == "") {
      setPasswordError("Ingresa tu contraseña");

      return;
    }

    const status_fetch = await log_fetch(
      "https://intranet-2-0-api.onrender.com/api/token",
      null,
      "POST",
      {
        username: email,
        password: password,
      }
    );

    if (status_fetch[0] != 200) {
      setFetchError(fetch_login_errors[status_fetch[0]]);
      return;
    }

    setCookie("token", status_fetch[1].access, 1);
    setCookie("refresh", status_fetch[1].refresh, 1);
    accion(setAutorized(true));
    accion(actualizar());
    navigate("/cursos");
    info();
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-inpts">
          <div className="padding-container">
            <div className="logo-fwd-area">
              <div className="logo-container">
                <img
                  src={logo}
                  style={{ height: "100%", width: "100%" }}
                  alt=""
                />
              </div>
            </div>
            <div className="inputs-area-login">
              <form
                action=""
                className="inputs-form-login"
                onSubmit={validar_espacios}
                autoComplete="off"
              >
                {fetch_error && (
                  <Alert variant="outlined" severity="error">
                    {fetch_error}
                  </Alert>
                )}
                <TextField
                  label="Correo"
                  type="email"
                  required
                  fullWidth
                  value={email}
                  onChange={(x) => {
                    setEmail(x.target.value);
                    setFetchError(null);
                  }}
                  error={emailError != ""}
                  helperText={emailError}
                  disabled={fetching}
                />
                <TextField
                  onChange={(x) => {
                    setPassword(x.target.value);
                    setFetchError(null);
                  }}
                  error={passwordError != ""}
                  helperText={passwordError}
                  disabled={fetching}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              setMostrar(!mostrar);
                            }}
                            disabled={fetching}
                          >
                            {!mostrar ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="30px"
                                viewBox="0 -960 960 960"
                                width="30px"
                                fill="var(--OnsurfaceVariant)"
                              >
                                <path d="M480.12-330q70.88 0 120.38-49.62t49.5-120.5q0-70.88-49.62-120.38T479.88-670Q409-670 359.5-620.38T310-499.88q0 70.88 49.62 120.38t120.5 49.5Zm-.36-58q-46.76 0-79.26-32.74-32.5-32.73-32.5-79.5 0-46.76 32.74-79.26 32.73-32.5 79.5-32.5 46.76 0 79.26 32.74 32.5 32.73 32.5 79.5 0 46.76-32.74 79.26-32.73 32.5-79.5 32.5Zm.24 188q-146 0-264-83T40-500q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="30px"
                                viewBox="0 -960 960 960"
                                width="30px"
                                fill="var(--OnsurfaceVariant)"
                              >
                                <path d="M816-64 648-229q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40-500q20-52 55.5-101.5T182-696L56-822l42-43 757 757-39 44ZM480-330q14 0 30-2.5t27-7.5L320-557q-5 12-7.5 27t-2.5 30q0 72 50 121t120 49Zm278 40L629-419q10-16 15.5-37.5T650-500q0-71-49.5-120.5T480-670q-22 0-43 5t-38 16L289-760q35-16 89.5-28T485-800q143 0 261.5 81.5T920-500q-26 64-67 117t-95 93ZM585-463 443-605q29-11 60-4.5t54 28.5q23 23 32 51.5t-4 66.5Z" />
                              </svg>
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  label="Contraseña"
                  required
                  fullWidth
                  type={mostrar ? "text" : "password"}
                />
                <Button
                  disabled={fetching}
                  variant="outlined"
                  type="submit"
                  sx={{ width: "22%" }}
                >
                  {fetching ? (
                    <CircularProgress size={22} color="red" />
                  ) : (
                    "Log in"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
        <img src={foto_1} alt="Foto_1" className="fondo-login" />
      </div>
    </div>
  );
};
