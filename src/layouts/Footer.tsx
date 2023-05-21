import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

type Props = {};

export default function Footer({}: Props) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <footer>
      <Box
        sx={{
          py: 1,
          marginTop: isHome ? "0px" : "200px",
          textAlign: "center",
         
          width: "100%",
          bgcolor: "background.default",
        }}
      >
        <Container>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
           
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CellPhone
          </Typography>
          <Typography variant="caption" component="p">
            Copyright © 2023 Trần Thị Ngọc Diệp
          </Typography>
        </Container>
      </Box>
    </footer>
  );
}
