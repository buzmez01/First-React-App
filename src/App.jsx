import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'

// ============================================
// REACT ROUTER
// ============================================
// Without Router: we used useState to switch between components
//   const [activeProject, setActiveProject] = useState('todo')
//   {activeProject === 'todo' && <TodoApp />}
//
// With Router: the URL decides which component is shown
//   /todo     → <TodoApp />
//   /weather  → <WeatherApp />
//   /notes    → <NotesApp />
//   /movies   → <MovieList />
//   /movies/3 → <MovieDetail />    ← this wasn't possible with useState!
//
// WinForms equivalent:
//   Without Router = one Form with tabControl, switching tabs
//   With Router    = separate Forms, each with its own "address"

import TodoApp from './projects/TodoApp/TodoApp'
import WeatherApp from './projects/WeatherApp/WeatherApp'
import NotesApp from './projects/NotesApp/NotesApp'
import MovieList from './projects/MovieApp/MovieList'
import MovieDetail from './projects/MovieApp/MovieDetail'

function App() {
  return (
    // BrowserRouter wraps the entire app to enable routing
    <BrowserRouter>
      <div className="app">
        <h1>React Projects</h1>

        {/* NavLink = Link that automatically gets "active" class */}
        {/* Regular Link just navigates, NavLink also highlights current page */}
        <nav className="project-nav">
          <NavLink to="/todo">Todo App</NavLink>
          <NavLink to="/weather">Weather</NavLink>
          <NavLink to="/notes">Notes</NavLink>
          <NavLink to="/movies">Movies</NavLink>
        </nav>

        {/* Routes = "which URL shows which component" */}
        {/* WinForms equivalent: a switch statement that shows different Forms */}
        <Routes>
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/weather" element={<WeatherApp />} />
          <Route path="/notes" element={<NotesApp />} />
          <Route path="/movies" element={<MovieList />} />

          {/* Dynamic route: :id is a URL parameter */}
          {/* /movies/1, /movies/2, /movies/99 all match this route */}
          {/* The component can read the id with useParams() */}
          <Route path="/movies/:id" element={<MovieDetail />} />

          {/* Default: redirect / to /todo */}
          <Route path="*" element={<Navigate to="/todo" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
