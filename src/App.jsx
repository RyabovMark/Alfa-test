import React from "react";
import { Container } from "@mui/material";
import { Header } from "./components/header";
import { Table } from "./components/table";
import { Footer } from "./components/footer";

const App = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        minWidth: "414px",
      }}
    >
      <Header />
      <Table />
      <Footer />
    </Container>
  );
};

export default App;
