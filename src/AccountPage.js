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
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // 뒤로가기 아이콘
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import AlertDialog from "./components/AlertDialog";

const AccountPage = ({ userType, setAuth, userId }) => {
  const navigate = useNavigate();
  const [openLoginInfo, setOpenLoginInfo] = useState(false); // 로그인 정보 펼치기
  const [openAppInfo, setOpenAppInfo] = useState(false); // 앱 정보 펼치기
  const [openDialog, setOpenDialog] = useState(false); // 다이얼로그 열기 상태

  const handleLogout = () => {
    setOpenDialog(true); // 로그아웃 시 다이얼로그 열기
  };

  const handleConfirmLogout = () => {
    setAuth(false);
    navigate("/"); // 로그아웃 후 로그인 화면으로 리디렉션
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
        justifyContent: "flex-start", // 상단에 정렬
        height: "100vh",
        p: 0,
        marginTop: "64px", // AppBar의 높이에 맞게 List가 AppBar 바로 아래에 위치하도록 설정
        width: "100%",
      }}
    >
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          width: "100%", // 전체 너비를 설정
          zIndex: 1201, // List가 AppBar 뒤로 숨지지 않도록 높은 zIndex 설정
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          {/* 뒤로가기 버튼 */}
          <IconButton
            onClick={() => navigate(-1)}
            edge="start"
            color="primary"
            aria-label="back"
            sx={{ marginRight: "16px" }}
          >
            <ArrowBackIcon />
          </IconButton>

          {/* 중앙 정렬된 제목 */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)", // 수평 중앙 정렬
            }}
          >
            <Typography variant="h6" sx={{ color: "black" }}>
              마이페이지
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Nested List */}
      <List
        sx={{
          width: "100%",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {/* 로그인 정보 */}
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
            {/* 로그아웃 버튼을 텍스트 형식으로 변경 */}
            <ListItemButton
              sx={{
                pl: 4,
                display: "flex", // 부모 컨테이너에서 flexbox 사용
                justifyContent: "flex-end", // 우측 정렬
                alignItems: "flex-end", // 하단 정렬
                width: "100%",
              }}
              onClick={handleLogout} // 로그아웃 클릭 시 다이얼로그 열기
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold", // bold 스타일 적용
                  color: "black", // 빨간색 텍스트
                  textAlign: "center",
                  padding: "10px 0", // 적당한 패딩
                }}
              >
                로그아웃
              </Typography>
            </ListItemButton>
          </List>
        </Collapse>

        {/* 앱 정보 */}
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

      {/* 로그아웃 확인 다이얼로그 */}
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
