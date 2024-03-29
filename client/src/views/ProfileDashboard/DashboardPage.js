import React from "react";
import { Container, Row, Col } from "shards-react";
import DefaultLayout from "../../layouts/Default.js";
import UserDetails from "../../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../../components/user-profile-lite/UserAccountDetails";

import {connect} from 'react-redux'

function UserProfileLite(props){

  const checkIfLoggedIn = () => {
   if(props.isLoggedIn !== true){
      props.history.push("/login")
    }else if(props.user.first_name == undefined){
      props.history.push('/editprofile')

    }

  }

  
  checkIfLoggedIn()

  return (
    <DefaultLayout>
    <Container fluid className="main-content-container px-4">
      <br></br>
      <Row>
        <Col lg="4">
          <UserDetails />
        </Col>
        <Col lg="8">
          <UserAccountDetails />
        </Col>
      </Row>
    </Container>
    </DefaultLayout>
  );
}
const mapStateToProps = (state) => {

  return({
    isLoggedIn: state.authentication.isLoggedIn,
    user: state.authentication.user
  })
}
export default connect(mapStateToProps)(UserProfileLite);
