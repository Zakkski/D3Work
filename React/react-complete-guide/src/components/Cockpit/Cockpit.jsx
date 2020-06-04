import React, { useEffect, useRef, useContext } from 'react';
import AuthContext from '../../context/auth-context';
import classes from './Cockpit.css';

const cockpit = (props) => {
  const elRef = useRef(null);
  const authContext = useContext(AuthContext);

  console.log(authContext.authenticated);

  useEffect(() => {
    // Runs for every render cycle
    console.log('Cockpit.js useEffect');
    // return runs before main useEffect funciton, but after the (first) render cycle
    return () => {
      console.log('cleanup work');
    };
  }, [props.persons]);

  useEffect(() => {
    // Runs for every render cycle
    console.log('Cockpit.js useEffect');
    elRef.current.click();
    // Return statement is the same as the componentWillUnmount hook
    return () => {
      console.log('cleanup work');
    };
  }, []);
  // pass the props that when changed will run method, essentially conditions
  // use empty array to have it run only the first time (no dependencies so they can't change)

  // useEffect, can use multiple times

  const assignedClasses = [];

  let btnClass = '';

  if (props.showPerson) {
    btnClass = classes.Red;
  }

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red);
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    <div className={classes.Cockpit}>
      <h1>Hi, I'm a {props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working</p>
      <button ref={elRef} className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
      <button onClick={authContext.login}>Log it</button>
    </div>
  );
};

// React memorizes the state and compares it to the new state
export default React.memo(cockpit);
