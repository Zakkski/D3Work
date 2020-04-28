import React from '../../node_modules/@types/react';
import './UserInput.css';

const userInput = (props) => {
  return (
    <input
      className='UserInput'
      placeholder={props.placeholder}
      onChange={props.change}
    />
  );
};

export default userInput;
