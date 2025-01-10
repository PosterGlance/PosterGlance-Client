import React from "react";
import { Typography, Box } from "@mui/material";
import ExpandableImage from "./ExpandableImage";

const PosterInfo = ({ application }) => {
  const renderInfo = (label, value) => (
    <Box sx={{ paddingBottom: 1 }}>
      {" "}
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        <strong
          style={{ color: "#858585", fontWeight: "600", fontSize: "13px" }}
        >
          {label}
        </strong>{" "}
        <br />
      </Typography>
      <Box>{value || "-"}</Box>
    </Box>
  );

  // 현재 날짜와 만료 날짜 비교 함수
  const isExpired = (expirationDate) => {
    const currentDate = new Date();
    const expiration = new Date(expirationDate);
    return expiration < currentDate;
  };
  // 날짜 형식을 "yyyy년 mm월 dd일"로 변환하는 함수
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", options);
  };

  return (
    <Box sx={{ marginTop: 0 }}>
      {/* 검토 결과 */}
      {application.status !== "대기중" && (
        <Box
          sx={{
            paddingBottom: 2,
            marginBottom: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              marginBottom: 1,
            }}
          >
            <strong style={{ color: "#858585", fontWeight: "500" }}>
              [검토 결과]
            </strong>
          </Typography>
          <Typography variant="body1">
            <strong
              style={{
                color:
                  application.status === "승인"
                    ? "#4caf50"
                    : application.status === "미승인"
                    ? "#FF3B30"
                    : "#858585",
              }}
            >
              {application.status}
            </strong>
          </Typography>

          {/* 검토 결과 추가 내용 */}
          {application.status === "미승인" && (
            <Typography
              variant="body1"
              sx={{
                marginTop: 1,
                border: "1px solid #ccc",
                padding: 1,
                color: "#858585",
              }}
            >
              <strong>반려 사유</strong>
              <br />{" "}
              {application.rejection_reason ||
                "날이 좋아서 날이 좋지 않아서 날이 적당해서."}
            </Typography>
          )}

          {application.status === "승인" && (
            <Typography
              variant="body1"
              sx={{
                marginTop: 1,
                border: "1px solid #ccc",
                padding: 1,
                color: "#858585",
              }}
            >
              <Box>
                해당 포스터 게시 신청에 대한 승인이 완료되었습니다. 포스터 게시
                만료 기간은 {formatDate(application.expiration_date)} 입니다.
              </Box>
              {isExpired(application.expiration_date) && (
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: 1,
                    color: "red", // 붉은 색
                  }}
                >
                  <strong>[게시 기간 만료]</strong>
                  <br />
                  포스터의 게시 기간이 만료되었습니다. 아래의 게시 장소에서
                  포스터를 제거해 주시기 바랍니다.
                  <br />
                  게시장소: {application.display_location}
                </Typography>
              )}
            </Typography>
          )}
        </Box>
      )}
      {/* 신청자 정보 */}
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        <strong style={{ color: "#858585", fontWeight: "500" }}>
          [신청자 정보]
        </strong>
      </Typography>
      {renderInfo("이름", application.title)}
      {renderInfo("연락처", application.contact)}
      {renderInfo("부서", application.department)}

      {/* 포스터 정보 */}
      <Typography
        variant="body1"
        sx={{
          marginBottom: 1,
          marginTop: 1,
          //borderTop: "1px solid #dcdcdc",
          paddingTop: 1,
        }}
      >
        <strong style={{ color: "#858585", fontWeight: "500" }}>
          [포스터 정보]
        </strong>
      </Typography>
      {renderInfo("제목", application.title)}
      <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
        <strong
          style={{ color: "#858585", fontWeight: "600", fontSize: "13px" }}
        >
          사진
        </strong>{" "}
        <br />
      </Typography>
      <Box sx={{ marginBottom: 1 }}>
        <ExpandableImage src={application.poster_img} alt={application.title} />
      </Box>

      {renderInfo("게시 장소", application.display_location)}
    </Box>
  );
};

export default PosterInfo;
