import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getEmailVerify } from "../components/services/common";
import { showSnackbar } from "../features/counter/snackbarSlice";
import { severity } from "../constant/common";
import { useDispatch } from "react-redux";
import { Button, Link, Typography } from "@mui/material";

const Verifyemail = () => {
  const { token, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  console.log(token, id);
  useEffect(() => {
    if (token && id) {
      getEmailVerify(token, id)
        .then((response) => {
          dispatch(
            showSnackbar({
              message: response.data?.message,
              severity: severity.severityMessage,
            })
          );
          setMessage(response.data?.message);
        })
        .catch((error) => {
          console.log("error", error);
          dispatch(
            showSnackbar({
              message: "Somthing went wrong please try after some time.",
              severity: "error",
            })
          );
          setMessage("Somthing went wrong please try after some time.");
        })
        .finally(() => {
          setTimeout(() => {
            navigate("/skillsoop-frontend/login");
          }, 5000);
        });
    }
  });
  return (
    <>
      <Typography variant="h4">{message}</Typography>
      <Button
        variant="contained"
        type="submit"
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 2,
          height: 50,
          width: 150,
          fontWeight: "Bold",
          fontSize: 18,
          textTransform: "none",
        }}
        onClick={() => navigate("/skillsoop-frontend/login")}
      >
        Login
      </Button>
    </>
  );
};

export default Verifyemail;
