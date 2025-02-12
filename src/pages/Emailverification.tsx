import { useLocation } from "react-router";
import { emailVerification } from "../components/services/common";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../features/counter/snackbarSlice";
import { severity } from "../constant/common";

const Emailverification = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const email = {
    email: location.state?.email,
    // email: "rockyrayan3@gmail.com",
  };

  const email_Verification = () => {
    emailVerification(email)
      .then((response) => {
        console.log(response);
        setIsButtonDisabled(true);
        setRemainingTime(10);
        dispatch(
          showSnackbar({
            message: response.data?.message,
            severity: severity.severityMessage,
          })
        );
      })
      .catch((error) => {
        dispatch(
          showSnackbar({
            message: error,
            severity: "error",
          })
        );
      });
  };

  useEffect(() => {
    let timer: any;
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setIsButtonDisabled(false);
    }
    return () => clearInterval(timer);
  }, [remainingTime]);

  return (
    <>
      <div
        style={{
          backgroundColor: "#E2DFD2",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              padding: 10,
              borderRadius: 3,
              backgroundColor: "white",
              height: 1 / 2,
            }}
          >
            <Avatar
              sx={{ height: 100, width: 100, margin: "auto" }}
              variant="square"
              src="images/email.png"
            />
            <Typography
              sx={{
                fontSize: 25,
                fontWeight: "medium",
                marginBottom: 2,
              }}
            >
              Check your email for the verification link sent to
            </Typography>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: "medium",
                marginBottom: 3,
              }}
            >
              {email.email}
            </Typography>
            <Button
              variant="contained"
              onClick={() => email_Verification()}
              disabled={isButtonDisabled}
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                height: 50,
                width: 150,
                fontWeight: "Bold",
                fontSize: 14,
                textTransform: "none",
              }}
            >
              {isButtonDisabled
                ? `Resend in ${remainingTime}s`
                : "Resend email"}
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Emailverification;
