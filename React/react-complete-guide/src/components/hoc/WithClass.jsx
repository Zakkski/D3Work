import React from 'react';

// const withClass = (props) => (
//   <div className={props.classes}>{props.children}</div>
// );

// Function that returns a functional component
// Can pass props dynamically with spread operator
const withClass = (WrappedComponent, className) => {
  return (props) => (
    <div className={className}>
      <WrappedComponent {...props} />
    </div>
  );
};

export default withClass;
