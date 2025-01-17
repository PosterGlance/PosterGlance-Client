import React from "react";
import { Box, Typography } from "@mui/material";

const RenderField = ({
  label,
  name,
  value,
  handleChange,
  type = "text",
  placeholder = "",
  borderBottomColor = "#000000",
  marginBottom = 2,
}) => (
  <Box sx={{ marginBottom: marginBottom }}>
    <Typography variant="body1" sx={{ marginBottom: 1 }}>
      <strong style={{ color: "#858585", fontWeight: "600", fontSize: "13px" }}>
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
          borderBottomColor: borderBottomColor,
        },
        "& input:focus": {
          outline: "none",
          borderBottomColor: borderBottomColor,
          borderBottomWidth: "2px",
          backgroundColor: "f5f5f5",
        },
      }}
    >
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required
        placeholder={placeholder}
      />
    </Box>
  </Box>
);

export default RenderField;
