import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Tabs,
  Tab,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { pendingItems } from "./data";

const ApplicationList = ({ applications, navigate }) => (
  <List sx={{ padding: 0 }}>
    {applications.map((application) => (
      <ListItem
        key={application.poster_id}
        sx={{
          cursor: "pointer",
          padding: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
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
          <Box sx={{ flex: 1 }}>
            <ListItemText
              primary={application.title}
              secondary={
                application.status === "대기중"
                  ? `신청일자: ${application.created_at}`
                  : `만료일자: ${application.expiration_date}`
              }
            />
          </Box>
          {/* 버튼에 onClick 이벤트 추가 */}
          <Button
            variant="outlined"
            sx={{
              padding: "4px 12px",
              backgroundColor:
                application.status === "대기중"
                  ? "#ffcc00"
                  : application.status === "승인"
                  ? "#4caf50"
                  : application.status === "미승인"
                  ? "#c7c7cc"
                  : "transparent", // 기본값 설정
              color: "white",
              borderRadius: 0,
              border: "none",
              fontWeight: "600",
            }}
            onClick={() =>
              navigate(`/posters/${application.poster_id}/review`, {
                state: application,
              })
            }
          >
            {application.status}
          </Button>
        </Box>
      </ListItem>
    ))}
  </List>
);

const PendingList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    if (location.pathname === "/posters/pending") {
      setActiveTab("pending");
    } else if (location.pathname === "/posters/status") {
      setActiveTab("completed");
    }
  }, [location.pathname]);

  const pendingItemsFiltered = pendingItems.filter(
    (application) => application.status === "대기중"
  );

  const completedApplicationsFiltered = pendingItems
    .filter((application) => application.status !== "대기중")
    .sort((a, b) => new Date(a.expiration_date) - new Date(b.expiration_date));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "hidden", // 세로 스크롤 비활성화
      }}
    >
      {/* 고정된 탭 영역 */}
      <Box
        sx={{
          position: "fixed", // 고정 위치로 설정
          top: "57px", // AppBar+1(borderline) 높이만큼 아래로 내려서 겹침 방지
          left: 0,
          right: 0,
          zIndex: 1200,
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "white", // 탭 배경을 흰색으로 설정하여 다른 내용과 겹치지 않도록 함
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          aria-label="tabs"
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": {
              height: 3, // 밑줄 굵기 설정
              //  backgroundColor: "#007aff", // 밑줄 색상 설정
            },
          }}
        >
          <Tab
            label="승인 대기"
            value="pending"
            sx={{
              fontSize: "15px",
              fontWeight: activeTab === "pending" ? "bold" : "normal", // 선택된 탭은 굵게
            }}
          />
          <Tab
            label="검토 완료"
            value="completed"
            sx={{
              fontSize: "15px",
              fontWeight: activeTab === "completed" ? "bold" : "normal", // 선택된 탭은 굵게
            }}
          />
        </Tabs>
      </Box>

      {/* 탭 고정 후 나머지 콘텐츠 영역 */}
      <Box
        sx={{
          marginTop: "107px", // AppBar+1높이와 TabBar 높이를 합한 112px로 탭 아래로 콘텐츠를 내려서 겹치지 않도록 설정
          flex: 1,
          overflowY: "auto", // 세로 스크롤을 활성화한 상태에서 컨텐츠는 스크롤 되도록 함
          padding: 0,
          paddingBottom: 30, // 마지막 아이템 스크롤을 위한 설정
          maxHeight: "calc(100vh - 64px - 48px - 56px)", // AppBar, 탭, 바텀 네비게이션 높이를 제외한 영역
        }}
      >
        {activeTab === "pending" && (
          <ApplicationList
            applications={pendingItemsFiltered}
            navigate={navigate}
          />
        )}
        {activeTab === "completed" && (
          <ApplicationList
            applications={completedApplicationsFiltered}
            navigate={navigate}
          />
        )}
      </Box>
    </Box>
  );
};

export default PendingList;
