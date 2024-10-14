import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/tokenSlice";
export const useFetch = () => {
  const accion = useDispatch();
  const [fetching, setFetching] = useState(null);
  const [error, setError] = useState(false);
  const [ok,setOk] = useState(false)
  const data_ref = useRef([]);
  const fetchUrl = useRef("");



  const fetchInfo = useRef({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  
  const define_fetch = (
    url_var = "",
    url_id_var = "",
    method_var = "GET",
    body_content_var = null
  ) => {
    fetchUrl.current = `${url_var}/${url_id_var}`;
    fetchInfo.current.method = method_var;
    if (body_content_var != null) {
      fetchInfo.current.body = body_content_var =
        JSON.stringify(body_content_var);
    } else {
      delete fetchInfo.current.body;
    }
  };
  const fetch_the_data = async (token) => {
    setFetching(true);
    fetchInfo.current.headers = {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    }
    console.log(fetchInfo.current.headers);
    try {
      const reponse = await fetch(fetchUrl.current, fetchInfo.current);
      const data = await reponse.json();

      if (!reponse.ok) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1000);
      }else{
        setOk(true);
        setTimeout(() => {
          setOk(false);
        }, 1000);
      }

      accion(setToken({ Token: data.token_de_usuario }));

      return [reponse.status, data];
    } catch (error) {
      console.log(error);
      setError(true);
      setOk(false)
      setTimeout(() => {
        setError(false);
      }, 1000);
    } finally {
      setFetching(false);
    }
  };

  const fetch_the_data_without_token = async () => {
    setFetching(true);
    try {
      const reponse = await fetch(fetchUrl.current, fetchInfo.current);
      const data = await reponse.json();

      if (!reponse.ok) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1000);
      }else{
        setOk(true);
        setTimeout(() => {
          setOk(false);
        }, 1000);
      }

      return [reponse.status, data];
    } catch (error) {
      console.log(error);
      setError(true);
      setOk(false)
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
    define_fetch,
    fetch_the_data_without_token,
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
