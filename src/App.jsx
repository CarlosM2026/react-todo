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


  const fetchData = async() => {
    const options = {
      method: "GET",
      headers: {
        Authorization:`Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    }
    let url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`)
      }

      const data = await response.json()

      const todos = data.records.map((todo) => {
        return {id: todo.id, title: todo.fields.Title}
      })

      setTodoList(todos)
      setIsLoading(false)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect (() => { 
    fetchData()  
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
