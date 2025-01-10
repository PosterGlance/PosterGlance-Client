import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // 뒤로가기 아이콘
import AlertDialog from "./components/AlertDialog";
import PosterInfo from "./components/PosterInfo";

const AdminReviewPage = () => {
  const navigate = useNavigate(); // 뒤로가기 기능을 위한 navigate
  const location = useLocation(); // location을 통해 전달된 데이터를 받음
  const application = location.state; // adminpendinglist에서 전달된 state
  const [status, setStatus] = useState(application.status); // 상태를 관리
  const [isCheckboxMode, setIsCheckboxMode] = useState(false); // 체크박스 화면 여부
  const [otherReason, setOtherReason] = useState(""); // 기타(직접 입력) 텍스트 필드 상태
  const [isOtherChecked, setIsOtherChecked] = useState(false); // 기타(직접 입력) 체크박스 상태
  const [selectedReasons, setSelectedReasons] = useState([]); // 선택된 체크박스 목록 상태

  // Dialog 상태 관리 (최종 제출 및 승인 버튼에 대한 확인을 위한 다이얼로그)
  const [openDialog, setOpenDialog] = useState(false); // 다이얼로그 열기 여부
  const [dialogAction, setDialogAction] = useState(null); // 다이얼로그에서 선택한 액션 (승인 or 최종 제출)

  if (!application) {
    return <Typography>해당 포스터 정보를 찾을 수 없습니다.</Typography>;
  }

  // 제목을 동적으로 변경 (상태에 따라 다르게 표시)
  const appBarTitle =
    status === "대기중"
      ? "승인 검토"
      : status === "승인" || status === "미승인"
      ? "검토 완료"
      : "승인 검토";

  // 반려 버튼 클릭 시 상태 업데이트
  const handleReject = () => {
    setStatus("반려"); // 반려 상태로 변경
    setIsCheckboxMode(true); // 체크박스 화면으로 전환
  };

  // 승인 버튼 클릭 시 상태 업데이트
  const handleApprove = () => {
    setDialogAction("approve"); // 다이얼로그에서 승인 액션 선택
    setOpenDialog(true); // 다이얼로그 열기
  };

  // 이전으로 버튼 클릭 시 // 체크박스 선택한 것과 최종 제출하기 초기화
  const handleBack = () => {
    setStatus("대기중");
    setIsCheckboxMode(false); // 체크박스 화면을 닫고 포스터 정보 화면으로 복귀
    setSelectedReasons([]); // 선택된 체크박스 목록 초기화
    setIsOtherChecked(false); // 기타(직접 입력) 체크박스 초기화
    setOtherReason(""); // 기타(직접 입력) 텍스트 필드 초기화
  };

  // 반려하기(최종) 버튼 클릭 시
  const handleFinalSubmit = () => {
    if (isFinalSubmitEnabled) {
      setDialogAction("submit"); // 다이얼로그에서 최종 제출 액션 선택
      setOpenDialog(true); // 다이얼로그 열기
    }
  };

  // 다이얼로그에서 확인 버튼 클릭 시
  const handleDialogConfirm = () => {
    if (dialogAction === "approve") {
      setStatus("승인");
      console.log("승인 처리");
    } else if (dialogAction === "submit") {
      // 반려 처리
      if (selectedReasons.length > 0 || isOtherChecked) {
        // 선택된 반려 사유 및 기타 이유 처리
        const rejectionReason = [
          ...selectedReasons,
          isOtherChecked ? otherReason : "",
        ]
          .filter(Boolean) // 빈 문자열 제외
          .join(", ");

        // 반려 상태 업데이트
        application.status = "미승인";
        application.rejection_reason = rejectionReason;

        console.log("최종 반려 처리", application);
      }
    }
    setOpenDialog(false);
    navigate(-1); // 이전 페이지로 이동
  };

  // 다이얼로그에서 취소 버튼 클릭 시
  const handleDialogCancel = () => {
    setOpenDialog(false); // 다이얼로그 닫기
  };

  // 기타(직접 입력) 체크박스 상태 변경
  const handleOtherCheckboxChange = (event) => {
    setIsOtherChecked(event.target.checked);
    if (!event.target.checked) {
      setOtherReason(""); // 체크 해제 시 텍스트 필드 초기화
    }
  };

  // 체크박스 상태 변경 처리
  const handleCheckboxChange = (event) => {
    const value = event.target.name;
    if (event.target.checked) {
      setSelectedReasons((prev) => [...prev, value]);
    } else {
      setSelectedReasons((prev) => prev.filter((reason) => reason !== value));
    }
  };

  // 최종 제출 버튼 활성화 조건 확인
  const isFinalSubmitEnabled =
    (selectedReasons.length > 0 && (!isOtherChecked || otherReason)) ||
    (isOtherChecked && otherReason);

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
          // borderBottom: "1px solid #dcdcdc",
          width: "100%", // 전체 너비를 설정
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          {/* 뒤로가기 버튼 */}
          <IconButton
            onClick={() => navigate(-1)} // 뒤로가기 대신 /pending으로 이동
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
              {appBarTitle}
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
        {/* 포스터 정보 나열 화면 */}
        {!isCheckboxMode ? (
          <PosterInfo application={application} />
        ) : (
          // 체크박스 화면
          <Box>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              신청을 반려할게요<br></br>
              반려 사유를 선택해 주세요
              <br></br>
              <br></br>
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  name="포스터 확인 불가"
                  onChange={handleCheckboxChange}
                />
              }
              label="포스터 확인 불가"
              sx={{ display: "block" }} // display: "block"으로 줄바꿈
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="포스터 게시 장소 부적절"
                  onChange={handleCheckboxChange}
                />
              }
              label="포스터 게시 장소 부적절"
              sx={{ display: "block" }} // display: "block"으로 줄바꿈
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isOtherChecked}
                  onChange={handleOtherCheckboxChange}
                />
              }
              label="기타(직접 입력)"
              sx={{ display: "block" }} // display: "block"으로 줄바꿈
            />
            {isOtherChecked && (
              <TextField
                label="반려 사유를 입력해 주세요"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                sx={{ marginTop: 2 }}
              />
            )}
          </Box>
        )}

        {/* 상태에 따라 하단 버튼 */}
        {!isCheckboxMode ? (
          status === "대기중" && ( // 대기중일 때만 반려,승인하기 버튼 뜸
            <Box
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "space-between",
                padding: 0,
                backgroundColor: "white",
                border: "none",
              }}
            >
              <Button
                variant="outlined"
                color="error"
                sx={{
                  width: "50%",
                  border: "none",
                  borderRadius: 0,
                  margin: 0,
                  backgroundColor: "#FF3B30",
                  color: "white",
                  padding: 1.4,
                  fontSize: 17,
                  fontWeight: "bold",
                }}
                onClick={handleReject} // 반려 클릭 시 상태 업데이트
              >
                반려
              </Button>
              <Button
                variant="outlined"
                color="success"
                sx={{
                  width: "50%",
                  border: "none",
                  borderRadius: 0,
                  margin: 0,
                  backgroundColor: "#30DB5B",
                  color: "white",
                  padding: 1.4,
                  fontSize: 17,
                  fontWeight: "bold",
                  height: "52px",
                }}
                onClick={handleApprove} // 승인 클릭 시 상태 업데이트
              >
                승인하기
              </Button>
            </Box>
          )
        ) : (
          // 체크박스 모드에서 보여지는 하단 버튼
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "space-between",
              padding: 0,
              backgroundColor: "white",
              border: "none",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{
                width: "50%",
                border: "none",
                borderRadius: 0,
                margin: 0,
                backgroundColor: "#d9d9d9",
                color: "white",
                padding: 1.4,
                fontSize: 17,
                fontWeight: "bold",
              }}
              onClick={handleBack} // 이전으로 클릭 시 포스터 정보 화면으로 복귀
            >
              이전으로
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                width: "50%",
                border: "none",
                borderRadius: 0,
                margin: 0,
                backgroundColor: "#FF3B30",
                color: "white",
                padding: 1.4,
                fontSize: 17,
                fontWeight: "bold",
                height: "52px", // 고정 높이 설정
                "&:disabled": {
                  backgroundColor: "#FF3B30", // 비활성화 상태에서도 같은 배경색 유지
                  color: "white", // 비활성화 상태에서도 텍스트 색상 동일
                  padding: 1.4, // 비활성화 상태에서 패딩도 동일하게 설정
                  height: "52px", // 비활성화 상태에서도 고정 높이 설정
                },
              }}
              onClick={handleFinalSubmit} // 최종 제출하기 버튼 클릭 시
              disabled={!isFinalSubmitEnabled} // 조건에 따라 버튼 비활성화
            >
              최종 제출하기
            </Button>
          </Box>
        )}
      </Box>

      {/* 다이얼로그 */}
      <AlertDialog
        open={openDialog}
        onClose={handleDialogCancel}
        onConfirm={handleDialogConfirm}
        title={dialogAction === "approve" ? "승인" : "반려"}
        message={
          dialogAction === "approve"
            ? "신청을 승인할까요?"
            : `반려 사유:\n ${selectedReasons.join(",\n ")}${
                isOtherChecked && otherReason
                  ? `\n 기타(직접 입력): ${otherReason}`
                  : ""
              }\n\n신청을 반려할까요?`
        }
        confirmText={dialogAction === "approve" ? "승인" : "반려"}
        cancelText="취소"
      />
    </Box>
  );
};

export default AdminReviewPage;
