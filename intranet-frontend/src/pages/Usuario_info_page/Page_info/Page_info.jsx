import React from "react";
import { Paper, Divider, Typography } from "@mui/material";
const Page_info = ({ current_page, pages = {} }) => {
  return (
   
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: 'sticky',
        zIndex: 2,
        top: 0,
        pl: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
          letterSpacing: "3px",
          fontSize: "30px",
          margin: 0,
        }}
      >
       {pages[`${current_page}`]?.title}
      </Typography>
      <Typography
        sx={{
          margin: 0,
        }}
      >
        {pages[`${current_page}`]?.subheader}
      </Typography>
      
    </Paper>
  
   
  );
};

export default Page_info;
