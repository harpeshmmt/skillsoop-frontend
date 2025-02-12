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
import { resetPassword } from "../components/services/common";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { showSnackbar } from "../features/counter/snackbarSlice";
import SnackbarComponent from "../MUI/Snackbar";
import { severity, severityerror } from "../constant/common";

import usePasswordValidations from "../components/customhooks/customhooks";
import { handleFieldErrors } from "../utils/helper";

const SignupSchema = yup.object().shape({
  new_password: yup.string().required("Password is required"),
  confirm_password: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("new_password")], "Passwords must match"),
});

const Resetpassword = () => {
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

  const { token, id } = useParams();

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

  const password = watch("new_password");
  const confirmPassword = watch("confirm_password");

  const passwordValidations = usePasswordValidations(password);

  const isPasswordValid = passwordValidations.every(
    (validation) => validation.isValid
  );

  const onSubmit = async (data: any) => {
    const payload = { ...data };

    delete payload.confirm_password;

    try {
      const response = await resetPassword(token, id, payload);
      const successMessage = response.data.message;
      dispatch(
        showSnackbar({
          message: successMessage,
          severity: severity.severityMessage,
        })
      );
      navigate("/skillsoop-frontend/login");
    } catch (error: any) {
      const { data } = error.response;
      const errorMessage = data.error;
      if (errorMessage) {
        handleErrorResponse(
          errorMessage,
          setIsEmailNotConfirmed,
          setIsAccountInactive,
          dispatch
        );
      } else if (error) {
        const { errors } = error.response.data;
        for (const field in errors) {
          if (errors.hasOwnProperty(field)) {
            const errorMessages = errors[field];
            setError(field as any, {
              message: errorMessages[0],
            });
          }
        }
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
          Reset password
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
                  name="new_password"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={Boolean(errors.new_password)}
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
                      {errors.new_password && (
                        <FormHelperText>
                          {errors.new_password.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid2>
              {(password || errors.new_password) && !isPasswordValid && (
                <Box sx={{ mt: 2 }}>
                  {passwordValidations.map((validation, index) => (
                    <Typography
                      key={index}
                      color={validation.isValid ? "green" : "error"}
                      variant="body2"
                      sx={{ mb: 1, textAlign: "left" }}
                    >
                      {validation.message}
                    </Typography>
                  ))}
                </Box>
              )}
              <Grid2>
                <Controller
                  name="confirm_password"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={Boolean(errors.confirm_password)}
                    >
                      <InputLabel htmlFor="adornment-password">
                        Confirm password
                      </InputLabel>
                      <OutlinedInput
                        id="adornment-password"
                        type={showPassword ? "text" : "password"}
                        label="Confirm password"
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
                      {errors.confirm_password && (
                        <FormHelperText>
                          {errors.confirm_password.message}
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
                  width: 200,
                  fontWeight: "Bold",
                  fontSize: 18,
                  textTransform: "none",
                }}
              >
                Reset Password
              </Button>
            </Grid2>
          </form>
          <SnackbarComponent />
        </Box>
      </Container>
    </>
  );
};

export default Resetpassword;
