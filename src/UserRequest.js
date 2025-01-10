import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AlertDialog from "./components/AlertDialog"; // AlertDialog 추가
import ExpandableImage from "./components/ExpandableImage"; // 이미지 확장 컴포넌트

const UserRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null); // 상태 추가
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isValid, setIsValid] = useState(false); // 유효성 상태
  const [application, setApplication] = useState({
    name: "",
    contact: "",
    department: "",
    poster_img: null,
    title: "",
    display_location: [],
    status: "대기중",
  });

  const locations = [
    "과학관",
    "명신관",
    "백주년기념관",
    "사회교육관",
    "새힘관",
    "수련교수회관",
    "순헌관",
    "중앙도서관",
    "진리관",
    "체육관",
    "학생회관",
  ];

  // 유효성 검사 함수
  const validateForm = React.useCallback(() => {
    return (
      Object.values(application).every((value) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== null && value !== undefined && value !== "";
      }) && application.poster_img
    );
  }, [application]);

  useEffect(() => {
    setIsValid(validateForm());
  }, [validateForm, application]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setApplication((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setApplication((prev) => ({ ...prev, poster_img: file }));
  };

  const handleLocationToggle = (location) => {
    setApplication((prev) => {
      const isSelected = prev.display_location.includes(location);
      const newLocations = isSelected
        ? prev.display_location.filter((loc) => loc !== location)
        : [...prev.display_location, location];
      return { ...prev, display_location: newLocations };
    });
  };

  const renderField = (label, name, type = "text", placeholder = "") => (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        <strong
          style={{ color: "#858585", fontWeight: "600", fontSize: "13px" }}
        >
          {label}
        </strong>
      </Typography>
      <Box
        component="div"
        sx={{
          position: "relative",
          "& input": {
            width: "100%",
            padding: "16px 8px",
            border: "none",
            borderRadius: 0,
            borderBottom: "1px solid #ccc",
            backgroundColor: "#f5f5f5",
            fontSize: "18px",
          },
          "& input:hover": {
            borderBottomColor: "#007aff",
          },
          "& input:focus": {
            outline: "none",
            borderBottomColor: "#007aff",
            borderBottomWidth: "2px",
          },
        }}
      >
        <input
          type={type}
          name={name}
          value={application[name]}
          onChange={handleChange}
          required
          placeholder={placeholder}
        />
      </Box>
    </Box>
  );

  const handleSubmit = () => {
    // formData 상태 업데이트
    const newFormData = new FormData();
    newFormData.append("name", application.name);
    newFormData.append("contact", application.contact);
    newFormData.append("department", application.department);
    newFormData.append("title", application.title);
    newFormData.append("poster_img", application.poster_img); // 파일 첨부
    newFormData.append(
      "display_location",
      application.display_location.join(", ")
    );
    newFormData.append("status", "대기중"); // status 추가

    setFormData(newFormData); // 상태 업데이트
    if (isValid) {
      setDialogOpen(true); // 다이얼로그 열기
    } else {
      console.log("모든 필드를 입력해 주세요.");
    }
  };

  const handleDialogConfirm = async () => {
    if (!formData) {
      console.error("formData가 비어있습니다.");
      return;
    }
    setDialogOpen(false); // 다이얼로그 닫기
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
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          width: "100%",
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => navigate("/")}
            edge="start"
            color="primary"
            aria-label="back"
            sx={{ marginRight: "16px" }}
          >
            <ArrowBackIcon />
          </IconButton>
          {/* 중앙 정렬된 제목 */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)", // 수평 중앙 정렬
            }}
          >
            <Typography variant="h6" sx={{ color: "black" }}>
              게시 신청
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 중앙 콘텐츠 */}
      <Box
        sx={{
          marginTop: "56px",
          flex: 1,
          padding: 2,
          paddingBottom: 30,
          overflowY: "auto",
        }}
      >
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          <strong style={{ color: "#858585", fontWeight: "500" }}>
            [신청자 정보]
          </strong>
        </Typography>

        <form>
          {renderField("이름", "name", "text", "ex) 홍길동")}
          {renderField("연락처", "contact", "text", "ex) 010-1234-5678")}
          {renderField(
            "부서",
            "department",
            "text",
            "ex) 숙명여자대학교 대학혁신단"
          )}

          {/* 포스터 정보 */}
          <Typography variant="body1" sx={{ marginBottom: 1, marginTop: 1 }}>
            <strong style={{ color: "#858585", fontWeight: "500" }}>
              [포스터 정보]
            </strong>
          </Typography>
          {renderField(
            "제목",
            "title",
            "text",
            "ex) 교내 캡스톤디자인 경진대회"
          )}

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong
                style={{
                  color: "#858585",
                  fontWeight: "600",
                  fontSize: "13px",
                }}
              >
                사진
              </strong>
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            {application.poster_img && (
              <Box sx={{ marginTop: 1 }}>
                <ExpandableImage
                  src={URL.createObjectURL(application.poster_img)}
                  alt={application.title}
                />
              </Box>
            )}
          </Box>

          {/* 게시 장소 */}
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong
                style={{
                  color: "#858585",
                  fontWeight: "600",
                  fontSize: "13px",
                }}
              >
                게시 장소
              </strong>
            </Typography>
            <Box
              sx={{
                padding: 1,
                border: "1px solid #ccc",
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {locations.map((location) => (
                <Button
                  key={location}
                  variant={
                    application.display_location.includes(location)
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => handleLocationToggle(location)}
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    padding: "4px 16px",
                    color: application.display_location.includes(location)
                      ? "#ffffff"
                      : "#000000",
                    backgroundColor: application.display_location.includes(
                      location
                    )
                      ? "#007aff"
                      : "#d9d9d9",
                    border: "none",
                    boxShadow: "none",
                  }}
                >
                  {location}
                </Button>
              ))}
            </Box>
          </Box>
          <Typography
            variant="body1"
            sx={{
              marginTop: 7,
              border: "1px solid #ccc",
              padding: 1,
              color: "#858585",
            }}
          >
            포스터는 신청 승인이 완료된 후부터 게시가 가능합니다. 게시 만료
            기간은 승인일로부터 3주입니다. 신청을 제출한 후에는 취소가
            불가능하므로, 신청 전 기재 사항을 다시 한 번 확인해 주시기 바랍니다.
          </Typography>
        </form>
      </Box>

      {/* 하단 고정 버튼 */}
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
          onClick={handleSubmit}
          disabled={!isValid} // isValid 조건에 따라 활성화/비활성화
          sx={{
            width: "100%",
            border: "none",
            borderRadius: 0,
            margin: 0,
            backgroundColor: isValid ? "#007aff" : "#d9d9d9", // 활성화/비활성화에 따른 배경색
            color: isValid ? "white" : "#858585", // 활성화/비활성화에 따른 텍스트 색상
            padding: 1.4,
            fontSize: 17,
            fontWeight: "bold",
            height: "52px",
            "&:hover": {
              backgroundColor: isValid ? "#005bb5" : "#d9d9d9", // 비활성화 시 호버 스타일 유지
            },
          }}
        >
          신청하기
        </Button>
      </Box>

      {/* AlertDialog Component */}
      <AlertDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDialogConfirm}
        title="신청 확인"
        message="신청을 제출하면 다시 수정할 수 없어요. 제출할까요?"
        confirmText="네, 제출할래요"
        cancelText="취소"
      />
    </Box>
  );
};

export default UserRequest;
