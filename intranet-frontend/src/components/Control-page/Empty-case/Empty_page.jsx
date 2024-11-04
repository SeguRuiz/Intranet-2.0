import "./Empty-page.css";
import { createContext } from "react";
import { useSelector } from "react-redux";
export const emptyContext = createContext();
const Empty_page = ({ children, className}) => {
  const { empty } = useSelector((x) => x.ControlUsuarios);
  return (
    <>
      {!empty ? (
        <div className={className}>{children}</div>
      ) : (
        <div className="control-page-empty">{children}</div>
      )}
    </>
  );
};

export default Empty_page;
