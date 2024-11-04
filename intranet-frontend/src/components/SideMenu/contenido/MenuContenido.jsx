import { useState } from "react"; // Importa el hook useState para manejar el estado
import SubCont from "../subContenidos/SubCont"; // Importa el componente SubCont para mostrar subcontenidos
import "./MenuCon.css"; // Importa estilos CSS

const MenuContenido = ({ nombre, subcontenidos = [] }) => { // Componente que recibe nombre y subcontenidos como props
  const [abrir, setAbrir] = useState(false); // Estado que controla si el menú está abierto o cerrado

  // Función para alternar el estado del menú
  const abrirCerrar = () => {
    abrir ? setAbrir(false) : setAbrir(true); // Cambia el estado entre abierto y cerrado
  };

  return (
    <div className="menu-contenido" style={{ height: abrir ? "auto" : "50px" }}>
      <div
        className={
          abrir ? "menu-contenido-titulo-selected" : "menu-contenido-titulo" // Cambia la clase según si está abierto
        }
        onClick={abrirCerrar} // Al hacer clic, alterna el estado
      >
        {abrir ? (
          <strong style={{ marginLeft: "10px" }}>{nombre}</strong> // Muestra el nombre en negrita si está abierto
        ) : (
          <p style={{ marginLeft: "10px" }}>{nombre}</p> // Muestra el nombre normal si está cerrado
        )}
        {abrir ? ( // Muestra un ícono diferente según si está abierto o cerrado
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="35px"
            fill="var(--OnSecondary-color)"
          >
            <path d="m280-400 200-200.67L680-400H280Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="35px"
            fill="var(--OnsurfaceVariant)"
          >
            <path d="M480-360 280-559.33h400L480-360Z" />
          </svg>
        )}
      </div>
      <SubCont subcontenidos={subcontenidos} /> {/* Muestra los subcontenidos */}
    </div>
  );
};

export default MenuContenido; // Exporta el componente para su uso en otras partes de la aplicación
