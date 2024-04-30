import React from "react";
import ReactDOM from "react-dom/client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Dashboard from "./components/Dashboard";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D6001C",
    },
    secondary: {
      main: "#00873E",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  </React.StrictMode>
);
