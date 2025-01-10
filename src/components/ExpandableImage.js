import React, { useState } from "react";

const ExpandableImage = ({ src, alt }) => {
  const [isExpanded, setIsExpanded] = useState(false); // 이미지 확대 여부 상태

  const toggleSize = () => {
    setIsExpanded((prev) => !prev); // 상태를 토글
  };

  return (
    <div
      style={{
        width: "100%", // 부모 컨테이너 너비 설정
        display: "flex",
        // justifyContent: "center", // 이미지 중앙 정렬
        //alignItems: "center",
        overflow: "hidden", // 확대 시 넘치는 부분 숨김
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: isExpanded ? "100%" : "100px", // 상태에 따라 너비 변경
          height: isExpanded ? "auto" : "100px", // 상태에 따라 높이 변경
          objectFit: "cover",
          cursor: "pointer",
          //transition: "all 0.1s ease", // 크기 변경 애니메이션
          paddingBottom: 1,
        }}
        onClick={toggleSize} // 클릭 이벤트
      />
    </div>
  );
};

export default ExpandableImage;
