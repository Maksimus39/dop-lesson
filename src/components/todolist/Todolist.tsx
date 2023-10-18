import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react'
import {FilterValuesType, TaskType} from '../../App'
import s from './Todolist.module.css'

type TodolistPropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (todoId: string, taskId: string) => void
  id: string
  changeFilter: (todoId: string, newFilter: FilterValuesType) => void
  // filter: FilterValuesType
  addTask: (todoId: string, title: string) => void
  changeTaskStatus: (todoId: string, taskId: string, isDone: boolean) => void
}

export const Todolist: FC<TodolistPropsType> = (props) => {
  const {title, removeTask, tasks, id, changeFilter, addTask, changeTaskStatus} = props


  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addTaskHandler = () => {
    if (name.trim() !== '') {
      addTask(id, name)
      setName('')
    } else {
      setError('Title is required')
    }
  }
  const onChangeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler()
    }
  }

  const onChangeTaskStatusHandler = (taskId: string, isDone: boolean) => {
    console.log(isDone)
    changeTaskStatus(id, taskId, isDone)
  }

  const onChangeAllFilterHandler = () => {
    changeFilter(id, 'all')
  }
  const onChangeCompletedFilterHandler = () => {
    changeFilter(id, 'completed')
  }
  const onChangeActiveFilterHandler = () => {
    changeFilter(id, 'active')
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          className={error ? s.error : ''}
          value={name}
          onChange={onChangeAddTaskHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTaskHandler}>+</button>
        {error && <div className={s.errorMessage}>{error}</div>}
      </div>
      <ul>
        {tasks.map((t) => {
          const removeTaskHandler = () => {
            removeTask(id, t.id)
          }
          return (
            <li key={t.id} className={t.isDone ? s.isDone : ''}>
              <button onClick={removeTaskHandler}>x</button>
              <input type="checkbox" checked={t.isDone} onChange={(e) => onChangeTaskStatusHandler(t.id, e.currentTarget.checked)}/>
              <span>{t.title}</span>
            </li>
          )
        })}
      </ul>
      <div>
        <button onClick={onChangeAllFilterHandler}>All</button>

        <button onClick={onChangeActiveFilterHandler}>Active</button>
        <button onClick={onChangeCompletedFilterHandler}>Completed</button>
      </div>
    </div>
  )
}

