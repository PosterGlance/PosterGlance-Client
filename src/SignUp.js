import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import BackAppBar from "./components/BackAppBar";
import BottomButtonGroup from "./components/BottomButtonGroup"; // BottomButtonGroup import
import RenderField from "./components/RenderField";
import AlertDialog from "./components/AlertDialog";
import FixedButton from "./components/FixedButton";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [currentStep, setCurrentStep] = useState(0); // Step 상태 추가
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isValid, setIsValid] = useState(false); // 유효성 검사 상태 추가
  const [openDialog, setOpenDialog] = useState(false); // AlertDialog 열기 상태 추가

  // BackAppBar의 onClick 함수
  const handleBackClick = () => {
    if (currentStep === 1) {
      setCurrentStep(0); // currentStep이 1일 때는 0으로 변경
    } else {
      window.history.back(); // currentStep이 0일 때는 뒤로가기
    }
  };

  const handleRoleSelect = (role) => {
    setFormData((prevData) => ({ ...prevData, role }));
    if (role === "admin") {
      navigate("/members/signup/admin"); // 관리자는 경로 변경
    } else {
      setCurrentStep(1); // 사용자는 현재 URL에서 진행
    }
  };

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
    const { username, password, confirmPassword, role } = formData;
    return (
      username &&
      password &&
      confirmPassword &&
      role &&
      password === confirmPassword
    );
  }, [formData]);

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData, validateForm]);

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    const { username, password, role } = formData;

    try {
      const response = await fetch("/api/members/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("회원가입 성공!");
        setFormData({
          username: "",
          password: "",
          confirmPassword: "",
          role: "",
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
      <BackAppBar
        appBarTitle={currentStep === 0 ? "회원가입" : "사용자 회원가입"}
        onClick={handleBackClick}
      />
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
      ) : currentStep === 0 ? (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            가입 유형을 선택해 주세요
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginTop: 3,
              border: "1px solid #ccc",
              padding: 1,
              color: "#858585",
            }}
          >
            <strong>Q. 어떤 유형으로 가입해야 하나요?</strong>
            <br /> 교내 게시판에 부착된 포스터의 관리 업무를 맡고 있는 분은
            관리자로 가입해 주시기 바랍니다. 게시판에 포스터를 게시하고자 하는
            분은 사용자로 가입해 주시기 바랍니다.
          </Typography>
          <BottomButtonGroup
            buttons={[
              {
                text: "관리자로 가입",
                color: "primary",
                backgroundColor: "#c7c7cc",
                textColor: "white",
                onClick: () => handleRoleSelect("admin"),
              },
              {
                text: "사용자로 가입",
                color: "success",
                backgroundColor: "#000000",
                textColor: "white",
                onClick: () => handleRoleSelect("user"),
              },
            ]}
          />
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
            {errorMessage && (
              <Typography color="error">{errorMessage}</Typography>
            )}
          </form>
        </Box>
      )}
      {!successMessage && currentStep === 1 && (
        <FixedButton
          isValid={isValid}
          onClick={handleOpenDialog}
          buttonName="가입하기"
        />
      )}
      <AlertDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
        title={`${formData.role === "admin" ? "관리자" : "사용자"} 회원가입`}
        message={`${
          formData.role === "admin" ? "관리자" : "사용자"
        }로 회원가입을 진행하시겠습니까?`}
        confirmText="가입하기"
        cancelText="취소"
      />
    </Box>
  );
}
export default SignUp;
