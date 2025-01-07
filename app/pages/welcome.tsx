import { Button, Typography } from "@mui/material";
import { Counter } from "features/counter/Counter";

export function Welcome() {
  return (
    <>
      <Typography variant="h3">Responsive h3</Typography>
      <Typography>body1</Typography>
      <Button onClick={() => console.log("first")} variant="contained">
        Primary
      </Button>
      <Button variant="contained" color="secondary" sx={{ ml: 2 }}>
        Secondary
      </Button>
      <Counter />
    </>
  );
}
