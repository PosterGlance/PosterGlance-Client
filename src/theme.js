import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // primary 색상을 black으로 설정
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // Ripple 효과 제거
      },
    },
    // BottomNavigationAction 스타일 설정
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          "&:active": {
            backgroundColor: "transparent", // 눌렀을 때 배경색 제거
          },
          color: "#9e9e9e", // 선택되지 않은 상태에서의 색상
          "&:hover": {
            color: "black", // hover 시 색상 변경
          },
          "&.Mui-selected": {
            color: "black", // 선택 시 색상 변경
          },
          "& .MuiSvgIcon-root": {
            fontSize: "32px", // 아이콘 크기 조정
          },
        },
      },
    },
    // BottomNavigation의 스타일 설정
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          position: "fixed",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #dcdcdc", // 경계선 설정
        },
      },
    },
    // Tab 컴포넌트 스타일 설정
    MuiTabs: {
      styleOverrides: {
        root: {
          "&:active": {
            backgroundColor: "transparent", // 눌렀을 때 배경색 제거
          },
          "& .Mui-selected": {
            color: "black", // 선택된 탭 텍스트 색상
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "black", // 탭 선택 시 밑줄 색상
          },
        },
      },
    },
    // Tab의 스타일 설정
    MuiTab: {
      styleOverrides: {
        root: {
          color: "gray", // 기본 탭 색상
          "&:hover": {
            color: "black", // hover 시 텍스트 색상 변경
          },
        },
      },
    },
  },
});

export default theme;
