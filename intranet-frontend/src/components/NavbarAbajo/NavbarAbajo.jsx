import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";

const NavbarAbajo = ({ children, defaultValue = "Default" }) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <BottomNavigation
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      value={value}
      showLabels
      
      sx={{
        height: '100%'
      }}
    >
      {children}
    </BottomNavigation>
  );
};

export default NavbarAbajo;
