import React from '../../node_modules/@types/react';

const userOutput = (props) => {
  const style = {
    border: '1px solid blue',
  };

  return (
    <div style={style}>
      <p>Text for first {props.username}</p>
      <p>Text for second {props.username}</p>
    </div>
  );
};

export default userOutput;
