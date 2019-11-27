import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Logo from "../../assets/img/logo.png";
import styles from "../../assets/jss/material-kit-react/views/loginPage.js";
import image from "../../assets/img/background.png";
import Input from '@material-ui/core/Input';
import google from "../../assets/img/google_icon.png";

const useStyles = makeStyles(styles);

//Google OAuth imports
const {GoogleLogin} = require("react-google-login")
const axios = require('axios')

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  
  
  const passwordHandler = (event) =>{
    setUserPassword(event.target.value)

  }
  const emailHandler = (event) => {
    setUserEmail(event.target.value)
  }


  //called when regular username and password login is attempted
  const formSubmit = async (event) => {
    event.preventDefault()
    let credentials = {
      'username': userEmail,
      'password': userPassword
    }

    try{
      let response = await axios({
        method:'post',
        url: 'http://localhost:5000/auth/login',
        headers: {
         'content-type': 'application/json'
        },
        data: credentials
      })
      let user = response.data
      console.log(user)
    }catch(error){
      console.log(error)
    }
    
    
    
  }

  // called after user sign ins with google oauth
  // we make a post request to server which determines returns user if account exists
  const responseGoogleSuccess = async (res) => {

    console.log("response:  ")
    console.log(res.profileObj)    
    
    try{
      let user = await axios({
        method:'post',
        url: "http://localhost:5000/auth/google/login",
        headers: {
          'Authorization': res.profileObj,
          'Allow-Access-Control-Origin': "*",
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          "Authentication": res.w3.Eea
        },
        data: {
          googleId: res.profileObj.googleId
        }
      })
      console.log("user authorized")
      console.log(user)
    }catch(error){
      console.log(error)
    }
   

  }

  const responseGoogleFailure = res => {
    console.log("login to google failed " + res)
  }
  //we need to request token, which returns an authorization code when logged in.
  //Query backend with authorization code, backend needs to swap auth code for token
  // once token is received, we can start to pull data from API
  
  return (
    <div className={classes.loginbox}>
      <Header
        absolute
        color="transparent"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                    <img src={Logo}  className={classes.image}/>
                  <CardBody>
                    <Input 
                      autoFocus={true}
                      fullWidth={true}
                      onChange={emailHandler}
                      placeholder="Email"
                      required="true"
                      value = {userEmail}
                    />
                    <Input 
                      autoFocus={true}
                      fullWidth={true}
                      onChange={passwordHandler}
                      placeholder="Password"
                      type="password"
                      required="true"
                      value = {userPassword}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button href="/profile" onClick={formSubmit} className={classes.loginBtn}><b>Login</b></Button>
                  </CardFooter>
                  <CardFooter className={classes.cardFooter}>
                    {/* <Button href="/" className={classes.googleBtn}><img src={google} className={classes.google}/>Login with Google</Button> */}
                    <GoogleLogin 
                    clientId= "1013178343737-7lcsb26bjsj0tccieksn273f3lj5346e.apps.googleusercontent.com"
                    buttonText= "Google"
                    responseType = "id_token"
                    onSuccess = {responseGoogleSuccess}
                    onFailure = {responseGoogleFailure}
                    />
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
