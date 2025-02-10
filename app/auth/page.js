"use client";

import { Box } from "@mui/material";
import Login from "./_component/Login";
import Signup from "./_component/Singup";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../_redux/profile";

export default function AuthForm() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Box
      maxWidth="700px"
      margin="auto"
      display="grid"
      sx={{ placeItems: "center", minHeight: "100vh", minHeight: "100dvh" }}
    >
      <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
        {isLoggedIn ? (
          <>Logged in</>
        ) : (
          <>
            <Login /> <Signup />
          </>
        )}
      </Box>
    </Box>
  );
}
