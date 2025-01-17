import React from "react";
import { AppBar, Toolbar, IconButton, Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackAppBar = ({ appBarTitle, onClick }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onClick) {
      onClick(); // 부모에서 전달한 onClick이 있으면 이를 실행
    } else {
      navigate(-1); // 기본 동작은 뒤로 가기
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        width: "100%", // 전체 너비를 설정
        borderBottom: "1px solid #ccc", // bottom border 추가
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        {/* 뒤로가기 버튼 */}
        <IconButton
          onClick={handleBackClick} // 기본은 뒤로가기
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
            {appBarTitle}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default BackAppBar;
