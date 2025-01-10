import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import ListIcon from "@mui/icons-material/List";
import NotificationsIcon from "@mui/icons-material/Notifications";

const AdminNavigation = () => {
  const location = useLocation();

  // URL에 따라 value 매핑
  const getValueFromPath = (path) => {
    switch (path) {
      case "/check":
        return 0;
      case "/pending":
        return 1;
      case "/adminnotifications":
        return 2;
      default:
        return 1; // 기본값
    }
  };

  // 현재 URL에 따라 value를 동적으로 설정
  const [value, setValue] = React.useState(getValueFromPath(location.pathname));

  // URL 변경 시 value 업데이트
  useEffect(() => {
    setValue(getValueFromPath(location.pathname));
  }, [location.pathname]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      showLabels
    >
      <BottomNavigationAction
        label="포스터확인"
        icon={<CameraEnhanceIcon />}
        component={Link}
        to="/check"
      />
      <BottomNavigationAction
        label="신청목록"
        icon={<ListIcon />}
        component={Link}
        to="/pending"
      />
      <BottomNavigationAction
        label="알림"
        icon={<NotificationsIcon />}
        component={Link}
        to="/adminnotifications"
      />
    </BottomNavigation>
  );
};

export default AdminNavigation;
