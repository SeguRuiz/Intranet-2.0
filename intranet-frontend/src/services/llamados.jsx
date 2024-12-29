export async function getUsuarios() {
  //funcion que obtiene la informacion de los usuarios
  try {
    const url = "http://localhost:8000/api/login/";
    const response = await fetch(url, {});
    const usuarios = response.json();
    return usuarios;
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
}
