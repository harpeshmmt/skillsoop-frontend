import {
  Box,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Registrationpage = () => {
  const [gender, setGender] = React.useState("");
  const [country, setCountry] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const handleChangecountry = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  return (
    <>
      <Box sx={{ width: "90%" }}>
        <Grid2
          container
          rowSpacing={4}
          columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 5 }}
        >
          <Grid2 size={6}>
            <TextField
              id="outlined-basic"
              label="First name"
              variant="outlined"
              fullWidth
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              id="outlined-basic"
              label="Last name"
              variant="outlined"
              fullWidth
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
            />
          </Grid2>

          <Grid2 size={6}>
            <PhoneInput
              country={"us"}
              value="1425652"
              onChange={(phone) => console.log({ phone })}
            />
          </Grid2>

          <Grid2 size={6}>
            <FormControl fullWidth>
              <InputLabel id="select-country">country</InputLabel>
              <Select
                labelId="select-country"
                id="simple-select"
                value={country}
                label="country"
                onChange={handleChangecountry}
                fullWidth
              >
                <MenuItem value={10}>india</MenuItem>
                <MenuItem value={20}>usa</MenuItem>
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 size={6}>
            <FormControl fullWidth>
              <InputLabel id="select-gender">gender</InputLabel>
              <Select
                labelId="select-gender"
                id="simple-select"
                value={gender}
                label="Age"
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value={10}>Male</MenuItem>
                <MenuItem value={20}>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 size={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker disableFuture label="DOB" />
              </DemoContainer>
            </LocalizationProvider>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default Registrationpage;
