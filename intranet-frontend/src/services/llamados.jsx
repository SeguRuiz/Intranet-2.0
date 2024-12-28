export async function getUsuarios() {
  //funcion que obtiene la informacion de los usuarios
  try {
    const url = "https://intranet-2-0-api.onrender.com/api/login/";
    const response = await fetch(url, {});
    const usuarios = response.json();
    return usuarios;
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
}
