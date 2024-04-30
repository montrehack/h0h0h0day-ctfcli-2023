import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

import AppBar from "./AppBar";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";

import Image from "../assets/christmas-background-tile048-150x150.jpg";
import { EntryType } from "../generated/schema_v2";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://montrehack.ca/">
        Montr&eacute;hack
      </Link>
      {" H0H0H0 "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar />
      <Box
        component="main"
        sx={{
          backgroundImage: `url(${Image})`,
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={6}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Orders type={EntryType.NICE} />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Orders type={EntryType.NAUGHTY} />
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}
