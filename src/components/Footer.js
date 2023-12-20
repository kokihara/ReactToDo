import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterBox = styled(Box)({
  width: "100%",
  height: 56,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#FFF",
  backgroundColor: "#1976d2",
  position: "fixed",
  bottom: 0,
  fontWeight: "bold",
  fontSize: "22px",
});

const Footer = () => {
  return <FooterBox>copyright こーら</FooterBox>;
};
export default Footer;
