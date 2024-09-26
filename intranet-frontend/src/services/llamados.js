import { useRef, useState } from "react";
export const useFetch = () => {
  const [fetching, setFetching] = useState(null);
  const data = useRef([]);
  const fetchUrl = useRef("");
  const [status, setStatus] = useState(false)
  const fetchInfo = useRef({
    method: "GET",
    headers: {
      "Content-Type": "application/json"
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
    }else{
       delete fetchInfo.current.body
    }
  };
  const fetch_the_data = async () => {
    setFetching(true);
    try {
      const reponse = await fetch(fetchUrl.current, fetchInfo.current);
      const data = await reponse.json();
      setStatus(reponse.ok)
      data.current = await data;
      return reponse.status
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
  return {
    data,
    fetch_the_data,
    fetching,
    define_fetch,
    status
  };
};
