import { useState } from "react";
import "./Dropdown.css";
const Drop_down = ({ children }) => {
  const [abrir, setAbrir] = useState(false);
  console.log(children);
  
  return (
    <div
      className="dropdown-container"
      onMouseOver={() => {
        setAbrir(true);
      }}
      onMouseLeave={() => {
        setAbrir(false);
      }}
    >
      <svg
        className="submenu-icon"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="var(--OnSecondary-color)"
      >
        <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
      </svg>
      <div className="select-area"  style={{ display: abrir ? "block" : "none" }}>
      <div
        className="submenu-content-menu"
        
       
      >
        {children}
      </div>
      </div>
    </div>
  );
};

export default Drop_down;
