import React from 'react'

export default props => (
  <form onSubmit={props.handleSubmit}>
    <input
      type='text'
      className='new-todo'
      value={props.currentTodo}
      onChange={props.handleNewTodoChange}
      placeholder='What needs to be done?'
      autoFocus
    />
  </form>
);
