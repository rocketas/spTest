import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { DefaultLayout } from "./layouts";
import Home from "./views/Home/Home.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import DashboardPage from "./views/ProfileDashboard/DashboardPage.js";
import EditDashboardPage from "./views/ProfileDashboard/EditDashboardPage.js";
import "./assets/scss/material-kit-react.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import rootReducer from './redux/reducers/rootReducer'
import login from './redux/actions/login'

import {localState, updateStorage} from './redux/localState'

import {createStore} from 'redux'


import {Provider} from 'react-redux'



/*

      react redux provides connect function which reads values from redux store and re-reads on state updates

      connect function --> Takes two optional arguments
          1) mapStateToProps() --> receives entire store state and returns the object of data the component needs
              * do you have to pass the state? where is the return value applied? 
          2) mapDispatchToProps --> can either be an object or function. 
              2.1) function --> receives dispatch as an argument, called once upon component creation
                                returns an object full of functions that use dispatch to dispatch actions
              2.2) object full of action creators, each action creator will be turned into a prop functionthat automatically
                                                  dispatches its action when called
*/

let reduxStore = createStore(rootReducer, {},  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())



class App extends Component {
  state = {
    data: null
  };
  componentDidMount() {
 
}
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js


render() {
  return (
    <Provider store={reduxStore}>
    <div className="App">
      {/* <h1>Welcome to On-Site Drapery, LLC</h1>
      <p className="App-intro">First Name: {this.state.firstname}</p>
      <p className="App-intro">Middle Name: {this.state.middlename}</p>
      <p className="App-intro">Last Name: {this.state.lastname}</p>
      <p className="App-intro">Email: {this.state.email}</p>
      <p className="App-intro">Phone Number: {this.state.phone}</p>
      <p className="App-intro">Shifts Worked: {this.state.shiftsworked}</p>
      <p className="App-intro">Title: {this.state.title}</p> */}
      <BrowserRouter>
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={DashboardPage}/>
          <Route path="/editprofile" component={EditDashboardPage}/>
          <Route path="/" exact component={Home} />
        </BrowserRouter>
    </div>
    </Provider>
  );
  }
 }
 
export default App;