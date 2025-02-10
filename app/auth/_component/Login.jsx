import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useImmer } from "use-immer";
import { Alert, Button, Snackbar, Typography } from "@mui/material";
import { setProfile } from "../../_redux/profile";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const [state, updateState] = useImmer({
    email: "",
    password: "",
    error: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: state.email, password: state.password }),
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
  React.useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await fetch("/api/user/login", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const {
            profile: { firstname, lastname, userId },
          } = await res.json();
          dispatch(setProfile({ firstname, lastname, userId }));
        } else {
          localStorage.removeItem("token");
        }
      }
    })();
  }, []);

  return (
    <>
      <Stack
        component="form"
        onSubmit={handleLogin}
        spacing={2}
        alignItems="center"
      >
        <Typography variant="h3" component="h3">
          Login
        </Typography>
        <TextField
          value={state.email}
          onChange={(e) =>
            updateState((draft) => {
              draft.email = e.target.value;
            })
          }
          label="Email"
          placeholder="Email"
        />

        <TextField
          value={state.password}
          onChange={(e) =>
            updateState((draft) => {
              draft.password = e.target.value;
            })
          }
          label="Password"
          placeholder="Password"
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
      </Stack>
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
    </>
  );
}
