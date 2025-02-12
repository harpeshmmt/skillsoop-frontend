import {
  Box,
  Grid2,
  TextField,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  login,
  emailVerification,
  forgotPassword,
} from "../components/services/common";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { showSnackbar } from "../features/counter/snackbarSlice";
import SnackbarComponent from "../MUI/Snackbar";
import { severity, severityerror } from "../constant/common";
import { handleFieldErrors } from "../utils/helper";

const SignupSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});

const Forgotpassword = () => {
  const [isEmailNotConfirmed, setIsEmailNotConfirmed] = useState(false);
  const [isAccountInactive, setIsAccountInactive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  //   const email = {
  //     email: watch("email"),
  //   };

  const onSubmit = async (data: any) => {
    const payload = { ...data };

    try {
      const response = await forgotPassword(payload);

      const successMessage = response.data.message;
      dispatch(
        showSnackbar({
          message: successMessage,
          severity: severity.severityMessage,
        })
      );
    } catch (error: any) {
      const { email } = error?.response?.data?.errors;
      const errorMessage = email?.error;
      if (errorMessage) {
        handleErrorResponse(
          errorMessage,
          setIsEmailNotConfirmed,
          setIsAccountInactive,
          dispatch
        );
      } else if (errors) {
        handleFieldErrors(errors, setError);
      }
    }
  };

  const handleErrorResponse = (
    errorMessage,
    setIsEmailNotConfirmed,
    setIsAccountInactive,
    dispatch
  ) => {
    dispatch(
      showSnackbar({
        message: errorMessage,
        severity: severityerror.severityMessage,
      })
    );

    if (errorMessage === "Email is not confirmed yet!.") {
      setIsEmailNotConfirmed(true);
      setIsAccountInactive(false);
    } else if (errorMessage === "Your account is not active.") {
      setIsAccountInactive(true);
      setIsEmailNotConfirmed(false);
    }
  };

  //   const userForgotPassword = () => {
  //     forgotPassword(email)
  //       .then((response) => {
  //         console.log(response);
  //         setIsButtonDisabled(true);
  //         setRemainingTime(10);
  //         dispatch(
  //           showSnackbar({
  //             message: response.data?.message,
  //             severity: severity.severityMessage,
  //           })
  //         );
  //       })
  //       .catch((error) => {
  //         dispatch(
  //           showSnackbar({
  //             message: error,
  //             severity: "error",
  //           })
  //         );
  //       });
  //   };

  //   useEffect(() => {
  //     let timer: any;
  //     if (remainingTime > 0) {
  //       timer = setInterval(() => {
  //         setRemainingTime((prevTime) => prevTime - 1);
  //       }, 1000);
  //     } else {
  //       setIsButtonDisabled(false);
  //     }
  //     return () => clearInterval(timer);
  //   }, [remainingTime]);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ color: "gray" }}>
          Forgot password
        </Typography>
        <Box
          sx={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            border: "1px solid lightgrey",
            p: 5,
            borderRadius: 5,
            boxShadow: 3,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2
              container
              rowSpacing={4}
              columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 5 }}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Grid2>
                <Controller
                  name="email"
                  render={({ field }) => (
                    <TextField
                      id="email"
                      error={Boolean(errors.email)}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      helperText={errors.email && errors.email.message}
                      {...field}
                    />
                  )}
                  control={control}
                  defaultValue=""
                />
              </Grid2>

              <Button
                variant="contained"
                type="submit"
                // onClick={userForgotPassword}
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  height: 50,
                  width: 150,
                  fontWeight: "Bold",
                  fontSize: 18,
                  textTransform: "none",
                }}
              >
                Send Email
              </Button>
            </Grid2>
          </form>
          <SnackbarComponent />
        </Box>
      </Container>
    </>
  );
};

export default Forgotpassword;
