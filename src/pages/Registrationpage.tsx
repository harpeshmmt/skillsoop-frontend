import {
  Autocomplete,
  Box,
  CircularProgress,
  Container,
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
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  getAllCountries,
  getCities,
  getStates,
  registerForm,
} from "../components/services/common";
import { useDispatch, useSelector } from "react-redux";
import { addcountries } from "../features/counter/commonSlice";
import Button from "@mui/material/Button";
import usePasswordValidations from "../components/customhooks/customhooks";
import PhoneInput from "react-phone-input-2";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { showSnackbar } from "../features/counter/snackbarSlice";
import SnackbarComponent from "../MUI/Snackbar";
import { severity } from "../constant/common";
import "react-phone-input-2/lib/style.css";

const SignupSchema = yup.object().shape({
  first_name: yup
    .string()
    .strict()
    .required("Firstname is required")
    .matches(/^[a-zA-Z ]*$/, "Only Characters"),
  last_name: yup
    .string()
    .required("Lastname is required")
    .matches(/^[a-zA-Z ]*$/, "Only Characters"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  phone_number: yup.string().required("Phonenumber is required"),
  gender: yup.string().required("Gender is required"),
  country_of_birth: yup.string().required("Country of birth is required"),
  country_residing: yup.string().required("Countryresidency is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  postcode: yup.string().min(6).max(15).required("Postcode is required"),
  date_of_birth: yup
    .string()
    .test("valid-date", "Please enter a valid date", (value) => {
      return dayjs(value, "YYYY-MM-DD", true).isValid();
    })
    .required("Date of birth is required"),
  countryid: yup.string(),
  countryabbreviation: yup.string(),
});

const Registrationpage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState([]);
  const [cityloading, setCityLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const countryapidata = useSelector(
    (state: any) => state?.common?.allcountries
  );
  const [minDate] = useState(dayjs().subtract(40, "year"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    trigger,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
    // mode: "onChange",
    defaultValues: {
      gender: "",
      password: "",
      country_residing: "",
      country_of_birth: "",
      countryid: "",
      countryabbreviation: "",
      postcode: "",
      date_of_birth: "",
      city: "",
    },
  });

  const password = watch("password");

  const passwordValidations = usePasswordValidations(password);

  const isPasswordValid = passwordValidations.every(
    (validation) => validation.isValid
  );

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

  const onSubmit = async (data: any) => {
    setLoading(true);
    const payload = {
      ...data,
    };
    delete payload.countryid;
    delete payload.countryabbreviation;

    payload.subscription_type = "spot_buy";
    payload.user_type = "candidate";
    payload.username = "test20";
    if (isPasswordValid) {
      try {
        const { data }: any = await registerForm(payload);
        console.log("User registered successfully", data.data);
        dispatch(
          showSnackbar({
            message: data?.message,
            severity: severity.severityMessage,
          })
        );

        navigate("/skillsoop-frontend/emailverification", {
          state: { email: payload.email },
        });
      } catch (error: any) {
        const { errors } = error.response.data;
        if (errors) {
          for (const field in errors) {
            setError(field as any, {
              message: errors[field],
            });
          }
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePhoneChange = (value: string) => {
    if (!value.startsWith("+")) {
      setValue("phone_number", `+${value}`);
      trigger("phone_number");
    } else {
      setValue("phone_number", value);
    }
  };
  const countriesdata = () => {
    getAllCountries()
      .then((response) => {
        const { data } = response.data;
        dispatch(addcountries(data));
      })
      .catch((error) => {
        console.error("errors-----", error);
      });
  };

  const statesdata = (countryId: string) => {
    setValue("countryid", countryId);
    getStates(countryId)
      .then((response) => {
        const { data } = response.data;
        setState(data);
        console.log(state);
      })
      .catch((error) => {
        console.error("errors-----", error);
      });
  };

  const cityApiData = () => {
    const { postcode, countryabbreviation } = getValues();
    if (postcode && countryabbreviation) {
      getCities(countryabbreviation, postcode)
        .then((response) => {
          const { data } = response.data;

          setValue("city", data);
        })
        .catch((error) => {
          console.error("errors-----", error);
        })
        .finally(() => {
          setCityLoading(false);
        });
    }
  };

  const handleAutocomplete = (name: any, value: any) => {
    setValue(name, value);
  };

  const handleInputElement = (e: any) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  useEffect(() => {
    countriesdata();
  }, []);

  const selectedCountry = watch("country_of_birth");
  const debounceTimeoutRef: any = useRef(null);

  const handlePostcodeChange = (e: any) => {
    setCityLoading(true);
    handleInputElement(e);
    const { value } = e.target;
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    setValue("postcode", value);
    trigger("postcode");
    debounceTimeoutRef.current = setTimeout(() => {
      cityApiData();
    }, 1000);
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
          Registration Form
        </Typography>
        <Box
          sx={{
            width: "70%",
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
            >
              <Grid2 size={6}>
                <Controller
                  name="first_name"
                  render={({ field }) => (
                    <TextField
                      id="first_name"
                      error={Boolean(errors.first_name)}
                      label="First name"
                      variant="outlined"
                      fullWidth
                      helperText={
                        errors.first_name && errors.first_name.message
                      }
                      {...field}
                    />
                  )}
                  control={control}
                  defaultValue=""
                />
              </Grid2>
              <Grid2 size={6}>
                <Controller
                  name="last_name"
                  render={({ field }) => (
                    <TextField
                      error={Boolean(errors.last_name)}
                      id="last_name"
                      label="Last name"
                      variant="outlined"
                      fullWidth
                      helperText={errors.last_name && errors.last_name.message}
                      {...field}
                    />
                  )}
                  control={control}
                  defaultValue=""
                />
              </Grid2>
              <Grid2 size={6}>
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
              <Grid2 size={6}>
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
                {(password || errors.password) && !isPasswordValid && (
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
              </Grid2>
              <Grid2 size={6}>
                <Box sx={{ width: "100%", height: "100%" }}>
                  <Controller
                    name="phone_number"
                    control={control}
                    defaultValue=""
                    render={(renderProps) => (
                      <FormControl
                        fullWidth
                        error={Boolean(errors.phone_number)}
                      >
                        <PhoneInput
                          country={"in"}
                          inputStyle={{
                            color: "black",
                            width: "100%",
                            height: "56px",
                          }}
                          value={renderProps.field.value}
                          onChange={handlePhoneChange}
                        />
                        <FormHelperText>
                          {errors.phone_number && errors.phone_number.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Box>
              </Grid2>
              {/* gender */}
              <Grid2 size={6}>
                <Controller
                  name="gender"
                  // id="gender"
                  control={control}
                  render={(renderProps) => (
                    <FormControl fullWidth error={Boolean(errors.gender)}>
                      <InputLabel id="select-gender">Gender</InputLabel>
                      <Select
                        labelId="select-gender"
                        id="gender"
                        label="Gender"
                        value={renderProps.field.value}
                        onChange={renderProps.field.onChange}
                        sx={{ textAlign: "left" }}
                        fullWidth
                      >
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                      </Select>
                      <FormHelperText>
                        {errors.gender && errors.gender.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid2>
              {/* datepicker */}
              <Grid2 size={6}>
                <FormControl fullWidth error={Boolean(errors.date_of_birth)}>
                  <DemoContainer
                    components={["DatePicker"]}
                    // sx={{ paddingTop:  }}
                  >
                    <Controller
                      name="date_of_birth"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          label="Date of Birth"
                          disableFuture
                          minDate={minDate}
                          format="YYYY-MM-DD"
                          onChange={(newValue) => {
                            // debugger;
                            setValue(
                              "date_of_birth",
                              dayjs(newValue).format("YYYY-MM-DD")
                            );
                            trigger("date_of_birth");
                          }}
                          value={
                            field.value
                              ? dayjs(field.value, "YYYY-MM-DD")
                              : null
                          }
                          sx={{ width: "100%" }}
                        />
                      )}
                    />
                  </DemoContainer>
                  <FormHelperText>
                    {errors.date_of_birth && errors.date_of_birth.message}
                  </FormHelperText>
                </FormControl>
              </Grid2>

              <Grid2 size={6} sx={{ paddingTop: 1 }}>
                <Controller
                  name="country_of_birth"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={countryapidata}
                      getOptionLabel={(option) => option.name || "Unknown"}
                      value={
                        selectedCountry
                          ? countryapidata.find(
                              (country: any) => country.id === selectedCountry
                            )
                          : null
                      }
                      renderOption={(props, option) => {
                        const { key, ...optionProps } = props;
                        return (
                          <Box
                            key={key}
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...optionProps}
                          >
                            <img
                              loading="lazy"
                              width="20"
                              srcSet={option?.flag}
                              src={option?.flag}
                              alt=""
                            />
                            {option.name} ({option.abbreviation})
                          </Box>
                        );
                      }}
                      onChange={(event, value) => {
                        // debugger;
                        console.log(value);
                        field.onChange(value ? value.id : "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Country of Birth"
                          error={Boolean(errors.country_of_birth)}
                          helperText={errors.country_of_birth?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid2>
              {/* Country Residency */}
              <Grid2 size={6}>
                <Controller
                  name="country_residing"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      id="country_residing"
                      options={
                        Array.isArray(countryapidata) ? countryapidata : []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      value={
                        countryapidata.find(
                          (country: any) => country.id === field.value
                        ) || null
                      }
                      onChange={(e, value: any) => {
                        handleAutocomplete(
                          "countryabbreviation",
                          value.abbreviation
                        );
                        field.onChange(value ? value.id : "");
                        statesdata(value.id);
                        cityApiData();
                      }}
                      renderOption={(props, option) => {
                        const { key, ...optionProps } = props;
                        return (
                          <Box
                            key={key}
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...optionProps}
                          >
                            <img
                              loading="lazy"
                              width="20"
                              srcSet={option?.flag}
                              src={option?.flag}
                              alt=""
                            />
                            {option?.name} ({option?.abbreviation || "N/A"})
                          </Box>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Country Residency"
                          error={Boolean(errors.country_residing)}
                          helperText={errors.country_residing?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid2>
              {/* state */}
              <Grid2 size={6}>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={Boolean(errors.state)}>
                      <InputLabel id="state-label">State</InputLabel>
                      <Select
                        {...field}
                        sx={{ textAlign: "left" }}
                        labelId="state-label"
                        label="State"
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        value={field.value || ""}
                      >
                        {state.map((option: any) => (
                          <MenuItem key={option?.id} value={option?.id}>
                            {option?.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.state && (
                        <FormHelperText>{errors.state.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid2>
              {/* postcode */}
              <Grid2 size={6}>
                <Controller
                  name="postcode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="postcode"
                      label="Postcode"
                      variant="outlined"
                      fullWidth
                      error={Boolean(errors.postcode)}
                      helperText={errors.postcode && errors.postcode.message}
                      // onChange={(e) => {
                      //   handleInputElement(e);
                      //   cityApiData();
                      //   trigger("postcode");
                      // }}
                      value={field.value}
                      onChange={handlePostcodeChange}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={6}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Box sx={{ position: "relative" }}>
                      <TextField
                        {...field}
                        label="City"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        error={Boolean(errors.city)}
                        helperText={errors.city && errors.city.message}
                      />
                      {cityloading && (
                        <CircularProgress
                          size={24}
                          sx={{
                            color: "gray",
                            position: "absolute",
                            right: 8,
                            top: "30%",
                            transform: "translateY(-50%)",
                          }}
                        />
                      )}
                    </Box>
                  )}
                />
              </Grid2>
              <Button
                variant="contained"
                type="submit"
                // onClick={() => navigate("/skillsoop-frontend/emailverification")}
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
                Sing Up
              </Button>
            </Grid2>
            <Typography variant="h5" gutterBottom sx={{ color: "gray" }}>
              you have an account,
              <Link
                component={Button}
                onClick={() => navigate("/skillsoop-frontend/login")}
              >
                Login
              </Link>
            </Typography>

            {loading && (
              <Box
                sx={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}
              >
                <CircularProgress
                  size={50}
                  sx={{ zIndex: 10000, color: "gray" }}
                />
              </Box>
            )}
          </form>
          <SnackbarComponent />
        </Box>
      </Container>
    </>
  );
};

export default Registrationpage;
