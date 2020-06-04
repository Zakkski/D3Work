import React, { Component } from 'react';
// import Radium, { StyleRoot } from 'radium';
// This is Class Modules config
import classes from './App.css';
import withClass from '../components/hoc/WithClass';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import AuthContext from '../context/auth-context';

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Max', age: 25 },
      { id: 2, name: 'Manu', age: 26 },
      { id: 3, name: 'Chris', age: 41 },
    ],
    showPersons: false,
    changeCounter: 0,
    authenticated: false,
  };

  // To edit config need to run npm run eject

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

    // update state when you depend on old state
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1,
      };
    });
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

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  // Use bind(this) to bind the reference to this class, add args as the values that the method is called with
  //       <button onClick={switchNameHandler.bind(this, 'Maximilian')}>
  //        <button onClick={() => switchNameHandler('Maximilian')}
  // can pass either a function call or just a reference
  // Alternative is to just use ES6 arrow functions, this may cause excess re-rendering. Bind is more efficient
  render() {
    // This allows you to scope styling to specific elements
    // const style = {
    //   backgroundColor: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   padding: '8px',
    //   border: '1px solid blue',
    //   cursor: 'pointer',
    //   ':hover': {
    //     backgroundColor: 'lightgreen',
    //     color: 'black',
    //   },
    // };

    // For conditional showing: can use ternary expression (condition ? <div></div> : null)
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated}
        />
      );

      //   style.backgroundColor = 'red';
      //   style[':hover'] = {
      //     backgroundColor: 'salmon',
      //     color: 'black',
      //   };
      // index is not a good key because if the list changes then all of the keys will change. Doesn't give a solid source of truth
    }

    return (
      // Needed with Radium for using media queries
      //   <StyleRoot>
      //   <WithClass classes={classes.App}>
      <React.Fragment>
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler,
          }}
        >
          <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler}
            login={this.loginHandler}
          />
          {persons}
        </AuthContext.Provider>
      </React.Fragment>
      //   </WithClass>
      //   </StyleRoot>
    );
  }
}

// Radium adds functionality for css
// export default Radium(App);
export default withClass(App, classes.App);
