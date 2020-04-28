import React, { Component } from '../node_modules/@types/react';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
import './App.css';

class App extends Component {
  state = {
    username: 'Zakski',
  };

  changeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  render() {
    return (
      <div className='App'>
        <UserInput
          change={this.changeUsername}
          placeholder='Enter a new username'
        ></UserInput>
        <UserOutput username={this.state.username}></UserOutput>
      </div>
    );
  }
}

export default App;
