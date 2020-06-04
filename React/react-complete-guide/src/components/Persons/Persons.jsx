import React from 'react';
import Person from './Person/Person';
// PureComponents implement a shouldCompupdate which checks if any of the props have changed

const persons = (props) =>
  props.persons.map((person, id) => {
    return (
      <Person
        name={person.name}
        age={person.age}
        click={() => props.clicked(id)}
        key={person.id}
        changed={(event) => props.changed(event, person.id)}
      />
    );
  });

export default persons;
