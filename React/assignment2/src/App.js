import React, { Component } from 'react';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';
import './App.css';

class App extends Component {
  state = {
    input: '',
  };

  onChangeHandler = (event) => {
    this.setState({ input: event.target.value });
  };

  deleteChar = (index) => {
    const text = this.state.input.split('');
    text.splice(index, 1);
    this.setState({ input: text.join('') });
  };

  render() {
    const charList = this.state.input
      .split('')
      .map((char, index) => (
        <CharComponent
          char={char}
          key={index}
          click={() => this.deleteChar(index)}
        />
      ));

    return (
      <div className='App'>
        <input
          type='text'
          value={this.state.input}
          onChange={this.onChangeHandler}
        />
        <ValidationComponent
          textLength={this.state.input.length}
        ></ValidationComponent>
        {charList}
      </div>
    );
  }
}

export default App;
