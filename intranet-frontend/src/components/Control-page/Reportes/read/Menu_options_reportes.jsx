import { IconButton } from "@mui/material";
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { createContext } from "react";

export const MenuContext = createContext();

const Menu_options_reportes = ({ children, customBtn = false, btn, sx }) => {
  const [menu, setMenu] = useState(null);
  const open = Boolean(menu);
  return (
    <>
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
       
        sx={{...sx}}
        onClick={(x) => {
          setMenu(x.currentTarget);
        }}
      >
        {customBtn ? (
          btn
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25px"
            viewBox="0 -960 960 960"
            width="25px"
            fill="#3f4850"
          >
            <path d="M480-360 280-559h400L480-360Z" />
          </svg>
        )}
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={menu}
        open={open}
        onClose={() => {
          setMenu(null);
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuContext.Provider value={{ setMenu }}>
          {children}
        </MenuContext.Provider>
      </Menu>
    </>
  );
};

export default Menu_options_reportes;
