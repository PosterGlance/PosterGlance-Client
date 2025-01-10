import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const AlertDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "예", // 기본값 "예"
  cancelText = "아니오", // 기본값 "아니오"
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 2,
          minWidth: "70vw",
        },
        "& .MuiDialogContent-root": {
          whiteSpace: "pre-wrap", // 텍스트 내 줄바꿈 및 공백을 처리
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        {/* 취소 버튼 */}
        <Button
          onClick={onClose}
          color="primary"
          sx={{
            backgroundColor: "#f6f6f6",
            color: "black",
            borderRadius: 2,
            fontSize: 15,
            padding: "5px 20px",
          }}
        >
          {cancelText}
        </Button>
        {/* 확인 버튼 */}
        <Button
          onClick={onConfirm}
          color="primary"
          sx={{
            // fontWeight: "bold",
            backgroundColor: "black",
            color: "white",
            borderRadius: 2,
            fontSize: 15,
            padding: "5px 20px",
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
