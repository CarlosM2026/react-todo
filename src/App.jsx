import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {

  const [todoList,setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect (() => { 
     const newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({data:{todoList: JSON.parse(localStorage.getItem('savedTodoList')) || []}})
      }, 2000);
     }).then((result) => {
      setTodoList(result.data.todoList)
      setIsLoading(false)
     })
    
  }
  ,[])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList))
    }
  }, [todoList])

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  }

  const removeTodo = (Id) => {
    const NewTodoList = todoList.filter((item) => {
      return (item.id !== Id)
    })
    setTodoList(NewTodoList) 
  }

  return (
    <>
      { isLoading ? (
        <p>Loading....</p>
      ) : (
        <>
          <h1>Todo List</h1>
          <AddTodoForm onAddTodo = {addTodo}/>
          <TodoList todoList={todoList} onRemoveTodo = {removeTodo}/>
        </>
        )
      }
    </>
  )
}

export default App
