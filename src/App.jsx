import { useState } from 'react'

// Importing components
// WinForms equivalent: adding UserControls inside a Form
import TodoApp from './projects/TodoApp/TodoApp'
import WeatherApp from './projects/WeatherApp/WeatherApp'
import NotesApp from './projects/NotesApp/NotesApp'

function App() {
  // Which project should be displayed? 'todo', 'weather', or 'notes'
  const [activeProject, setActiveProject] = useState('todo')

  return (
    <div className="app">
      <h1>React Projects</h1>

      {/* Project selection menu */}
      <nav className="project-nav">
        <button
          className={activeProject === 'todo' ? 'active' : ''}
          onClick={() => setActiveProject('todo')}
        >
          Todo App
        </button>
        <button
          className={activeProject === 'weather' ? 'active' : ''}
          onClick={() => setActiveProject('weather')}
        >
          Weather
        </button>
        <button
          className={activeProject === 'notes' ? 'active' : ''}
          onClick={() => setActiveProject('notes')}
        >
          Notes
        </button>
      </nav>

      {/* Render the selected project */}
      {/* WinForms equivalent: tabControl1.SelectedTab */}
      {activeProject === 'todo' && <TodoApp />}
      {activeProject === 'weather' && <WeatherApp />}
      {activeProject === 'notes' && <NotesApp />}
    </div>
  )
}

export default App
