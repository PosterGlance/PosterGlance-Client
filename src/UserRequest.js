import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import AlertDialog from "./components/AlertDialog"; // AlertDialog 추가
import ExpandableImage from "./components/ExpandableImage"; // 이미지 확장 컴포넌트
import BackAppBar from "./components/BackAppBar";
import RenderField from "./components/RenderField";
import FixedButton from "./components/FixedButton";
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

  const handleSubmit = () => {
    if (isValid) {
      setDialogOpen(true); // 다이얼로그 열기
    } else {
      console.log("모든 필드를 입력해 주세요.");
    }
  };

  const handleDialogConfirm = async () => {
    try {
      // formData 생성
      const formData = new FormData();
      formData.append("name", application.name);
      formData.append("contact", application.contact);
      formData.append("department", application.department);
      formData.append("title", application.title);
      formData.append("poster_img", application.poster_img); // 파일 첨부
      formData.append(
        "display_location",
        application.display_location.join(", ")
      );
      formData.append("status", "대기중"); // status 추가

      // 서버에 신청 양식 데이터를 전송
      const response = await fetch("/posters/request", {
        method: "POST",
        body: formData, // formData를 그대로 전송
      });

      if (response.ok) {
        console.log("신청이 완료되었습니다.");
        navigate("/success"); // 예시: 성공 페이지로 이동
      } else {
        console.error("서버에 요청을 제출하는 데 실패했습니다.");
        const errorData = await response.json();
        console.error("에러 상세:", errorData);
      }
    } catch (error) {
      console.error("서버 요청 중 오류 발생:", error);
    }

    setDialogOpen(false); // 다이얼로그 닫기
    navigate("/status");
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
      <BackAppBar appBarTitle="게시 신청" />

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
          <RenderField
            label="이름"
            name="name"
            value={application.name}
            handleChange={handleChange}
            placeholder="ex) 홍길동"
            borderBottomColor="#007aff"
          />
          <RenderField
            label="연락처"
            name="contact"
            value={application.contact}
            handleChange={handleChange}
            placeholder="ex) 010-1234-5678"
            borderBottomColor="#007aff"
          />
          <RenderField
            label="부서"
            name="department"
            value={application.department}
            handleChange={handleChange}
            placeholder="ex) 숙명여자대학교 대학혁신단"
            borderBottomColor="#007aff"
          />

          {/* 포스터 정보 */}
          <Typography variant="body1" sx={{ marginBottom: 1, marginTop: 1 }}>
            <strong style={{ color: "#858585", fontWeight: "500" }}>
              [포스터 정보]
            </strong>
          </Typography>
          <RenderField
            label="제목"
            name="title"
            value={application.title}
            handleChange={handleChange}
            placeholder="ex) 교내 캡스톤디자인 경진대회"
            borderBottomColor="#007aff"
          />

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
      <FixedButton
        isValid={isValid}
        onClick={handleSubmit}
        buttonName="신청하기"
      />

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
