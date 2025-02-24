import { ImageList } from "@mui/material";
import Noticia_img_card from "./Noticia_img_card";

const Noticias_lista = ({ avisos = [] }) => {
  return (
    <ImageList sx={{ width: "100%", height: "100%" }} cols={2}>
      {avisos.map((item) => (
        <Noticia_img_card aviso={item} key={item.id} />
      ))}
    </ImageList>
  );
};

export default Noticias_lista;
