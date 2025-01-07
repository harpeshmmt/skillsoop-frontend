import type { Route } from "./+types/home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { theme } from "~/components/mui/customthems";
import { Provider } from "react-redux";
import { store } from "~/store";
import { Welcome } from "~/pages/welcome";
import Registration from "~/pages/registration";
import Login from "~/pages/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Welcome />
      </ThemeProvider>
    </Provider>
  );
}
