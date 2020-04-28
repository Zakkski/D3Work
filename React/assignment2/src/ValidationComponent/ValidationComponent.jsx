import React from 'react';

const validationComponent = (props) => {
  let message = null;

  if (props.textLength < 5) {
    message = <p>Message not long enough</p>;
  } else {
    message = <p>Message Is long enough. You win</p>;
  }

  return (
    <div>
      <p>{props.textLength}</p>
      {message}
    </div>
  );
};

export default validationComponent;
