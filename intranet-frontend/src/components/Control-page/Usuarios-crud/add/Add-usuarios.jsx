import { useFetch } from "../../../../services/llamados";
import Retractile_menu from "../../Retractile_menu/Retractile_menu";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { agregar_usuarios } from "../../../../redux/ControlUsuariosSlice";
import { useCustomNotis } from "../../../../utils/customHooks";
import { set_fetching } from "../../../../redux/FetchsSlice";
import { Autocomplete, TextField } from "@mui/material";
import "./Add_users.css";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { getCookie } from "../../../../utils/Cookies";
import { TIPOS_DE_CEDULA_USUARIOS } from "../../../../utils/Globals.d";

const regex_tipos_cedulas = {
  nacional: (text = "") => {
    const regex = /^\d{9}$/;
    return regex.test(text);
  },
  pasaporte: (text = "") => {
    const regex = /^.{20}$/;
    return regex.test(text);
  },
  extranjera: (text = "") => {
    const regex = /^\d{12}$/;
    return regex.test(text);
  },
};

const Add_usuarios = () => {
  const { fetch_the_data, fetching, ok, error } = useFetch();
  const { roles } = useSelector((state) => state.ControlUsuarios);
  const roles_options = roles?.map((x) => ({
    label: x?.tipo?.toUpperCase(),
    id: x?.id,
  }));

  const tipos_cedula_options = TIPOS_DE_CEDULA_USUARIOS.map((x) => ({
    label: x.toUpperCase(),
    id: x,
  }));

  const { ok_mensaje, error_mensaje } = useCustomNotis(
    "Ocurrio un error",
    "El usuario se agrego con exito"
  );

  const accion = useDispatch();
  const nombre_inpt = useRef();
  const apellidos_inpt = useRef();
  const email_inpt = useRef();
  const cedula_inpt = useRef();
  const nombre_usuario_inpt = useRef();
  const form_ref = useRef();
  const token = getCookie("token");
  const [rol, setRol] = useState(null);
  const [tipoCedula, setTipoCedula] = useState(null);
  const [cedulaValue, setCedulaValue] = useState("");
  const [tipoValidacion, setTipoValidacion] = useState(null);

  useEffect(() => {
    if (tipoCedula != null) {
      switch (tipoCedula.id) {
        case "nacional":
          if (!regex_tipos_cedulas.nacional(cedulaValue)) {
            cedulaValue != "" &&
              setTipoValidacion("Debe tener solo 9 digitos numericos");
          } else {
            setTipoValidacion(null);
          }
          break;
        case "extranjera":
          if (!regex_tipos_cedulas.extranjera(cedulaValue)) {
            cedulaValue != "" &&
              setTipoValidacion("Debe tener solo 12 digitos numericos");
          } else {
            setTipoValidacion(null);
          }
          break;
        case "pasaporte":
          if (!regex_tipos_cedulas.pasaporte(cedulaValue)) {
            cedulaValue != "" &&
              setTipoValidacion("Debe tener solo 20 caracteres");
          } else {
            setTipoValidacion(null);
          }
          break;
        default:
          break;
      }
    } else {
      setTipoValidacion(null);
      setCedulaValue("");
      cedula_inpt.current.value = ''
    }
  }, [tipoCedula, cedulaValue]);

  useEffect(() => {
    accion(set_fetching(fetching));

    return () => {
      accion(set_fetching(false));
    };
  }, [fetching, accion]);

  const agregar_usuario = async (o) => {
    o.preventDefault();
    const nombre = nombre_inpt.current.value.trim();
    const nombre_usuario = nombre_usuario_inpt.current.value.trim();
    const apellidos = apellidos_inpt.current.value.trim();
    const email = email_inpt.current.value.trim();
    const cedula = cedula_inpt.current.value.trim();
    if (
      email != "" &&
      nombre != "" &&
      apellidos != "" &&
      cedula != "" &&
      nombre_usuario != "" &&
      rol != null &&
      tipoCedula != null &&
      tipoValidacion == null
    ) {
      const data = await fetch_the_data(
        "http://localhost:8000/api/register",
        token,
        "POST",
        {
          user_info: {
            first_name: nombre,
            username: nombre_usuario,
            last_name: apellidos,
            email: email,
            cedula: cedula,
            tipo_cedula: tipoCedula?.id,
          },
          user_rol: rol?.id,
        }
      );
      data == undefined && error_mensaje();

      if (data[0] == 201) {
        ok_mensaje();
        accion(agregar_usuarios(data[1]?.user));
        setRol(null);
        setTipoCedula(null);
        setCedulaValue("");
        console.log(data[1]);

        form_ref.current.reset();
      } else {
        error_mensaje();
      }
    }
  };
  return (
    <>
      <Retractile_menu
        altura={81}
        titulo={"Usuarios"}
        loading={fetching}
        ok={ok}
        error={error}
      >
        <form
          className="Add-users-forms"
          onSubmit={agregar_usuario}
          ref={form_ref}
        >
          <TextField
            label={"Nombre"}
            inputRef={nombre_inpt}
            variant="standard"
            size="small"
            required
            disabled={fetching}
          />
          <TextField
            label={"Nombre de usuario"}
            inputRef={nombre_usuario_inpt}
            variant="standard"
            size="small"
            required
            disabled={fetching}
          />
          <TextField
            label={"Apellidos"}
            inputRef={apellidos_inpt}
            variant="standard"
            size="small"
            required
            disabled={fetching}
          />
          <TextField
            type="email"
            label={"Email"}
            required
            inputRef={email_inpt}
            variant="standard"
            size="small"
            disabled={fetching}
          />
          <Autocomplete
            options={tipos_cedula_options}
            onChange={(event, value) => {
              setTipoValidacion(null);
              setTipoCedula(value);
            }}
            disabled={fetching}
            value={tipoCedula}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo de identificacion"
                placeholder="Escoje un tipo de identificacion"
                variant="standard"
                size="small"
                required
              />
            )}
          />
          <TextField
            type="text"
            label={"Cedula"}
            required
            disabled={tipoCedula == null || fetching}
            inputRef={cedula_inpt}
            variant="standard"
            size="small"
            error={Boolean(tipoValidacion)}
            helperText={tipoValidacion}
            onChange={(o) => {
              setCedulaValue(o.target.value);
            }}
          />

          <Autocomplete
            options={roles_options}
            onChange={(event, value) => {
              setRol(value);
            }}
            disabled={fetching}
            value={rol}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Rol inicial"
                placeholder="Escoje un rol"
                variant="standard"
                size="small"
                required
              />
            )}
          />

          <Button type="submit" disabled={Boolean(tipoValidacion)}>
            Subir
          </Button>
        </form>
      </Retractile_menu>
    </>
  );
};

export default Add_usuarios;
