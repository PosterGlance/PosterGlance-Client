import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import logoIcon from "./posterglancelogorect2.png"; // 로고 이미지

const MenuAppBar = () => {
  const navigate = useNavigate();

  const handleAccountPage = () => {
    navigate("/account"); // 계정 페이지로 이동
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          //    borderBottom: "1px solid #dcdcdc",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src={logoIcon}
            alt="logo"
            style={{ height: 41, marginRight: "16px" }} // 로고 크기 조정
          />
          <IconButton
            size="large"
            aria-label="account"
            onClick={handleAccountPage}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuAppBar;
