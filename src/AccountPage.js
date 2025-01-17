// AccountPage.js

import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import AlertDialog from "./components/AlertDialog";
import { useAuth } from "./AuthContext";

const AccountPage = () => {
  const navigate = useNavigate();
  const { userType, userId, logout } = useAuth(); // useAuth 훅을 사용하여 필요한 정보와 logout 함수 가져오기
  const [openLoginInfo, setOpenLoginInfo] = useState(false);
  const [openAppInfo, setOpenAppInfo] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogout = () => {
    setOpenDialog(true); // 로그아웃 시 다이얼로그 열기
  };

  const handleConfirmLogout = () => {
    logout(); // 올바른 logout 함수를 호출하여 로그아웃 처리
    navigate("/"); // 로그아웃 후 리디렉션
    setOpenDialog(false); // 다이얼로그 닫기
  };

  const handleCancelLogout = () => {
    setOpenDialog(false); // 취소 시 다이얼로그 닫기
  };

  const handleLoginInfoClick = () => {
    setOpenLoginInfo(!openLoginInfo); // 로그인 정보 클릭 시 펼쳐지도록 처리
  };

  const handleAppInfoClick = () => {
    setOpenAppInfo(!openAppInfo); // 앱 정보 클릭 시 펼쳐지도록 처리
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        p: 0,
        marginTop: "64px",
        width: "100%",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          width: "100%",
          zIndex: 1201,
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => navigate(-1)}
            edge="start"
            color="primary"
            aria-label="back"
            sx={{ marginRight: "16px" }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Typography variant="h6" sx={{ color: "black" }}>
              마이페이지
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <List
        sx={{
          width: "100%",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleLoginInfoClick}>
          <ListItemText primary="로그인 정보" />
          {openLoginInfo ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openLoginInfo} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText
                primary={`타입: ${userType === "admin" ? "관리자" : "사용자"}`}
              />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={`아이디: ${userId}`} />
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: 4,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                width: "100%",
              }}
              onClick={handleLogout}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: "black",
                  textAlign: "center",
                  padding: "10px 0",
                }}
              >
                로그아웃
              </Typography>
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={handleAppInfoClick}>
          <ListItemText primary="앱 정보" />
          {openAppInfo ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAppInfo} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="POSTERGLANCE" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="버전: 1.0.0" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      <AlertDialog
        open={openDialog}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        title="로그아웃"
        message="정말로 로그아웃하시겠습니까?"
        confirmText="로그아웃"
        cancelText="취소"
      />
    </Box>
  );
};

export default AccountPage;
