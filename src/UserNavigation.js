import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListIcon from "@mui/icons-material/List";
import EditIcon from "@mui/icons-material/Edit";

const UserNavigation = () => {
  const location = useLocation();

  // URL에 따라 value 매핑
  const getValueFromPath = (path) => {
    switch (path) {
      case "/apply":
        return 0;
      case "/waiting":
        return 1;
      case "/usernotifications":
        return 2;
      default:
        return 1; // 기본값
    }
  };

  // 현재 URL에 따라 value를 동적으로 설정
  const [value, setValue] = useState(getValueFromPath(location.pathname));

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
        label="게시신청"
        icon={<EditIcon />}
        component={Link}
        to="/posters/request"
      />
      <BottomNavigationAction
        label="신청현황"
        icon={<ListIcon />}
        component={Link}
        to="/status"
      />
      <BottomNavigationAction
        label="알림"
        icon={<NotificationsIcon />}
        component={Link}
        to="/usernotifications"
      />
    </BottomNavigation>
  );
};

export default UserNavigation;
