import { useState } from "react";
import { Drawer, Box, Button } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const SideMenuMobile = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button startIcon={<ArrowUpwardIcon></ArrowUpwardIcon>} fullWidth sx={{
        borderRadius: 0,
        backgroundColor: 'var(--PrymaryContainer-color)'
      }} variant='contained' onClick={()=>{
        setOpen(true)
      }}>
        Ver contenidos
      </Button>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        anchor="bottom"
        sx={{
          scrollbarColor:
            "var(--OnPrymary-color) var(--PrymaryContainer-color)",
          scrollbarWidth: "thin",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,

            zIndex: 3,
          }}
        >
          <Button
            startIcon={<ArrowDownwardIcon />}
            fullWidth
            variant="contained"
            sx={{
              borderRadius: "0px",
              background: "var(--SecondaryContainer-color)",
              color: "var(--OnSecondary-color)",
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            Cerrar
          </Button>
        </Box>
        <Box
          sx={{
            maxHeight: "50vh",
          }}
        >
          {children}
        </Box>
      </Drawer>
    </>
  );
};

export default SideMenuMobile;
