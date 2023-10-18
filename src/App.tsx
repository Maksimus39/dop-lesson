import React, {useState} from 'react'
import './App.css'
import {Todolist} from "./components/todolist/Todolist";



export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TasksType = {
  [key: string]: TaskType[]
}


function App() {
  const todolistId1 = crypto.randomUUID()
  const todolistId2 = crypto.randomUUID()

  let [todolists, setTodolists] = useState<TodolistType[]>([
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'}
  ])

  let [tasks, setTasks] = useState<TasksType>({
    [todolistId1]: [
      {id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true},
      {id: crypto.randomUUID(), title: 'JS', isDone: true}
    ],
    [todolistId2]: [
      {id: crypto.randomUUID(), title: 'Milk', isDone: true},
      {id: crypto.randomUUID(), title: 'React Book', isDone: true}
    ]
  })

  const removeTask = (todoId: string, taskId: string) => {
    setTasks({...tasks, [todoId]: tasks[todoId].filter(el => el.id !== taskId)})
  }

  const addTodoList = (title: string) => {
    const newTodo: TodolistType = {id: crypto.randomUUID(), title: title, filter: 'all'}

    setTodolists([...todolists, newTodo])
  }

  const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
    setTasks({...tasks, [todoId]: tasks[todoId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
  }

  const addTask = (todoId: string, title: string) => {
    const newTask = {id: crypto.randomUUID(), title, isDone: false}

    setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]})
  }


  const changeFilter = (todoId: string, newFilter: FilterValuesType) => {
    setTodolists(todolists.map(t => t.id === todoId ? {...t, filter: newFilter} : t))
  }


  const getFilteredTask = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
    switch (filter) {
      case 'completed': {
        return tasks.filter(t => t.isDone)
      }
      case 'active': {
        return tasks.filter(t => !t.isDone)
      }
      default: {
        return tasks
      }
    }
  }


  const mappedTodoLists = todolists.map(el => {
    const tasksForRender = getFilteredTask(tasks[el.id], el.filter)
    return (
      <Todolist
        key={el.id}
        title={el.title}
        tasks={tasksForRender}
        removeTask={removeTask}
        id={el.id}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
      />)
  })

  return (
    <div className="App">
      {mappedTodoLists}

    </div>
  )
}

export default App



