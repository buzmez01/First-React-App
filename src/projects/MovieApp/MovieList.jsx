import { useState } from 'react'
import { Link } from 'react-router-dom'
import movies from './movies-data'
import './MovieApp.css'

// ============================================
// SEARCH & FILTER
// ============================================
// This component shows all movies with search and genre filtering.
// Two key concepts here:
//
// 1. Derived state: instead of storing filtered results in a separate state,
//    we compute them from the existing state on every render.
//    WinForms equivalent: instead of maintaining two lists (allMovies + filteredMovies),
//    you just filter the main list every time you need to display it.
//
// 2. Link component: instead of <a href="...">, React Router uses <Link to="...">.
//    This navigates without refreshing the page.
//    WinForms equivalent: opening a new Form without closing the current one.

function MovieList() {
  const [search, setSearch] = useState('')
  const [genreFilter, setGenreFilter] = useState('All')

  // Get unique genres from the data
  // WinForms equivalent: movies.Select(m => m.Genre).Distinct().ToList()
  const genres = ['All', ...new Set(movies.map(m => m.genre))]

  // --- DERIVED STATE ---
  // We don't store this in useState — we compute it every render
  // This is a common React pattern: if you can calculate something
  // from existing state, don't create a new state for it
  //
  // WinForms equivalent:
  //   var filtered = movies
  //       .Where(m => m.Title.Contains(searchText))
  //       .Where(m => genre == "All" || m.Genre == genre)
  //       .ToList();
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = genreFilter === 'All' || movie.genre === genreFilter
    return matchesSearch && matchesGenre
  })

  return (
    <div className="movie-app">
      <h2>Movies</h2>

      <div className="movie-controls">
        <input
          className="search-input"
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Genre filter buttons */}
        <div className="filter-buttons">
          {genres.map(genre => (
            <button
              key={genre}
              className={genreFilter === genre ? 'active' : ''}
              onClick={() => setGenreFilter(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <p className="result-count">{filteredMovies.length} movies found</p>

      {/* Movie list */}
      {filteredMovies.length === 0 ? (
        <p className="empty-message">No movies match your search.</p>
      ) : (
        <div className="movie-list">
          {filteredMovies.map(movie => (
            // LINK COMPONENT
            // Instead of <a href="/movies/1">, we use <Link to="/movies/1">
            // <a> would refresh the entire page (like opening a new browser tab)
            // <Link> changes the URL without refreshing (like showing a new Form)
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              className="movie-card"
            >
              <img
                className="movie-poster"
                src={movie.poster}
                alt={movie.title}
              />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <span className="year">{movie.year}</span>
                <span className="movie-genre">{movie.genre}</span>
              </div>
              <div className="movie-rating">
                {movie.rating}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default MovieList
