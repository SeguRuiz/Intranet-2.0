import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  InputLabel,
  TextField,
  FormControl,
  InputAdornment,
  Box,
  CardActions,
  Autocomplete,
  Button,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { useFetch } from "../../services/llamados";
import { getCookie } from "../../utils/Cookies";
import { useParams } from "react-router-dom";
import { stringAvatar } from "../../utils/Utils";
import MailIcon from "@mui/icons-material/Mail";
import { TIPOS_DE_CEDULA_USUARIOS } from "../../utils/Globals.d";
import { regex_tipos_cedulas } from "../Control-page/Usuarios-crud/add/regexs";
import { validateEmail } from "../Control-page/Usuarios-crud/add/regexs";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Agregar_perfil_img from "./Agregar_perfil_img";
import Log_out from "../userInfoCard/Log_out";
const userInfoMock = {
  first_name: "",
  last_name: "",
  email: "",
  cedula: "",
  tipo_cedula: "",
};

const Informacion_personal_card = ({id_usuario}) => {
  

  const { userInSession } = useSelector((x) => x.Auth);
  const [personalUrl, setPersonalUrl] = useState(null)
  const [perfilImgId, setPerfilImgId] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [retrievingLoding, setRetrievingLoading] = useState(true);
  

  const errorEditando = () =>
    toast.error("Ocurrio un error editando la información");
  const errorTrayendo = () =>
    toast.error("Ocurrio un error trayendo la informacion");
  const { fetch_the_data } = useFetch();
  const tipos_de_cedula_choices = TIPOS_DE_CEDULA_USUARIOS.map((x) => ({
    label: x.toUpperCase(),
    id: x,
  }));

  const [userInfo, setUserInfo] = useState(null);
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [tipoCedula, setTipoCedula] = useState(null);
  console.log(tipoCedula);

  const [email, setEmail] = useState("");
  const [cedula, setCedula] = useState("");
  const [editando, setEditando] = useState(false);

  //////////////////////////////////////////////////

  const [first_name_error, set_first_name_error] = useState("");
  const [last_name_error, set_last_name_error] = useState("");
  const [tipoCedulaError, setTipoCedulaError] = useState("");
  const [cedulaError, setCedulaError] = useState("");
  const [emailError, setEmailError] = useState("");

  const token = getCookie("token");

  useEffect(() => {
    (async () => {
      if (userInfo == null) {
        const userData = await fetch_the_data(
          "http://localhost:8000/api/editar-user",
          token,
          "GET",
          null,
          id_usuario
        );
        userData == undefined && errorTrayendo();
        if (userData[0] == 200) {
          console.log(userData);

          setUserInfo(userData);
          setPerfilImgId(userData[1]?.perfilUrl ?? 'sin imagen');
          setTipoCedula({
            label: userData[1]?.tipo_cedula.toUpperCase(),
            id: userData[1]?.tipo_cedula,
          });
          setCedula(userData[1]?.cedula);
          setEmail(userData[1]?.email);
          set_first_name(userData[1]?.first_name);
          set_last_name(userData[1]?.last_name);
         
         
          return;
        }

        errorTrayendo();
      }
    })();
  }, []);

  const editarUsuario = async () => {
    if (!first_name.trim()) {
      set_first_name_error("No puede estar en blanco");
      return;
    }

    if (!last_name.trim()) {
      set_last_name_error("No debe estar en blanco");
      return;
    }

    if (!tipoCedula?.id?.trim()) {
      setTipoCedulaError("No es un tipo de identificacion valida");
      return;
    }

    if (!cedula.trim()) {
      setCedulaError("No debe estar en blanco");
      return;
    }

    if (!email.trim()) {
      setEmailError("No debe estar en blanco");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("No es un correo permitido");
      return;
    }

    switch (tipoCedula?.id) {
      case "pasaporte":
        if (!regex_tipos_cedulas.pasaporte(cedula)) {
          setCedulaError("Debe tener solo 20 caracteres");
          return;
        }
        break;
      case "nacional":
        if (!regex_tipos_cedulas.nacional(cedula)) {
          setCedulaError("Debe tener solo 9 digitos numericos");
          return;
        }
        break;
      case "extranjero":
        if (!regex_tipos_cedulas.extranjero(cedula)) {
          setCedulaError("Debe tener solo 12 digitos numericos");
          return;
        }
        break;
      default:
        break;
    }
    setLoadingEdit(true);
    const userData = await fetch_the_data(
      "http://localhost:8000/api/editar-user",
      token,
      "PATCH",
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        cedula: cedula,
        tipo_cedula: tipoCedula.id,
      },
      id_usuario
    );
    userData == undefined && errorEditando();
    if (userData[0] == 200) {
      setUserInfo(userData);

      setTipoCedula({
        label: userData[1]?.tipo_cedula.toUpperCase(),
        id: userData[1]?.tipo_cedula,
      });
      setCedula(userData[1]?.cedula);
      setEmail(userData[1]?.email);
      set_first_name(userData[1]?.first_name);
      set_last_name(userData[1]?.last_name);
    }
    setEditando(false);
    setLoadingEdit(false);
  };

  const handleChange = (value, setValue, setError) => {
    setEditando(true);
    setValue(value);
    setError("");
  };

  const cancelarEdicion = () => {
    setUserInfo(userInfo);
    setTipoCedula(userInfo?.tipo_cedula?.toUpperCase());
    setCedula(userInfo?.cedula);
    setEmail(userInfo?.email);
    set_first_name(userInfo?.first_name);
    set_last_name(userInfo?.last_name);
    setEditando(false);

    set_first_name_error("");
    set_first_name_error("");
    setTipoCedulaError("");
  };

  return (
    <Card
      sx={{
        width: "70%",
      }}
    >
      <CardHeader
        title={"Informacion personal"}
        subheader={
          "Si deseas cambiar tu informacion personal, pideselo a un administrador"
        }
      />
      <Divider />
      <CardContent>
        <Box display={"flex"} gap={"20px"} position={"relative"}>
          <div
            style={{
              height: 115,
              width: 115,
              display: "flex",
              justifyContent: "end",
              alignItems: "start",
            }}
          >
            <Agregar_perfil_img
              set_loading_perfil={setRetrievingLoading}
              file_id={perfilImgId}
              id_usuario={id_usuario}
              setPerfilUrl={setPersonalUrl}
            />

            {retrievingLoding ? (
              <Skeleton
                animation="wave"
                variant="rounded"
                sx={{
                  height: 115,
                  width: 115,
                }}
              />
            ) : (
              <>
                {personalUrl ? (
                  <Avatar
                    variant="rounded"
                    src={personalUrl}
                    sx={{
                      height: 115,
                      width: 115,
                      fontSize: "60px",
                    }}
                  ></Avatar>
                ) : (
                  <Avatar
                    variant="rounded"
                    {...stringAvatar(
                      `${first_name != "" ? first_name.trim() : "Njijiu"} ${
                        last_name != "" ? last_name.trim() : "nn"
                      }`,
                      {
                        height: 115,
                        width: 115,
                        fontSize: "60px",
                      }
                    )}
                  ></Avatar>
                )}
              </>
            )}
          </div>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {retrievingLoding ? (
                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{
                    fontSize: "20px",
                    width: "30%",
                  }}
                />
              ) : (
                <label>Nombre</label>
              )}

              {retrievingLoding ? (
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  sx={{
                    height: 40,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    gap: "10px",
                  }}
                >
                  <TextField
                    id="userFirstName"
                    size="small"
                    placeholder="Nombre"
                    error={first_name_error}
                    helperText={first_name_error}
                    fullWidth
                    disabled={loadingEdit}
                    onChange={(o) => {
                      handleChange(
                        o.target.value,
                        set_first_name,
                        set_first_name_error
                      );
                    }}
                    value={first_name}
                    slotProps={{
                      input: {
                        readOnly: !userInSession?.is_staff,
                      },
                    }}
                  />
                  <TextField
                    id="userSecondName"
                    size="small"
                    placeholder="apellido"
                    fullWidth
                    disabled={loadingEdit}
                    error={last_name_error}
                    helperText={last_name_error}
                    value={last_name}
                    onChange={(o) => {
                      handleChange(
                        o.target.value,
                        set_last_name,
                        set_last_name_error
                      );
                    }}
                    slotProps={{
                      input: {
                        readOnly: !userInSession?.is_staff,
                      },
                    }}
                  />
                </Box>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {retrievingLoding ? (
                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{
                    fontSize: "20px",
                    width: "30%",
                  }}
                />
              ) : (
                <label>Identificacion</label>
              )}

              {retrievingLoding ? (
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  sx={{
                    height: 40,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    gap: "10px",
                  }}
                >
                  <Autocomplete
                    options={tipos_de_cedula_choices}
                    disabled={loadingEdit}
                    onChange={(event, value) => {
                      setTipoCedula(value);
                      setEditando(true);
                      setTipoCedulaError("");
                    }}
                    fullWidth
                    value={tipoCedula}
                    readOnly={!userInSession?.is_staff}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Tipo cedula"
                        size="small"
                        error={tipoCedulaError}
                        helperText={tipoCedulaError}
                      />
                    )}
                  />
                  <TextField
                    id="userId"
                    size="small"
                    placeholder="Cedula"
                    disabled={loadingEdit}
                    error={cedulaError}
                    helperText={cedulaError}
                    onChange={(o) => {
                      handleChange(o.target.value, setCedula, setCedulaError);
                    }}
                    value={cedula}
                    slotProps={{
                      input: {
                        readOnly: !userInSession?.is_staff,
                      },
                    }}
                    fullWidth
                  />
                </Box>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {retrievingLoding ? (
                <Skeleton
                  variant="text"
                  animation="wave"
                  sx={{
                    fontSize: "20px",
                    width: "30%",
                  }}
                />
              ) : (
                <label>Correo</label>
              )}
              {retrievingLoding ? (
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  sx={{
                    height: 40,
                  }}
                />
              ) : (
                <TextField
                  id="userI"
                  size="small"
                  placeholder="Correo"
                  error={emailError}
                  disabled={loadingEdit}
                  helperText={emailError}
                  fullWidth
                  onChange={(o) => {
                    handleChange(o.target.value, setEmail, setEmailError);
                  }}
                  value={email}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment>
                          <MailIcon
                            sx={{
                              marginRight: "7px",
                            }}
                          />
                        </InputAdornment>
                      ),
                      readOnly: !userInSession?.is_staff,
                    },
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
      {userInSession?.is_staff && (
        <>
          <Divider />
          <CardActions
            sx={{
              justifyContent: "end",
              pr: 2,
            }}
          >
            <Button disabled={!editando} onClick={cancelarEdicion}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              disabled={!editando || loadingEdit}
              onClick={editarUsuario}
            >
              Guardar
              {loadingEdit && (
                <CircularProgress
                  size={20}
                  sx={{
                    position: "absolute",
                  }}
                />
              )}
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default Informacion_personal_card;
