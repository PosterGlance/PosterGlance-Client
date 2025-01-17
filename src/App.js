import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import MenuAppBar from "./MenuAppBar";
import AdminNavigation from "./AdminNavigation";
import UserNavigation from "./UserNavigation";
import LoginForm from "./LoginForm";
import AdminCheck from "./AdminCheck";
import AdminPendingList from "./AdminPendingList";
import AdminNotifications from "./AdminNotifications";
import UserNotifications from "./UserNotifications";
import UserRequest from "./UserRequest";
import UserStatus from "./UserStatus";
import AccountPage from "./AccountPage";
import theme from "./theme";
import AdminReviewPage from "./AdminReviewPage";
import SignUp from "./SignUp";
import SignUpAdmin from "./SignUpAdmin"; // SignUpAdmin 컴포넌트 import
import { AuthProvider, useAuth } from "./AuthContext";
function App() {
  const [auth, setAuth] = useState(false);
  const [userType, setUserType] = useState(""); // "admin" or "user"

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        {/* AuthProvider로 감싸서 상태를 전역으로 사용 */}
        <Router>
          <AppWithLocation />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppWithLocation() {
  const { auth, setAuth, userType, setUserType } = useAuth();
  const location = useLocation();

  // 각 경로에 대한 조건부 렌더링을 별도로 처리
  const adminRoutes = (
    <>
      <Route path="/check" element={<AdminCheck />} />
      <Route path="/pending" element={<AdminPendingList />} />
      <Route path="/posters/:id/review" element={<AdminReviewPage />} />
      <Route path="/adminnotifications" element={<AdminNotifications />} />
    </>
  );

  const userRoutes = (
    <>
      <Route path="/posters/request" element={<UserRequest />} />
      <Route path="/status" element={<UserStatus />} />
      {/* <Route path="/posters/:id/review" element={<AdminReviewPage />} /> */}
      <Route path="/usernotifications" element={<UserNotifications />} />
    </>
  );

  return (
    <div>
      {/* MenuAppBar: 로그인된 경우만 표시 */}
      {auth && <MenuAppBar setAuth={setAuth} userType={userType} />}

      {/* 메인 콘텐츠 영역역 */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <Routes>
          {/* 로그인 폼 */}
          {!auth && (
            <Route
              path="/"
              element={
                <LoginForm setAuth={setAuth} setUserType={setUserType} />
              }
            />
          )}
          {/*회원가입 페이지 추가*/}
          <Route path="/members/signup" element={<SignUp />} />
          <Route path="/members/signup/admin" element={<SignUpAdmin />} />

          {/* 관리자 페이지 */}
          {auth && userType === "admin" && adminRoutes}

          {/* 사용자 페이지 */}
          {auth && userType === "user" && userRoutes}

          {/* 공통: 계정 페이지 */}
          {auth && (
            <Route
              path="/account"
              element={<AccountPage userType={userType} setAuth={setAuth} />}
            />
          )}
        </Routes>
      </div>

      {/* Bottom Navigation */}
      {/* AdminReviewPage나 AccountPage가 아닐 경우에만 표시 */}
      {auth &&
        !["/posters/request", "/account"].some((path) =>
          location.pathname.includes(path)
        ) &&
        !/\/posters\/\d+\/review/.test(location.pathname) && (
          <div>
            {userType === "admin" ? <AdminNavigation /> : <UserNavigation />}
          </div>
        )}
    </div>
  );
}

export default App;
