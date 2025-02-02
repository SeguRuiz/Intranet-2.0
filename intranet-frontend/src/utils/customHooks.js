import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
// Custom model
export const useCustomModal = (ref) => {
  const openModal = () => {
    ref.current.showModal();
  };
  const closeModal = () => {
    ref.current.close();
  };
  const closeModalDlg = (event) => {
    if (event.target == ref.current) {
      ref.current.close();
    }
  };
  return {
    openModal,
    closeModal,
    closeModalDlg,
  };
};

// Seleccionar multiple items
export const useCustomSelection = (
  eliminar,
  subir,
  id_seleccion,
  seleccion_dependencia
) => {
  const [selected, setSelected] = useState(false);
  const accion = useDispatch();

  useEffect(() => {
    setSelected(false);
  }, [seleccion_dependencia]);

  const click_Checkbox = () => {
    if (selected && seleccion_dependencia) {
      setSelected(false);
      accion(eliminar(id_seleccion));
    } else if (!selected && seleccion_dependencia) {
      accion(subir(id_seleccion));
      setSelected(true);
    }
  };

  return {
    selected,
    click_Checkbox,
    setSelected
  };
};

export const useCustomNotis = (
  error = "error",
  success = "ok"
) => {
  const ok_mensaje = () => toast.success(success);
  const error_mensaje = () => toast.error(error);

  return {
    ok_mensaje,
    error_mensaje,
  };
};

export const useContainerDimensions = (myRef) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const getDimensions = () => ({
      width: myRef.current.offsetWidth,
      height: myRef.current.offsetHeight
    })

    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (myRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return dimensions;
};