import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel'

function AddTodoForm({ onAddTodo }) {

  const [todoTitle, setTodoTitle] = useState('')

  const handleTitleChange = (event) => {
    console.log(event.target.value);
    let newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  const handleAddTodo = (event) => {
    event.preventDefault();
    console.log(todoTitle)
    const Todo = {title:todoTitle, id: Date.now()}
    console.log(Todo.id)
    onAddTodo(Todo);
    setTodoTitle('');

  }
    return (
        <>
          <form onSubmit={handleAddTodo}>
            <InputWithLabel todoTitle = {todoTitle} handleTitleChange = {handleTitleChange}>Title </InputWithLabel>
            {/* <label htmlFor="todoTitle">Title </label>
            <input name="title" type="text" id="todoTitle" value={todoTitle} onChange={handleTitleChange}/> */}
            <button type="submit">Add</button>
          </form>
        </>
      );
}

export default AddTodoForm