import { useEffect, useRef, useState } from "react";
import { setCookie, getCookie } from "../utils/Cookies";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

export const useFetch = () => {
  const [fetching, setFetching] = useState(null);
  const [error, setError] = useState(false);
  const [ok, setOk] = useState(false);
  const data_ref = useRef([]);

  const [sesion_expirada, set_sesion_expirada] = useState(false);

  useEffect(() => {
    if (sesion_expirada) {
      Swal.fire({
        icon: "info",
        title: "La sesion a expirado",
        confirmButtonText: "Iniciar Sesion",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/";
        }
      });
    }
  }, [sesion_expirada]);

  const fetch_the_data = async (
    url,
    token = null,
    method = "GET",
    body = null,
    id = "",
    formData = null
  ) => {
    let fetch_body = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    body != null
      ? (fetch_body.body = JSON.stringify(body))
      : delete fetch_body?.body;

    formData != null && (fetch_body.body = formData);
    token == null && delete fetch_body.headers?.Authorization;
    formData != null && delete fetch_body.headers["Content-Type"];

    setFetching(true);

    const verificar = await verificar_token(token);

    if (verificar[0] == "refresh_expirado" || token == "") {
      set_sesion_expirada(true);
      return;
    }

    if (verificar[0] && token != null) {
      const token_nuevo = verificar[1];
      fetch_body.headers.Authorization = `Bearer ${token_nuevo}`;
    }

    try {
      const reponse = await fetch(
        id == "" ? `${url}/` : `${url}/${id}`,
        fetch_body
      );
      const data = await reponse.json();

      if (!reponse.ok) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1000);
      } else {
        setOk(true);
        setTimeout(() => {
          setOk(false);
        }, 1000);
      }

      return [reponse.status, data];
    } catch (error) {
      console.log(error);
      setError(true);
      setOk(false);
      setTimeout(() => {
        setError(false);
      }, 1000);
    } finally {
      setFetching(false);
    }
  };

  const log_fetch = async (
    url,
    token = null,
    method = "GET",
    body = null,
    id = ""
  ) => {
    setFetching(true);
    let fetch_body = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    body != null
      ? (fetch_body.body = JSON.stringify(body))
      : delete fetch_body?.body;
    token == null && delete fetch_body.headers?.Authorization;

    try {
      const reponse = await fetch(
        id == "" ? `${url}/` : `${url}/${id}`,
        fetch_body
      );

      if (!reponse.ok) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1000);
        return [reponse.status];
      } else {
        const data = await reponse.json();

        setOk(true);
        setTimeout(() => {
          setOk(false);
        }, 1000);
        return [reponse.status, data];
      }
    } catch {
      setError(true);
      setOk(false);
      setTimeout(() => {
        setError(false);
      }, 1000);
    } finally {
      setFetching(false);
    }
  };

  return {
    ok,
    error,
    data: data_ref.current,
    fetch_the_data,
    fetching,
    log_fetch,
  };
};

export const get = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const delete_fetch = async (url, id) => {
  try {
    fetch(`${url}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.log(error);
  }
};

export const verificar_token = async (token) => {
  try {
    if (isTokenExpired(token)) {
      // aqui si el token expiro lo seteas donde lo estes guardando
      const refresh = getCookie("refresh");

      if (refresh == "") {
        return ["refresh_expirado"];
      }

      const nuevo_token = await refrescar_token(refresh);
      setCookie("token", nuevo_token, 1);
      return [true, nuevo_token];
    } else {
      return [false, ""];
    }
  } catch (error) {
    console.log(error);

    return ["refresh_expirado"];
  }
};

const refrescar_token = async (refresh) => {
  try {
    const response = await fetch("http://localhost:8000/api/token/refresh/", {
      // cambias el link por tu refresh link
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refresh,
      }),
    });
    const data = await response.json();

    return data.access;
  } catch (error) {
    console.log(error);
  }
};

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch {
    return true;
  }
};

export const DecodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};
