// useEffect = React'in "yan etki" aracı
// WinForms'ta Form_Load içinde API çağrısı yaparsın
// React'te useEffect içinde yaparsın
import { useState, useEffect } from 'react'
import './WeatherApp.css'

// Open-Meteo API kullanıyoruz — ücretsiz, API key gerektirmiyor
// WinForms'ta HttpClient ile istek atarsın, burada fetch() kullanıyoruz

function WeatherApp() {
  // --- 3 farklı state: her biri farklı bir "durumu" takip ediyor ---
  const [city, setCity] = useState('')           // input'taki şehir adı
  const [weather, setWeather] = useState(null)   // API'den gelen hava durumu verisi
  const [loading, setLoading] = useState(false)  // yükleniyor mu?
  const [error, setError] = useState('')         // hata mesajı

  // --- API'den hava durumu çek ---
  // WinForms'ta: async Task GetWeatherAsync(string city)
  // React'te:    async function fetchWeather(cityName)
  async function fetchWeather(cityName) {
    setLoading(true)    // "Yükleniyor..." göster
    setError('')        // önceki hatayı temizle
    setWeather(null)    // önceki veriyi temizle

    try {
      // ADIM 1: Şehir adını koordinata çevir (Geocoding API)
      // WinForms'ta: var response = await httpClient.GetAsync(url);
      // JavaScript'te: const response = await fetch(url)
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=tr`
      )
      const geoData = await geoResponse.json()

      // Şehir bulunamadıysa hata göster
      if (!geoData.results || geoData.results.length === 0) {
        setError('Şehir bulunamadı. Lütfen farklı bir şehir deneyin.')
        setLoading(false)
        return
      }

      const { latitude, longitude, name, country } = geoData.results[0]

      // ADIM 2: Koordinatlarla hava durumunu çek
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
      )
      const weatherData = await weatherResponse.json()

      // State'i güncelle — ekran otomatik güncellenecek
      setWeather({
        city: name,
        country: country,
        temperature: Math.round(weatherData.current.temperature_2m),
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: Math.round(weatherData.current.wind_speed_10m),
        description: getWeatherDescription(weatherData.current.weather_code)
      })
    } catch (err) {
      setError('Bir hata oluştu. İnternet bağlantınızı kontrol edin.')
    }

    setLoading(false)
  }

  // Hava durumu kodunu Türkçe açıklamaya çevir
  function getWeatherDescription(code) {
    const descriptions = {
      0: 'Açık',
      1: 'Çoğunlukla açık',
      2: 'Parçalı bulutlu',
      3: 'Kapalı',
      45: 'Sisli',
      48: 'Kırağılı sis',
      51: 'Hafif çisenti',
      53: 'Orta çisenti',
      55: 'Yoğun çisenti',
      61: 'Hafif yağmur',
      63: 'Orta yağmur',
      65: 'Şiddetli yağmur',
      71: 'Hafif kar',
      73: 'Orta kar',
      75: 'Şiddetli kar',
      80: 'Hafif sağanak',
      81: 'Orta sağanak',
      82: 'Şiddetli sağanak',
      95: 'Gök gürültülü fırtına'
    }
    return descriptions[code] || 'Bilinmiyor'
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (city.trim() === '') return
    fetchWeather(city.trim())
  }

  // ---------- useEffect: Sayfa ilk açıldığında çalışır ----------
  // WinForms'ta: Form_Load event'i
  // useEffect(() => { ... }, [])
  //                           ^^
  //                     boş dizi = "sadece ilk açılışta çalış"
  //
  // Eğer [city] yazsaydık → city her değiştiğinde çalışırdı
  // Eğer [] yazsaydık     → sadece component ilk yüklendiğinde çalışır
  // Eğer hiç yazmasaydık  → her render'da çalışır (genelde istemezsin)
  useEffect(() => {
    fetchWeather('Istanbul')  // sayfa açılınca İstanbul'u göster
  }, [])

  return (
    <div className="weather-app">
      <h2>Hava Durumu</h2>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Şehir ara... (örn: Ankara)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Ara</button>
      </form>

      {/* --- Koşullu Render: 4 farklı durum --- */}
      {/* WinForms'ta: if/else ile panel.Visible ayarlarsın */}
      {/* React'te: JSX içinde && veya ? : kullanırsın */}

      {loading && (
        <p className="loading">Yükleniyor...</p>
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
              <div className="detail-value">%{weather.humidity}</div>
              <div className="detail-label">Nem</div>
            </div>
            <div className="detail">
              <div className="detail-value">{weather.windSpeed} km/s</div>
              <div className="detail-label">Rüzgar</div>
            </div>
          </div>
        </div>
      )}

      {!weather && !loading && !error && (
        <p className="initial-message">Bir şehir arayarak hava durumunu öğrenin</p>
      )}
    </div>
  )
}

export default WeatherApp
