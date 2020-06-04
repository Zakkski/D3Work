import React, { Component } from 'react';
// import Aux from '../../hoc/Auxillary';
// import Radium from 'radium';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

// Bring styling into individual components
import './Person.css';

// const StyledDiv = styled.div`
//         width: 60%;
//         margin: 16px auto;
//         border: 1px solid #eee;
//         box-shadow: 0 2px 3px #ccc;
//         padding: 16px;
//         text-align: center;

//         @media (min-width: 500px): {
//                 width: '450px',
//         },
//     `;

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  // Must be static must be named contextType
  static contextType = AuthContext;

  componentDidMount() {
    // this.inputElement.focus();
    this.inputElementRef.current.focus();
    console.log(this.context.authenticated);
  }

  // For Radium
  //   const style = {
  //     '@media (min-width: 500px)': {
  //       width: '450px',
  //     },
  //   };

  render() {
    return (
      //   <StyledDiv>
      <React.Fragment>
        {this.context.authenticated ? (
          <p>Authenticated</p>
        ) : (
          <p>Please Log in</p>
        )}

        <p onClick={this.props.click}>
          I'm a {this.props.name} and I am {this.props.age} years old
        </p>
        <p>{this.props.children}</p>
        <input
          //   ref={(el) => {
          //     this.inputElement = el;
          //   }}
          ref={this.inputElementRef}
          type='text'
          onChange={this.props.changed}
          value={this.props.name}
        />
      </React.Fragment>
      //   </StyledDiv>
    );
  }

  // Need to return a single jsx element or you can return an array and it's assumed a list but then you need keys
  // or return a wrapping comp that doesn't render (hoc) Aux component that just returns props.children <Aux>
  // React Fragment also works
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};

export default Person;
