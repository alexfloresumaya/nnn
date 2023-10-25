import React, { useState } from "react";
import { IconButton, Menu, Divider } from "react-native-paper";

const MenuButton = ({ handleLogout, userEmail }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleOpenMenu = () => setMenuVisible(true);
  const handleCloseMenu = () => setMenuVisible(false);

  return (
    <Menu
      visible={menuVisible}
      onDismiss={handleCloseMenu}
      anchor={
        <IconButton
          icon="account"
          size={28}
          color="white"
          onPress={handleOpenMenu}
        />
      }
    >
      <Menu.Item onPress={handleLogout} title="Cerrar Sesión" />
      <Divider />
      <Menu.Item title={userEmail} />
    </Menu>
  );
};

export default MenuButton;
