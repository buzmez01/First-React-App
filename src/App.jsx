import { useState } from 'react'

// Component'leri import ediyoruz
// WinForms'ta: bir Form içinde UserControl eklemek gibi
import TodoApp from './projects/TodoApp/TodoApp'
import WeatherApp from './projects/WeatherApp/WeatherApp'

function App() {
  // Hangi proje gösterilsin? 'todo' veya 'weather'
  const [activeProject, setActiveProject] = useState('todo')

  return (
    <div className="app">
      <h1>React Projeleri</h1>

      {/* Proje seçim menüsü */}
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
          Hava Durumu
        </button>
      </nav>

      {/* Seçilen projeyi göster */}
      {/* WinForms'ta: tabControl1.SelectedTab gibi düşün */}
      {activeProject === 'todo' && <TodoApp />}
      {activeProject === 'weather' && <WeatherApp />}
    </div>
  )
}

export default App
