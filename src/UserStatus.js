import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useAuth } from "./AuthContext";
import { pendingItems } from "./data"; // Assuming you have imported pendingItems from data.js

const UserStatus = () => {
  const navigate = useNavigate();
  const { user_id } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 서버에서 신청 데이터를 가져오기
    const fetchApplications = async () => {
      try {
        const response = await fetch("/posters/status");
        if (response.ok) {
          const data = await response.json();
          // 필터링: user_id에 해당하는 데이터만 남기기
          const filteredApplications = data.filter(
            (application) => application.user_id === user_id
          );
          setApplications(filteredApplications);
        } else {
          console.error("신청 목록을 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("서버 요청 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user_id]); // user_id가 변경될 때마다 새로운 데이터를 가져오도록 useEffect 의존성 배열에 추가

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">로딩 중...</Typography>
      </Box>
    );
  }

  // Display items based on fetched applications or pending items if no applications
  const displayItems =
    applications.length > 0
      ? applications
      : pendingItems.filter((item) => item.user_id === "user");

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
        신청 현황
      </Typography>

      {displayItems.length > 0 ? (
        <List sx={{ padding: 0 }}>
          {displayItems.map((application) => (
            <ListItem
              key={application.id}
              sx={{
                cursor: "pointer",
                padding: 2,
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                {/* 포스터 이미지 */}
                <img
                  src={application.poster_img}
                  alt={application.title}
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    marginRight: 16,
                  }}
                />
                {/* 포스터 정보 */}
                <Box sx={{ flex: 1 }}>
                  <ListItemText
                    primary={application.title}
                    secondary={`신청일자: ${application.created_at}`}
                  />
                  {/* 상태 버튼 */}
                </Box>
                <Button
                  variant="outlined"
                  sx={{
                    padding: "4px 12px",
                    backgroundColor:
                      application.status === "대기중"
                        ? "#c7c7cc"
                        : application.status === "승인"
                        ? "#4caf50"
                        : application.status === "미승인"
                        ? "#FF3B30"
                        : "transparent", // 기본값 설정
                    color: "white",
                    borderRadius: 0,
                    border: "none",
                    fontWeight: "600",
                  }}
                  //   onClick={() =>
                  //     navigate(`/posters/${application.id}/review`, {
                  //       state: application,
                  //     })
                  //   }
                >
                  {application.status}
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">신청 목록이 없습니다.</Typography>
      )}
    </Box>
  );
};

export default UserStatus;
