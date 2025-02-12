import {
  Autocomplete,
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  login,
  registerForm,
  emailVerification,
} from "../components/services/common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { showSnackbar } from "../features/counter/snackbarSlice";
import SnackbarComponent from "../MUI/Snackbar";
import { severity, severityerror } from "../constant/common";
import { handleFieldErrors } from "../utils/helper";
import { setAuthData } from "../features/counter/authSlice";

const SignupSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string(),
});

const Loginpage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailNotConfirmed, setIsEmailNotConfirmed] = useState(false);
  const [isAccountInactive, setIsAccountInactive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const email = {
    email: watch("email"),
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // const onSubmit = async (data: any) => {
  //   const payload = { ...data };

  //   try {
  //     const { data }: any = await login(payload);
  //     console.log("User registered successfully", data.data);
  //   } catch (error: any) {
  //     const { errors } = error.response.data;
  //     const errorMessage = errors?.error?.[0];

  //     if (errorMessage) {
  //       handleErrorResponse(
  //         errorMessage,
  //         errors,
  //         setIsEmailNotConfirmed,
  //         setIsAccountInactive,
  //         dispatch
  //       );
  //     } else if (errors) {
  //       handleFieldErrors(errors, setError);
  //     }
  //   }
  // };

  const onSubmit = async (data: any) => {
    const payload = { ...data };

    try {
      const response = await login(payload);
      const { user, tokens } = response.data.data;
      dispatch(
        setAuthData({
          user: user,
          tokens: tokens,
        })
      );
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", tokens.access);
      localStorage.setItem("refreshToken", tokens.refresh);
      if (tokens.access) {
        navigate("/skillsoop-frontend/candidate/dashboard");
      }
      const successMessage = response.data.message;
      dispatch(
        showSnackbar({
          message: successMessage,
          severity: severity.severityMessage,
        })
      );
    } catch (error: any) {
      const { errors } = error.response.data;
      const errorMessage = errors?.error?.[0];
      if (errorMessage) {
        handleErrorResponse(
          errorMessage,
          errors,
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
    errors,
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

  const handleActivateAccountClick = () => {
    navigate("/skillsoop-frontend/activate-account");
  };

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
          Login
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
              <Grid2>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={Boolean(errors.password)}
                    >
                      <InputLabel htmlFor="adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="adornment-password"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        {...field}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={
                                showPassword
                                  ? "hide the password"
                                  : "display the password"
                              }
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {errors.password && (
                        <FormHelperText>
                          {errors.password.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid2>
              <Button
                variant="contained"
                type="submit"
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
                Login
              </Button>

              {isEmailNotConfirmed && (
                <Button
                  variant="outlined"
                  fullWidth
                  disabled={isButtonDisabled}
                  sx={{
                    marginTop: 2,
                  }}
                  onClick={() => email_Verification()}
                >
                  {isButtonDisabled
                    ? `Resend in ${remainingTime}s`
                    : "Verify Email"}
                </Button>
              )}

              {isAccountInactive && (
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    marginTop: 2,
                  }}
                  onClick={() => handleActivateAccountClick()}
                >
                  Activate Account
                </Button>
              )}
            </Grid2>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "gray", marginTop: 3 }}
            >
              Don't have an account,
              <Button onClick={() => navigate("/skillsoop-frontend/")}>
                sign up
              </Button>
            </Typography>
            <Button
              sx={{}}
              variant="text"
              onClick={() => navigate("/skillsoop-frontend/forgot-password")}
            >
              Forgot Password
            </Button>
          </form>
          <SnackbarComponent />
        </Box>
      </Container>
    </>
  );
};

export default Loginpage;
