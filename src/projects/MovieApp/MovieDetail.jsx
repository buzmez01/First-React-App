import { useParams, useNavigate } from 'react-router-dom'
import movies from './movies-data'
import './MovieApp.css'

// ============================================
// URL PARAMETERS (useParams)
// ============================================
// When the user navigates to /movies/3, React Router extracts "3"
// and makes it available via useParams().
//
// WinForms equivalent:
//   You open a detail form and pass the ID:
//   var detailForm = new MovieDetailForm(movieId: 3);
//   detailForm.Show();
//
// In React Router, the ID comes from the URL instead of a constructor parameter.

function MovieDetail() {
  // useParams extracts URL parameters
  // If the URL is /movies/3, then id = "3" (always a string)
  const { id } = useParams()

  // useNavigate gives us a function to navigate programmatically
  // WinForms equivalent: this.Close() to go back to the previous form
  const navigate = useNavigate()

  // Find the movie by ID
  // parseInt converts string "3" to number 3
  const movie = movies.find(m => m.id === parseInt(id))

  // If movie not found, show error
  if (!movie) {
    return (
      <div className="movie-detail">
        <button className="back-button" onClick={() => navigate('/movies')}>
          Back to list
        </button>
        <p className="empty-message">Movie not found.</p>
      </div>
    )
  }

  return (
    <div className="movie-detail">
      <button className="back-button" onClick={() => navigate('/movies')}>
        Back to list
      </button>

      <div className="detail-header">
        <img
          className="detail-poster"
          src={movie.poster}
          alt={movie.title}
        />
        <div className="detail-info">
          <h2>{movie.title}</h2>
          <p className="year">{movie.year}</p>
          <div className="detail-meta">
            <span className="movie-genre">{movie.genre}</span>
            <span className="movie-rating">{movie.rating}</span>
          </div>
        </div>
      </div>

      <p className="detail-description">{movie.description}</p>
    </div>
  )
}

export default MovieDetail
