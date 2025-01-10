import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import logoIcon from "./posterglancelogorect2.png"; // 상대 경로로 이미지 파일 import

const LoginForm = ({ setAuth, setUserType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginType, setLoginType] = useState("admin");

  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleLogin = () => {
    if (loginType === "admin" && username === "admin" && password === "admin") {
      setAuth(true);
      setUserType("admin");
      setError("");
      navigate("/pending"); // 로그인 성공 후 /pending 페이지로 이동
    } else if (
      loginType === "user" &&
      username === "user" &&
      password === "user"
    ) {
      setAuth(true);
      setUserType("user");
      setError("");
      navigate("/status"); // 사용자 로그인 성공 후 /apply 페이지로 이동
    } else {
      setError("아이디나 비밀번호가 잘못되었습니다.");
    }
  };

  const handleTabChange = (event, newValue) => {
    setLoginType(newValue);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 10,
        p: 3,
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <img
          src={logoIcon}
          alt="logo"
          style={{
            height: 41,
          }}
        />
        <Typography
          variant="h6"
          sx={{ letterSpacing: "3px", fontWeight: "600", fontSize: 20 }}
        >
          POSTERGLANCE
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "600", fontSize: 26 }}>
          로그인
        </Typography>
      </div>
      {/* 관리자/사용자 로그인 선택 탭 */}
      <Tabs
        value={loginType}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          mb: 0,
          "& .MuiTabs-indicator": {
            display: "none", // Underline 제거
          },
        }}
      >
        <Tab
          label="관리자 로그인"
          value="admin"
          sx={{
            borderLeft: "1px solid #ccc", // 왼쪽 테두리
            borderTop: "1px solid #ccc", // 상단 테두리
            borderRight: "1px solid #ccc",
            backgroundColor: loginType === "admin" ? "white" : "#f0f0f0", // 선택된 탭 배경색
            color: loginType === "admin" ? "black" : "f9f9f9", // 선택된 탭 텍스트 색상
          }}
        />
        <Tab
          label="사용자 로그인"
          value="user"
          sx={{
            borderRight: "1px solid #ccc", // 왼쪽 테두리
            borderTop: "1px solid #ccc", // 상단 테두리
            backgroundColor: loginType === "user" ? "white" : "#f0f0f0", // 선택된 탭 배경색
            color: loginType === "user" ? "black" : "f9f9f9", // 선택된 탭 텍스트 색상
          }}
        />
      </Tabs>

      {/* 아이디와 비밀번호 입력 */}
      <Box
        sx={{
          border: "1px solid #ccc",
          borderTop: "0px",
          p: 2,
        }}
      >
        <TextField
          label="아이디"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="비밀번호"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        {/* 오류 메시지 */}
        {error && <div style={{ color: "red", marginTop: 1 }}>{error}</div>}
        {/* 로그인 버튼 */}
        <Button
          onClick={handleLogin}
          variant="contained"
          fullWidth
          sx={{
            mb: 2,
            height: 52,
            fontSize: 15,
            fontWeight: 500,
            borderRadius: 1,
          }}
        >
          {loginType === "admin" ? "관리자 로그인" : "사용자 로그인"}
        </Button>
      </Box>

      {/* 회원가입 및 안내 메시지 */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{
          p: 2,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          계정이 없으신가요?
        </Typography>
        <Typography
          variant="body2"
          color="black"
          sx={{
            cursor: "pointer",
          }}
          onClick={() => alert("회원가입 페이지로 이동합니다.")}
        >
          회원가입
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoginForm;
