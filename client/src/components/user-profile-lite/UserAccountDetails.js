import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, FormGroup } from "shards-react";

import {connect} from 'react-redux'
import login from '../../redux/actions/login'
import logout from '../../redux/actions/logout'

function UserAccountDetails({ title = "Account Details" }){
  const [hasError, setErrors] = useState(false);
  const [firstnamed, setFirstName] = useState('');
  
  const firstNameHandler = (event) => {
    setFirstName(event.target.value)
  }

  useEffect(() => {
    async function fetchData() {
    const res = await fetch("http://localhost:5000/users");
    res
      .json()
      .then(res => setFirstName(res))
      .catch(err => setErrors(err));
  }

  fetchData();
  });
  
  return(
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">First Name</label>
                  <h5>{this.state.firstname}</h5>
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Last Name</label>
                  <h5>Burbridge</h5>
                </Col>
              </Row>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <h5>sirrobert@gmail.com</h5>
                </Col>
              </Row>
              <FormGroup>
                <label htmlFor="feAddress">Address</label>
                <h5>1234 Main St.</h5>
              </FormGroup>
              <Row form>
                {/* City */}
                <Col md="6" className="form-group">
                  <label htmlFor="feCity">City</label>
                  <h5>Chapel Hill</h5>
                </Col>
                {/* State */}
                <Col md="4" className="form-group">
                  <label htmlFor="feInputState">State</label>
                  <h5>NC</h5>
                </Col>
                {/* Zip Code */}
                <Col md="2" className="form-group">
                  <label htmlFor="feZipCode">Zip</label>
                  <h5>12345</h5>
                </Col>
              </Row>
              <Row form>
                {/* Description */}
                <Col md="12" className="form-group">
                  <label htmlFor="feDescription">Description</label>
                  <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Odio eaque, quidem, commodi soluta qui quae minima obcaecati 
                    quod dolorum sint alias, possimus illum assumenda eligendi cumque?</h5>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);
}

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};

const mapStateToProps = (state) => {
  console.log("in mapstate of login")
  console.log(state)
  return({
    isLoggedIn: state.authentication.isLoggedIn,
    user: state.authentication.user
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    loginDispatch: (user) => dispatch(login(user)),
    logoutDispatch: () => dispatch(logout())
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(UserAccountDetails);
