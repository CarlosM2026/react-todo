import React from 'react';

function AddTodoForm(props) {

  const handleAddTodo = (event) => {
    event.preventDefault();
    let todoTitle = event.target.elements.title.value
    console.log(todoTitle)
    props.onAddTodo(todoTitle);
    event.target.reset();

  }
    return (
        <>
          <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title </label>
            <input name="title" type="text" id="todoTitle" />
            <button type="submit">Add</button>
          </form>
        </>
      );
}

export default AddTodoForm