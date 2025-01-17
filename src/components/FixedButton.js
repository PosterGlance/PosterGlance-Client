import React from "react";
import { Button, Box } from "@mui/material";

const FixedButton = ({
  isValid,
  onClick,
  buttonName,
  activeColor = "#007aff",
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        disabled={!isValid} // isValid 조건에 따라 활성화/비활성화
        sx={{
          width: "100%",
          border: "none",
          borderRadius: 0,
          margin: 0,
          backgroundColor: isValid ? activeColor : "#d9d9d9", // 활성화/비활성화에 따른 배경색
          color: isValid ? "white" : "#858585", // 활성화/비활성화에 따른 텍스트 색상
          padding: 1.4,
          fontSize: 17,
          fontWeight: "bold",
          height: "52px",
          "&:hover": {
            //  backgroundColor: isValid ? "#005bb5" : "#d9d9d9", // 비활성화 시 호버 스타일 유지
          },
        }}
      >
        {buttonName}
      </Button>
    </Box>
  );
};

export default FixedButton;
