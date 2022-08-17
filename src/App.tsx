import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Button, createTheme } from "@mui/material";
import { Box, ThemeProvider } from "@mui/system";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component={"main"}
        sx={{
          height: "100vh"
        }}
      >
        <Header></Header>
        <Layout>
          <h1>Olá mundo</h1>
        </Layout>
      </Box>
    </ThemeProvider>
  );
}

export default App;
