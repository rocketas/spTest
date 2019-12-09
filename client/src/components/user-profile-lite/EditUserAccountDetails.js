import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, FormGroup, FormInput,
        FormSelect, FormTextarea, Button } from "shards-react";

import {connect} from 'react-redux';
import login from '../../redux/actions/login';
import logout from '../../redux/actions/logout';

const axios = require('axios')

const change = (e) => {
  console.log(e.target.value);
  e.value = e.target.value; 
}
function EditUserAccountDetails (props) {

return (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{props.title}</h6>
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
                  <FormInput
                    id="feFirstName"
                    defaultValue={props.user.first_name}
                    placeholder={props.user.first_name}
                    onChange={e => change(e)}
                  />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Last Name</label>
                  <FormInput
                    id="feLastName"
                    defaultValue={props.user.last_name}
                    placeholder={props.user.last_name}
                    onChange={e => change(e)}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    defaultValue={props.user.username}
                    placeholder={props.user.username}
                    onChange={e => change(e)}
                    autoComplete="email"
                  />
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="fePassword">Password</label>
                  <FormInput
                    type="password"
                    id="fePassword"
                    defaultValue={props.user.password}
                    placeholder={props.user.password}
                    onChange={e => change(e)}
                    autoComplete="current-password"
                  />
                </Col>
              </Row>
              <FormGroup>
                <label htmlFor="feAddress">Address</label>
                <FormInput
                  id="feAddress"
                  defaultValue={props.user.address}
                  placeholder={props.user.address}
                  onChange={e => change(e)}
                />
              </FormGroup>
              <Row form>
                {/* City */}
                <Col md="6" className="form-group">
                  <label htmlFor="feCity">City</label>
                  <FormInput
                    id="feCity"
                    defaultValue={props.user.city}
                    placeholder={props.user.city}
                    onChange={e => change(e)}
                  />
                </Col>
                {/* State */}
                <Col md="4" className="form-group">
                  <label htmlFor="feInputState">State</label>
                  <FormSelect id="feInputState" defaultValue={props.user.state_name}
                    placeholder={props.user.state_name}
                    onChange={e => change(e)}>
                    <option value="AL">AL</option>
                    <option value="AK">AK</option>
                    <option value="AR">AR</option>	
                    <option value="AZ">AZ</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DC">DC</option>
                    <option value="DE">DE</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="IA">IA</option>	
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="MA">MA</option>
                    <option value="MD">MD</option>
                    <option value="ME">ME</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MO">MO</option>	
                    <option value="MS">MS</option>
                    <option value="MT">MT</option>
                    <option value="NC">NC</option>	
                    <option value="NE">NE</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>			
                    <option value="NV">NV</option>
                    <option value="NY">NY</option>
                    <option value="ND">ND</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VT">VT</option>
                    <option value="VA">VA</option>
                    <option value="WA">WA</option>
                    <option value="WI">WI</option>	
                    <option value="WV">WV</option>
                    <option value="WY">WY</option>
                  </FormSelect>
                </Col>
                {/* Zip Code */}
                <Col md="2" className="form-group">
                  <label htmlFor="feZipCode">Zip</label>
                  <FormInput
                    id="feZipCode"
                    defaultValue={props.user.zipcode}
                    placeholder={props.user.zipcode}
                    onChange={e => change(e)}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Description */}
                <Col md="12" className="form-group">
                  <label htmlFor="feDescription">Description</label>
                  <FormTextarea 
                    id="feDescription" 
                    rows="5" 
                    defaultValue={props.user.account_description}
                    placeholder={props.user.account_description}
                    onChange={e => change(e)}
                  />
                </Col>
              </Row>
              <Button href="/profile" /* onClick= */>Update Account</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
  );
}

EditUserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

EditUserAccountDetails.defaultProps = {
  title: "Account Details"
};

const mapStateToProps = (state) => {
  console.log("in mapstate of login")
  console.log(state)
  return({
    isLoggedIn: state.authentication.isLoggedIn,
    user: state.authentication.user,
    //additional props
    title: 'Account Details'
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    loginDispatch: (user) => dispatch(login(user)),
    logoutDispatch: () => dispatch(logout())
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(EditUserAccountDetails);
