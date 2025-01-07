import { createTheme } from "@mui/material";
import { lime, purple } from "@mui/material/colors";

export const theme = createTheme({
  typography: {
    // Tell MUI what the font-size on the html element is.
    // htmlFontSize: 10,
    // fontSize: 15,
    h3: {
      fontSize: "8rem",
    },
  },
  palette: {
    primary: lime,
    secondary: purple,
  },
});

// theme.typography.h3 = {
//   //   fontSize: "1.2rem",
//   "@media (min-width:600px)": {
//     fontSize: "2rem",
//   },
//   [theme.breakpoints.up("md")]: {
//     fontSize: "4rem",
//   },
// };
