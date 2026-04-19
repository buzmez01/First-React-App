// useEffect = React's "side effect" tool
// In WinForms, you make API calls inside Form_Load
// In React, you do it inside useEffect
import { useState, useEffect } from 'react'
import './WeatherApp.css'

// Using Open-Meteo API — free, no API key required
// In WinForms you'd use HttpClient, here we use fetch()

function WeatherApp() {
  // --- 3 different states: each tracks a different "status" ---
  const [city, setCity] = useState('')           // city name in the input
  const [weather, setWeather] = useState(null)   // weather data from API
  const [loading, setLoading] = useState(false)  // is it loading?
  const [error, setError] = useState('')         // error message

  // --- Fetch weather from API ---
  // WinForms equivalent: async Task GetWeatherAsync(string city)
  async function fetchWeather(cityName) {
    setLoading(true)
    setError('')
    setWeather(null)

    try {
      // STEP 1: Convert city name to coordinates (Geocoding API)
      // WinForms: var response = await httpClient.GetAsync(url);
      // JavaScript: const response = await fetch(url)
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en`
      )
      const geoData = await geoResponse.json()

      if (!geoData.results || geoData.results.length === 0) {
        setError('City not found. Please try a different city.')
        setLoading(false)
        return
      }

      const { latitude, longitude, name, country } = geoData.results[0]

      // STEP 2: Fetch weather using coordinates
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
      )
      const weatherData = await weatherResponse.json()

      // Update state — the screen will refresh automatically
      setWeather({
        city: name,
        country: country,
        temperature: Math.round(weatherData.current.temperature_2m),
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: Math.round(weatherData.current.wind_speed_10m),
        description: getWeatherDescription(weatherData.current.weather_code)
      })
    } catch (err) {
      setError('An error occurred. Please check your internet connection.')
    }

    setLoading(false)
  }

  // Convert weather code to description
  function getWeatherDescription(code) {
    const descriptions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Light rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Light snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      80: 'Light showers',
      81: 'Moderate showers',
      82: 'Heavy showers',
      95: 'Thunderstorm'
    }
    return descriptions[code] || 'Unknown'
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (city.trim() === '') return
    fetchWeather(city.trim())
  }

  // ---------- useEffect: Runs when the page first loads ----------
  // WinForms equivalent: Form_Load event
  // useEffect(() => { ... }, [])
  //                           ^^
  //                     empty array = "run only on first load"
  //
  // If we wrote [city]  → runs every time city changes
  // If we wrote []      → runs only when component first loads
  // If we wrote nothing → runs on every render (usually not what you want)
  useEffect(() => {
    fetchWeather('Istanbul')
  }, [])

  return (
    <div className="weather-app">
      <h2>Weather</h2>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search city... (e.g. London)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* --- Conditional Rendering: 4 different states --- */}
      {/* WinForms equivalent: setting panel.Visible with if/else */}

      {loading && (
        <p className="loading">Loading...</p>
      )}

      {error && (
        <p className="error-message">{error}</p>
      )}

      {weather && !loading && (
        <div className="weather-card">
          <div className="city-name">{weather.city}</div>
          <div className="country">{weather.country}</div>
          <div className="temperature">{weather.temperature}°C</div>
          <div className="description">{weather.description}</div>

          <div className="weather-details">
            <div className="detail">
              <div className="detail-value">{weather.humidity}%</div>
              <div className="detail-label">Humidity</div>
            </div>
            <div className="detail">
              <div className="detail-value">{weather.windSpeed} km/h</div>
              <div className="detail-label">Wind</div>
            </div>
          </div>
        </div>
      )}

      {!weather && !loading && !error && (
        <p className="initial-message">Search for a city to see the weather</p>
      )}
    </div>
  )
}

export default WeatherApp
