import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import BackAppBar from "./components/BackAppBar";
import RenderField from "./components/RenderField";
import AlertDialog from "./components/AlertDialog";
import FixedButton from "./components/FixedButton";

function SignUpAdmin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    adminCode: "", // 관리자가 입력해야 하는 추가 코드
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (updatedData.confirmPassword !== "") {
        if (updatedData.password === updatedData.confirmPassword) {
          setErrorMessage("");
        } else if (name === "password" || name === "confirmPassword") {
          setErrorMessage("비밀번호가 일치하지 않습니다.");
        }
      } else {
        setErrorMessage("");
      }

      return updatedData;
    });
  };

  const validateForm = useCallback(() => {
    const { username, password, confirmPassword, adminCode } = formData;
    return (
      username &&
      password &&
      confirmPassword &&
      adminCode &&
      password === confirmPassword
    );
  }, [formData]);

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData, validateForm]);

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    const { username, password, adminCode } = formData;

    try {
      const response = await fetch("/api/members/signup/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          adminCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("관리자 회원가입 성공!");
        setFormData({
          username: "",
          password: "",
          confirmPassword: "",
          adminCode: "",
        });
      } else {
        setErrorMessage(data.message || "회원가입 실패...");
      }
    } catch (error) {
      setErrorMessage(error.message || "error");
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDialog = () => {
    handleSubmit();
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "hidden",
      }}
    >
      <BackAppBar appBarTitle="관리자 회원가입" />
      {successMessage ? (
        <Box
          sx={{
            marginTop: 20,
            padding: 2,
            textAlign: "center",
            flex: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{ letterSpacing: "3px", fontWeight: "600", fontSize: 20 }}
          >
            POSTERGLANCE
          </Typography>
          <Typography variant="h5">회원가입이 완료되었습니다.</Typography>
          <Typography variant="body1" sx={{ paddingTop: 2, paddingBottom: 15 }}>
            로그인 후 서비스를 이용해 주세요.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ fontSize: 20, width: "100%" }}
            onClick={() => (window.location.href = "/")}
          >
            로그인 하기
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: "56px",
            flex: 1,
            padding: 2,
            paddingBottom: 30,
            paddingTop: 5,
            overflowY: "auto",
          }}
        >
          <form onSubmit={handleSubmit}>
            <RenderField
              label="아이디"
              name="username"
              value={formData.username}
              handleChange={handleChange}
              placeholder="아이디를 입력하세요"
            />
            <RenderField
              label="비밀번호"
              name="password"
              type="password"
              value={formData.password}
              handleChange={handleChange}
              placeholder="비밀번호를 입력하세요"
            />
            <RenderField
              label="비밀번호 확인"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              handleChange={handleChange}
              placeholder="비밀번호를 다시 입력하세요"
            />
            <RenderField
              label="관리자 코드"
              name="adminCode"
              value={formData.adminCode}
              handleChange={handleChange}
              placeholder="관리자 인증 코드를 입력하세요"
            />
            {errorMessage && (
              <Typography color="error">{errorMessage}</Typography>
            )}
          </form>
        </Box>
      )}
      {!successMessage && (
        <FixedButton
          isValid={isValid}
          onClick={handleOpenDialog}
          activeColor="#000000"
          buttonName="가입하기"
        />
      )}
      <AlertDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
        title="관리자 회원가입"
        message="관리자로 회원가입을 진행하시겠습니까?"
        confirmText="가입하기"
        cancelText="취소"
      />
    </Box>
  );
}

export default SignUpAdmin;
