import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useImmer } from "use-immer";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile, setProfile } from "../../_redux/profile";

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const [state, updateState] = useImmer({
    firstname: "",
    lastname: "",
    submiting: false,
    changeProfileDialog: false,
  });
  const onSubmitProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    updateState((draft) => {
      draft.submiting = true;
    });
    const res = await fetch("/api/user/profile", {
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
    if (res.ok) {
      const {
        profile: { firstname, lastname, userId },
      } = await res.json();
      dispatch(setProfile({ firstname, lastname, userId }));
    }
    updateState((draft) => {
      draft.submiting = false;
      draft.changeProfileDialog = false;
      draft.firstname = "";
      draft.lastname = "";
    });
  };
  const onChangeProfile = () => {
    updateState((draft) => {
      draft.changeProfileDialog = true;
    });
  };
  return (
    <Box>
      <Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>نام</TableCell>
                <TableCell align="right">نام خانوادگی</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{profile.firstname}</TableCell>
                <TableCell align="right">{profile.lastname}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Button onClick={onChangeProfile}>change profile</Button>
      <Dialog open={state.changeProfileDialog}>
        <Stack
          component="form"
          spacing={2}
          noValidate
          autoComplete="off"
          display="grid"
          sx={{ placeItems: "center", padding: 2 }}
          onSubmit={onSubmitProfile}
        >
          <TextField
            type="text"
            value={state.firstname}
            onChange={(e) =>
              updateState((draft) => {
                draft.firstname = e.target.value;
              })
            }
            label="نام"
            required
          />
          <TextField
            value={state.lastname}
            onChange={(e) =>
              updateState((draft) => {
                draft.lastname = e.target.value;
              })
            }
            label="نام خانوادگی"
            required
          />
          <Button
            type="submit"
            disabled={state.submiting}
            sx={{ minHeight: 40 }}
            fullWidth
          >
            {state.submiting ? <CircularProgress size={10} /> : "ذخیره"}
          </Button>
        </Stack>
      </Dialog>
    </Box>
  );
}
