import React, { Component } from 'react';
// import Radium, { StyleRoot } from 'radium';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Max', age: 25 },
      { id: 2, name: 'Manu', age: 26 },
      { id: 3, name: 'Chris', age: 41 },
    ],
    showPersons: false,
  };

  // Only possible in non-class components
  // Returns two objects (state, function to update state)
  // second method will replace old state not merge it
  // would usually just split into different states.
  //   const [personState, setPersonState] = useState({
  //     persons: [
  //       { name: 'Max', age: 25 },
  //       { name: 'Manu', age: 26 },
  //       { name: 'Chris', age: 41 },
  //     ],
  //   });

  // setState looks for keys and only overwrites those, won't affect other key:value pairs
  //   switchNameHandler = (newName) => {
  //     this.setState({
  //       persons: [
  //         { name: newName, age: 25 },
  //         { name: 'Manu', age: 26 },
  //         { name: 'Chris', age: 41 },
  //       ],
  //     });
  //   };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => p.id === id);

    const person = { ...this.state.persons[personIndex] };
    // const person = Object.assign({}, this.state.persons[personIndex])

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  deletePersonHandler = (personId) => {
    // gets pointer to original state (should not be done)
    // const persons = this.state.persons;
    // Better implementation
    const persons = [...this.state.persons]; // const persons = this.state.persons.slice();
    persons.splice(personId, 1);
    this.setState({ persons: persons });
  };

  // could create like togglePersonHandler() {} but then it doesn't bind 'this' to this current class
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  // Use bind(this) to bind the reference to this class, add args as the values that the method is called with
  //       <button onClick={switchNameHandler.bind(this, 'Maximilian')}>
  //        <button onClick={() => switchNameHandler('Maximilian')}
  // can pass either a function call or just a reference
  // Alternative is to just use ES6 arrow functions, this may cause excess re-rendering. Bind is more efficient
  render() {
    // This allows you to scope styling to specific elements
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      padding: '8px',
      border: '1px solid blue',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black',
      },
    };

    // For conditional showing: can use ternary expression (condition ? <div></div> : null)
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, id) => {
            return (
              <Person
                name={person.name}
                age={person.age}
                click={() => this.deletePersonHandler(id)}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)}
              />
            );
          })}
        </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black',
      };
      // index is not a good key because if the list changes then all of the keys will change. Doesn't give a solid source of truth
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      // Needed with Radium for using media queries
      //   <StyleRoot>
      <div className='App'>
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working</p>
        <button style={style} onClick={this.togglePersonsHandler}>
          Toggle Persons
        </button>
        {persons}
      </div>
      //   </StyleRoot>
    );
  }
}

// Radium adds functionality for css
// export default Radium(App);
export default App;
