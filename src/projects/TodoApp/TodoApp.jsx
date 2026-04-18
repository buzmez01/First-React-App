import { useState } from 'react'
import './TodoApp.css'

// Bu artık bağımsız bir component
// WinForms'ta ayrı bir UserControl gibi düşün
// Dışarıdan App.jsx içinde <TodoApp /> olarak çağrılacak
function TodoApp() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  function handleAddTodo() {
    if (inputValue.trim() === '') return

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false
    }

    setTodos([...todos, newTodo])
    setInputValue('')
  }

  function handleToggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ))
  }

  function handleDeleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function handleSubmit(e) {
    e.preventDefault()
    handleAddTodo()
  }

  return (
    <div className="todo-app">
      <h2>Todo App</h2>

      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Yeni görev ekle..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Ekle</button>
      </form>

      {todos.length === 0 ? (
        <p className="empty-message">Henüz görev yok. Yukarıdan ekleyin!</p>
      ) : (
        <ul className="todo-list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
              <button
                className="delete-btn"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TodoApp
