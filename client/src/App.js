import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
// import { DefaultLayout } from "./layouts";
import Home from "./views/Home/Home.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import DashboardPage from "./views/ProfileDashboard/DashboardPage.js";
import EditDashboardPage from "./views/ProfileDashboard/EditDashboardPage.js";
import "./assets/scss/material-kit-react.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

var hist = createBrowserHistory();

class App extends Component {
  state = {
    data: null
  };
  componentDidMount() {
 
}
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js


render() {
  return (
    <div className="App">
      {/* <h1>Welcome to On-Site Drapery, LLC</h1>
      <p className="App-intro">First Name: {this.state.firstname}</p>
      <p className="App-intro">Middle Name: {this.state.middlename}</p>
      <p className="App-intro">Last Name: {this.state.lastname}</p>
      <p className="App-intro">Email: {this.state.email}</p>
      <p className="App-intro">Phone Number: {this.state.phone}</p>
      <p className="App-intro">Shifts Worked: {this.state.shiftsworked}</p>
      <p className="App-intro">Title: {this.state.title}</p> */}
      <Router history={hist}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={DashboardPage}/>
          <Route path="/editprofile" component={EditDashboardPage}/>
          <Route path="/" component={Home} />
        </Switch>
      </Router>,
    </div>
  );
  }
 }
 
export default App;