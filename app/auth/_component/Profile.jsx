import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useImmer } from "use-immer";

export default function Profile() {
  const [state, updateState] = useImmer({
    isLogin: true,
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    isLoggedIn: false,
  });
  const onSubmitProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await fetch("/api/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstname: state.firstname,
        lastname: state.lastname,
      }),
    });
  };

  return (
    <Stack
      component="form"
      spacing={2}
      noValidate
      autoComplete="off"
      display="flex"
      alignItems="center"
    >
      <form onSubmit={onSubmitProfile}>
        <input
          type="text"
          value={state.firstname}
          onChange={(e) =>
            updateState((draft) => {
              draft.firstname = e.target.value;
            })
          }
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={state.lastname}
          onChange={(e) =>
            updateState((draft) => {
              draft.lastname = e.target.value;
            })
          }
          placeholder="Last Name"
          required
        />
        <button type="submit">Save Profile</button>
      </form>

      <TextField hiddenLabel variant="filled" />
      <TextField variant="filled" />
    </Stack>
  );
}
