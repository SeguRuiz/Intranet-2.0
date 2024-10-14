import { useEffect, useRef } from "react";

const Role_options = ({ id, value, rol_id }) => {
  const option_ref = useRef()

  useEffect(()=>{ 
    if ( id == rol_id && rol_id != null){
        console.log(id);
        option_ref.current.selected = true
    }
  },[])
  return (
    <>
    <option name={value} id={id} value={value} ref={option_ref}>
      {value}
    </option>
    </>
  );
};

export default Role_options;
