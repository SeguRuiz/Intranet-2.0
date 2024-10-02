import React from "react";
import { useEffect } from "react";
import { useFetch } from "../services/llamados";
import { useDispatch } from "react-redux";

const Datosusuarios = async () => {
  const { define_fetch, fetch_the_data_without_token } = useFetch();
  const accion = useDispatch();

  useEffect(() => {
    const usuarios = async () => {
      define_fetch("http://localhost:8000/api/register", "", "GET");
      const prueba = await fetch_the_data_without_token();
      console.log(prueba[1]);
    };
    usuarios();
  }, []);

  return usuarios();
};

export default Datosusuarios;
