import axios from "axios";

export async function getUsuarios() {
  //funcion que obtiene la informacion de los usuarios
  try {
    const url = "http://localhost:3001/users";
    const response = await axios.get(url);
    const usuarios = response.data;
    return usuarios;
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
}