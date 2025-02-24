import { Avatar, ImageListItem, ImageListItemBar, Box, IconButton } from "@mui/material";
import { stringAvatar } from "../../../../utils/Utils";
import Eliminar_noticia from "../../delete/Eliminar_noticia";
import { useState } from "react";

const Noticia_img_card = ({ aviso }) => {
  return (
    <ImageListItem key={aviso.id}>
      <img
        srcSet={`${aviso.url}`}
        src={`${aviso.url}`}
        alt={"No se pudo cargar el aviso"}
        loading="lazy"
        style={{
          objectFit: "cover",
          height: "50vh",
        }}
      
      />
      <ImageListItemBar
        title={aviso.img_nombre?.split("/")?.at(-1)?.slice(0, 25)?.concat("...")}
        subtitle={`📆 ${new Date(aviso.fecha_creacion).toLocaleDateString()}`}
        position="top"
        sx={{
          background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        }}
        actionIcon={
          <Box sx={{ mr: 1.5, display: 'flex', alignItems: 'center', gap: '5px' }}>
            
            {aviso?.perfil_url ? (
              <Avatar src={aviso?.perfil_url}  />
            ) : (
              <Avatar
                {...stringAvatar(
                  `${aviso?.usuario_nombre} ${aviso?.usuario_apellidos}`
                )}
              />
            )}
          </Box>
        }
      />
      <Eliminar_noticia id={aviso.id}/>
    </ImageListItem>

  );
};

export default Noticia_img_card;
