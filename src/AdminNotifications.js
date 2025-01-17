import React from "react";
import { Box, Typography } from "@mui/material";
const AdminNotifications = () => {
  return (
    <Box
      sx={{
        marginTop: "59px", // AppBar+1높이와 TabBar 높이를 합한 112px로 탭 아래로 콘텐츠를 내려서 겹치지 않도록 설정
        flex: 1,
        overflowY: "auto", // 세로 스크롤을 활성화한 상태에서 컨텐츠는 스크롤 되도록 함
        padding: 0,
        paddingBottom: 30, // 마지막 아이템 스크롤을 위한 설정
        maxHeight: "calc(100vh - 64px - 56px)", // AppBar, 바텀 네비게이션 높이를 제외한 영역
      }}
    >
      {/* Tab 이름 */}
      <Typography
        variant="body1"
        sx={{
          padding: "10.25px",
          fontSize: "15px",
          fontWeight: "bold",
        }}
      >
        알림
      </Typography>
    </Box>
  );
};

export default AdminNotifications;
