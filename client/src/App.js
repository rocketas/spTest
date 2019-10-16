import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    data: null
  };
  componentDidMount() {
    // Call our fetch function below once the component mounts
  this.callBackendAPI()
    .then(res => this.setState({
      name: res.name, 
      rollnumber: res.rollnumber 
    }))
    .catch(err => console.log(err));
}
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
  const response = await fetch('/client');
  const body = await response.json(); 

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body;
};

render() {
  return (
    <div className="App">
      <h1>Welcome to On-Site Drapery, LLC</h1>
      <p className="App-intro">Name: {this.state.name}</p>
      <p className="App-intro">Rollnumber: {this.state.rollnumber}</p>
    </div>
  );
  }
 }
 
export default App;