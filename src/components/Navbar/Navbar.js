import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { mainNavbarItems } from "./consts/navbarItems";
import { navbarStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Drawer sx={navbarStyles.drawer} variant="permanent" anchor="left">
      <Toolbar />
      <Divider />
      <List>
        {mainNavbarItems.map((item, index) => (
          <Tooltip title={item.label} placement="right-start">
            <ListItem button key={item.id} onClick={() => navigate(item.route)}>
              <ListItemIcon sx={navbarStyles.icons}>{item.icon}</ListItemIcon>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

export default Navbar;
