import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/tokenSlice";
export const useFetch = () => {
  const accion = useDispatch();
  const [fetching, setFetching] = useState(null);
  const data_ref = useRef([]);
  const fetchUrl = useRef("");
  const [status, setStatus] = useState(false);
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
  const fetch_the_data = async () => {
    setFetching(true);
    try {
      const reponse = await fetch(fetchUrl.current, fetchInfo.current);
      const data = await reponse.json();
      setStatus(reponse.ok);
      accion(setToken({ Token: data.token_de_usuario }));
      return [reponse.status, data];
      console.log(data);
      if (!reponse.ok) {
        console.log(reponse);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  }

    const fetch_the_data_without_token = async () => {
      setFetching(true);
      try {
        const reponse = await fetch(fetchUrl.current, fetchInfo.current);
        const data = await reponse.json();
        setStatus(reponse.ok);
        return [reponse.status, data];
        console.log(data);
        if (!reponse.ok) {
          console.log(reponse);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    };
  ;
  return {
    data: data_ref.current,
    fetch_the_data,
    fetching,
    define_fetch,
    fetch_the_data_without_token,
  };
};
