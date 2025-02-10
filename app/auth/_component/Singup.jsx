import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useImmer } from "use-immer";
import { Alert, Button, Snackbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setProfile } from "../../_redux/profile";

export default function Signup() {
  const dispatch = useDispatch();
  const [state, updateState] = useImmer({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    error: "",
  });
  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: state.email,
        password: state.password,
        firstname: state.firstname,
        lastname: state.lastname,
      }),
    });
    if (res.ok) {
      const {
        token,
        profile: { firstname, lastname, userId },
      } = await res.json();
      localStorage.setItem("token", token);
      dispatch(setProfile({ firstname, lastname, userId }));
    } else {
      const error = await res.json();
      updateState((draft) => {
        draft.error = error.message;
      });
    }
  };
  const onCloseSnackbar = () => {
    updateState((draft) => {
      draft.error = "";
    });
  };
  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={handleSignup}
      display="flex"
      alignItems="center"
    >
      <Typography variant="h3" component="h3">
        Signup
      </Typography>
      <TextField
        type="email"
        value={state.email}
        onChange={(e) =>
          updateState((draft) => {
            draft.email = e.target.value;
          })
        }
        placeholder="Email"
        label="Email"
        required
      />
      <TextField
        type="text"
        value={state.firstname}
        onChange={(e) =>
          updateState((draft) => {
            draft.firstname = e.target.value;
          })
        }
        placeholder="Firstname"
        label="Firstname"
        required
      />
      <TextField
        type="text"
        value={state.lastname}
        onChange={(e) =>
          updateState((draft) => {
            draft.lastname = e.target.value;
          })
        }
        placeholder="Lastname"
        labe="Lastname"
        required
      />
      <TextField
        type="password"
        value={state.password}
        onChange={(e) =>
          updateState((draft) => {
            draft.password = e.target.value;
          })
        }
        placeholder="Password"
        label="Password"
        required
      />
      <Button variant="contained" color="info" type="submit">
        Signup
      </Button>
      <Snackbar
        open={!!state.error}
        autoHideDuration={6000}
        onClose={onCloseSnackbar}
        message={state.error}
      >
        <Alert
          onClose={onCloseSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {state.error}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
