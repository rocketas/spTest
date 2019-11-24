import React from "react";
import { Container, Row, Col } from "shards-react";
import DefaultLayout from "../../layouts/Default.js";
import PageTitle from "../../components/common/PageTitle";
import UserDetails from "../../components/user-profile-lite/UserDetails";
import EditUserAccountDetails from "../../components/user-profile-lite/EditUserAccountDetails";

const UserProfileLite = () => (
  <DefaultLayout>
  <Container fluid className="main-content-container px-4">
    <br></br>
    <Row>
      <Col lg="4">
        <UserDetails />
      </Col>
      <Col lg="8">
        <EditUserAccountDetails />
      </Col>
    </Row>
  </Container>
  </DefaultLayout>
);

export default UserProfileLite;
