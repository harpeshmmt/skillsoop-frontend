import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  Button,
  Grid2,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addcountries } from "../features/counter/commonSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
import { getAllCountries } from "../components/services/common";

const SignupSchema = yup.object().shape({
  phonenumber: yup.string().required("Phonenumber is required"),
});

const Registrationpage = () => {
  const [countryCode, setCountryCode] = useState("IN");
  const [isValidPhone, setIsValidPhone] = useState(true);
  const dispatch = useDispatch();
  const countryapidata = useSelector((state) => state?.common?.allcountries);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      phonenumber: "",
    },
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  // Fetch countries data
  const countriesdata = () => {
    getAllCountries()
      .then((response) => {
        const { data } = response.data;
        dispatch(addcountries(data));
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  };

  useEffect(() => {
    countriesdata();
  }, []);

  const handlePhoneChange = (value) => {
    setValue("phonenumber", value);
    const valid = isValidPhoneNumber(value, countryCode);
    setIsValidPhone(valid);
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
              <Box sx={{ width: "100%", height: "100%" }}>
                <Controller
                  name="phonenumber"
                  control={control}
                  defaultValue=""
                  render={(renderProps) => (
                    <FormControl
                      fullWidth
                      error={Boolean(errors.phonenumber || !isValidPhone)}
                    >
                      <PhoneInput
                        country={countryCode.toLowerCase()}
                        inputStyle={{
                          color: "black",
                          width: "100%",
                          height: "56px",
                        }}
                        value={renderProps.field.value}
                        onChange={(value) => {
                          renderProps.field.onChange(value);
                          handlePhoneChange(value);
                        }}
                      />
                      <FormHelperText>
                        {errors.phonenumber && errors.phonenumber.message}
                        {!isValidPhone && "Invalid phone number"}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Box>
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
              Sign Up
            </Button>
          </Grid2>
        </form>
      </Box>
    </>
  );
};

export default Registrationpage;
