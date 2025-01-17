import React from "react";
import { Box, Button } from "@mui/material";

const BottomButtonGroup = ({
  buttons, // 버튼 정보 배열
  sx, // Box 스타일 속성 (옵션)
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        padding: 0,
        backgroundColor: "white",
        border: "none",
        ...sx, // 추가 스타일 병합
      }}
    >
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant="outlined"
          color={button.color || "primary"} // 기본 색상 설정
          sx={{
            width: "50%",
            border: "none",
            borderRadius: 0,
            margin: 0,
            backgroundColor: button.backgroundColor,
            color: button.textColor || "white",
            padding: 1.4,
            fontSize: 17,
            fontWeight: "bold",
            height: "52px", // 고정 높이 설정
            "&:disabled": button.disabledStyle || {}, // 비활성화 상태 스타일 적용
          }}
          onClick={button.onClick}
          disabled={button.disabled}
        >
          {button.text}
        </Button>
      ))}
    </Box>
  );
};

export default BottomButtonGroup;
