import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MuiPhoneNumber from "mui-phone-number";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { city, countries, states } from "../constant/country";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { user_country_state } from "../components/services/APIs";

const SignupSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(15).required(),
  phonenumber: yup.string().required(),
  gender: yup.string().required(),
  Country_of_Birth: yup.string().required(),
  countryresidency: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  postcode: yup.string().min(6).max(15).required(),
  Date_of_birth: yup.string().required(),
});

const Registrationpage = () => {
  const [gender, setGender] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [countrybirth, setCountrybirth] = React.useState("");
  const [countryresidency, setCountryresidency] = React.useState("");
  const [state, setState] = React.useState("");
  const [citydata, setCitydata] = React.useState("");
  const [date_of_birth, setDate_of_birth] = React.useState("");
  const [apidata, setApidata] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

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

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  // const getcountry = async () => {
  //   await axios.get(user_country_state).then((response) => {
  //     setApidata(response.data);
  //   });
  // };
  // console.log("response.data-----", apidata);
  // React.useEffect(() => {
  //   getcountry();
  // }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const handlecountrybirth = (event: SelectChangeEvent) => {
    setCountrybirth(event.target.value as string);
  };

  const handlecountryresidency = (event: SelectChangeEvent) => {
    setCountryresidency(event.target.value as string);
  };

  const handleState = (event: SelectChangeEvent) => {
    setState(event.target.value as string);
  };

  const handleCity = (event: SelectChangeEvent) => {
    setCitydata(event.target.value as string);
  };

  return (
    <>
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
                name="firstName"
                render={({ field }) => (
                  <TextField
                    id="firstname"
                    error={Boolean(errors.firstName)}
                    label="First name"
                    variant="outlined"
                    fullWidth
                    helperText={errors.firstName && errors.firstName.message}
                    {...field}
                  />
                )}
                control={control}
                defaultValue=""
              />
            </Grid2>

            <Grid2 size={6}>
              <Controller
                name="lastName"
                render={({ field }) => (
                  <TextField
                    error={Boolean(errors.lastName)}
                    id="lastname"
                    label="Last name"
                    variant="outlined"
                    fullWidth
                    helperText={errors.lastName && errors.lastName.message}
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
              <FormControl
                fullWidth
                variant="outlined"
                error={Boolean(errors.password)}
              >
                <InputLabel htmlFor="adornment-password">password</InputLabel>
                <Controller
                  name="password"
                  render={({ field }) => (
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
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                  control={control}
                  defaultValue=""
                />
                <FormHelperText>
                  {errors.password && errors.password.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={6}>
              <Box sx={{ width: "100%", color: "black" }}>
                <Controller
                  name="phonenumber"
                  render={({ field }) => (
                    <MuiPhoneNumber
                      fullWidth
                      variant="outlined"
                      id="phonenumber"
                      defaultCountry="in"
                      error={Boolean(errors.phonenumber)}
                      helperText={
                        errors.phonenumber && errors.phonenumber.message
                      }
                      {...field}
                    />
                  )}
                  control={control}
                  defaultValue=""
                />
              </Box>
            </Grid2>

            <Grid2 size={6}>
              <FormControl
                fullWidth
                error={Boolean(gender === "" && errors.gender)}
              >
                <InputLabel id="select-gender">gender</InputLabel>

                <Select
                  labelId="select-gender"
                  id="gender"
                  value={gender}
                  label="gender"
                  onChange={handleChange}
                  fullWidth
                  // slotProps={{
                  //   root: {
                  //     "aria-errormessage": "this is error",
                  //   },
                  // }}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
                <FormHelperText>
                  {gender === "" && errors.gender && errors.gender.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={6}>
              <FormControl fullWidth error={Boolean(errors.Date_of_birth)}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    name="Date_of_birth "
                    sx={{ width: "100%" }}
                    disableFuture
                    label="DOB"
                  />
                </DemoContainer>
                <FormHelperText>
                  {errors.Date_of_birth && errors.Date_of_birth.message}
                </FormHelperText>
              </FormControl>
            </Grid2>

            <Grid2 size={6}>
              <Autocomplete
                id="country-select-demo"
                options={countries}
                autoHighlight
                onChange={handlecountrybirth}
                getOptionLabel={(option) => option.label}
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
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                      />
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country of Birth"
                    id="Country of Birth"
                    error={Boolean(
                      countrybirth === "" && errors.Country_of_Birth
                    )}
                    helperText={
                      countrybirth === "" &&
                      errors.Country_of_Birth &&
                      errors.Country_of_Birth.message
                    }
                    slotProps={{
                      htmlInput: {
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      },
                    }}
                  />
                )}
              />
            </Grid2>

            <Grid2 size={6}>
              <Autocomplete
                id="country-select-demo1"
                options={countries}
                autoHighlight
                onChange={handlecountryresidency}
                getOptionLabel={(option) => option.label}
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
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                      />
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country Residency"
                    error={Boolean(
                      countryresidency === "" && errors.countryresidency
                    )}
                    helperText={
                      countryresidency === "" &&
                      errors.countryresidency &&
                      errors.countryresidency.message
                    }
                    slotProps={{
                      htmlInput: {
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      },
                    }}
                  />
                )}
              />
            </Grid2>

            <Grid2 size={6}>
              <Autocomplete
                fullWidth
                disablePortal
                onChange={handleState}
                options={states}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="state"
                    error={Boolean(state === "" && errors.state)}
                    helperText={
                      state === "" && errors.state && errors.state.message
                    }
                  />
                )}
              />
            </Grid2>

            <Grid2 size={6}>
              <Controller
                name="postcode"
                render={({ field }) => (
                  <TextField
                    id="postcode"
                    label="postcode"
                    variant="outlined"
                    fullWidth
                    error={Boolean(errors.postcode)}
                    helperText={errors.postcode && errors.postcode.message}
                    {...field}
                  />
                )}
                control={control}
                defaultValue=""
              />
            </Grid2>

            <Grid2 size={6}>
              <Autocomplete
                fullWidth
                disablePortal
                onChange={handleCity}
                options={city}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="city"
                    error={Boolean(citydata === "" && errors.city)}
                    helperText={
                      citydata === "" && errors.city && errors.city.message
                    }
                  />
                )}
              />
            </Grid2>
            <input type="submit" />
          </Grid2>
        </form>
      </Box>
    </>
  );
};

export default Registrationpage;
