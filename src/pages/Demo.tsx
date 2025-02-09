// import {
//   Autocomplete,
//   Box,
//   FormControl,
//   FormHelperText,
//   Grid2,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   MenuItem,
//   OutlinedInput,
//   Select,
//   SelectChangeEvent,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import MuiPhoneNumber from "mui-phone-number";
// // import axios from "../components/services/axios_instance";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { city } from "../constant/country";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import {
//   getAllCountries,
//   getCities,
//   getStates,
// } from "../components/services/common";
// import { useDispatch, useSelector } from "react-redux";
// import { addcountries } from "../features/counter/commonSlice";
// import Button from "@mui/material/Button";
// import usePasswordValidations from "../components/customhooks/customhooks";

// const SignupSchema = yup.object().shape({
//   firstName: yup
//     .string()
//     .strict()
//     .required("Firstname is required")
//     .matches(/^[a-zA-Z ]*$/, "Only Characters"),
//   lastName: yup
//     .string()
//     .required("Lastname is required")
//     .matches(/^[a-zA-Z ]*$/, "Only Characters"),
//   email: yup.string().email().required("Email is required"),
//   password: yup
//     .string()
//     .max(8, "You must enter <8 characters.")
//     .matches(/[0-9]/, "You must enter at least one number.")
//     .matches(/[a-z]/, "You must enter at least one lowercase letter.")
//     .matches(/[A-Z]/, "You must enter at least one uppercase letter.")
//     .matches(/[#?!@$%^&*-]/, "You must enter at least one symbols.")
//     .required("Required."),
//   phonenumber: yup.string().required("Phonenumber is required"),
//   gender: yup.string().required("Gender is required"),
//   Country_of_Birth: yup.string().required("Country of birth is required"),
//   countryresidency: yup.string().required("Countryresidency is required"),
//   state: yup.string().required("State is required"),
//   city: yup.string().required("City is required"),
//   postcode: yup.string().min(6).max(15).required("Postcode is required"),
//   Date_of_birth: yup.date().required("Date of birth is required"),
//   countryid: yup.string(),
//   countryabbreviation: yup.string(),
// });

// const Registrationpage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [state, setState] = useState([]);
//   const [citydata, setCitydata] = useState([]);
//   const dispatch = useDispatch();
//   const countryapidata = useSelector((state) => state?.common?.allcountries);
//   const {
//     control,
//     handleSubmit,
//     setValue,
//     watch,
//     getValues,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(SignupSchema),
//     defaultValues: {
//       gender: "",
//       countryresidency: "",
//       Country_of_Birth: "",
//       countryid: "",
//       countryabbreviation: "",
//       postcode: "",
//     },
//   });

//   const password = watch("password");

//   // Validation checks

//   const onSubmit = (data: any) => {
//     alert(JSON.stringify(data));
//   };

//   return (
//     <>
//       <Typography variant="h2" gutterBottom sx={{ color: "gray" }}>
//         Registration Form
//       </Typography>
//       <Box
//         sx={{
//           width: "70%",
//           marginLeft: "auto",
//           marginRight: "auto",
//           border: "1px solid lightgrey",
//           p: 5,
//           borderRadius: 5,
//           boxShadow: 3,
//         }}
//       >
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Grid2
//             container
//             rowSpacing={4}
//             columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 5 }}
//           >
//             {/* datepicker */}
//             <Grid2 size={6}>
//               <FormControl fullWidth error={Boolean(errors.Date_of_birth)}>
//                 <DemoContainer
//                   components={["DatePicker"]}
//                   sx={{ paddingTop: 0 }}
//                 >
//                   <Controller
//                     name="Date_of_birth"
//                     control={control}
//                     render={({ field: { onChange, value } }) => (
//                       <DatePicker
//                         value={value}
//                         onChange={(a: any, b: any, c: any, d: any) => {
//                           console.log(new Date(a).toLocaleDateString());

//                         }}
//                         sx={{ width: "100%" }}
//                         disableFuture
//                         label="DOB"
//                       />
//                     )}
//                   />
//                 </DemoContainer>
//                 <FormHelperText>
//                   {errors.Date_of_birth && errors.Date_of_birth.message}
//                 </FormHelperText>
//               </FormControl>
//             </Grid2>

//             <Button
//               variant="contained"
//               type="submit"
//               sx={{
//                 marginLeft: "auto",
//                 marginRight: "auto",
//                 height: 50,
//                 width: 150,
//                 fontWeight: "Bold",
//                 fontSize: 18,
//                 textTransform: "none",
//               }}
//             >
//               Sing Up
//             </Button>
//           </Grid2>
//         </form>
//       </Box>
//     </>
//   );
// };

// export default Registrationpage;

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
import { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MuiPhoneNumber from "mui-phone-number";
// import axios from "../components/services/axios_instance";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { city } from "../constant/country";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  getAllCountries,
  getCities,
  getStates,
} from "../components/services/common";
import { useDispatch, useSelector } from "react-redux";
import { addcountries } from "../features/counter/commonSlice";
import Button from "@mui/material/Button";
import usePasswordValidations from "../components/customhooks/customhooks";

const SignupSchema = yup.object().shape({
  firstName: yup
    .string()
    .strict()
    .required("Firstname is required")
    .matches(/^[a-zA-Z ]*$/, "Only Characters"),
  lastName: yup
    .string()
    .required("Lastname is required")
    .matches(/^[a-zA-Z ]*$/, "Only Characters"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .max(8, "You must enter <8 characters.")
    .matches(/[0-9]/, "You must enter at least one number.")
    .matches(/[a-z]/, "You must enter at least one lowercase letter.")
    .matches(/[A-Z]/, "You must enter at least one uppercase letter.")
    .matches(/[#?!@$%^&*-]/, "You must enter at least one symbols.")
    .required("Required."),
  phonenumber: yup.string().required("Phonenumber is required"),
  gender: yup.string().required("Gender is required"),
  Country_of_Birth: yup.string().required("Country of birth is required"),
  countryresidency: yup.string().required("Countryresidency is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  postcode: yup.string().min(6).max(15).required("Postcode is required"),
  Date_of_birth: yup.date().required("Date of birth is required"),
  countryid: yup.string(),
  countryabbreviation: yup.string(),
});

const Registrationpage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState([]);
  const [citydata, setCitydata] = useState([]);
  const dispatch = useDispatch();
  const countryapidata = useSelector((state) => state?.common?.allcountries);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      gender: "",
      countryresidency: "",
      Country_of_Birth: "",
      countryid: "",
      countryabbreviation: "",
      postcode: "",
    },
  });

  const password = watch("password");

  // Validation checks

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
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
            {/* datepicker */}
            <Grid2 size={6}>
              <FormControl fullWidth error={Boolean(errors.Date_of_birth)}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ paddingTop: 0 }}
                >
                  <Controller
                    name="Date_of_birth"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        value={value}
                        onChange={onChange}
                        sx={{ width: "100%" }}
                        disableFuture
                        label="DOB"
                      />
                    )}
                  />
                </DemoContainer>
                <FormHelperText>
                  {errors.Date_of_birth && errors.Date_of_birth.message}
                </FormHelperText>
              </FormControl>
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
              Sing Up
            </Button>
          </Grid2>
        </form>
      </Box>
    </>
  );
};

export default Registrationpage;
