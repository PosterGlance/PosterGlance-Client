// AuthContext.js

import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState("");

  // 로그아웃 함수 추가
  const logout = () => {
    setAuth(false); // 인증 상태 해제
    setUserType(""); // 사용자 타입 초기화
    setUserId(""); // 사용자 ID 초기화
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        userType,
        setUserType,
        userId,
        setUserId,
        logout,
      }} // logout 함수 제공
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
