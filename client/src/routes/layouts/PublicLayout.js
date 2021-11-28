import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import AlertMsg from "./AlertMsg";
import PublicNavbar from "../../components/PublicNavbar";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar/>
      <Container fluid style={{ padding: 0 }}>
        <AlertMsg />
        <Outlet/>
      </Container>
    </>
  );
};

export default PublicLayout;
