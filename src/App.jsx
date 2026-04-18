// useState = React'in "state" yönetim aracı
// WinForms'ta bir değişkeni değiştirdiğinde ekranı manuel güncellersin (label1.Text = "...")
// React'te useState kullanırsın: değer değişince ekran OTOMATİK güncellenir
import { useState } from 'react'
import './App.css'

function App() {
  // ---------- STATE (Durum Değişkenleri) ----------
  // WinForms'ta: private List<TodoItem> todos = new List<TodoItem>();
  // React'te:    const [todos, setTodos] = useState([])
  //
  // todos     = mevcut değer (okumak için)
  // setTodos  = değeri değiştiren fonksiyon (yazmak için)
  // useState([]) = başlangıç değeri boş dizi
  const [todos, setTodos] = useState([])

  // Input kutusundaki yazı için ayrı bir state
  // WinForms'ta: textBox1.Text
  // React'te:    inputValue state'i
  const [inputValue, setInputValue] = useState('')

  // ---------- EVENT HANDLERS (Olay İşleyicileri) ----------
  // WinForms'ta: private void btnEkle_Click(object sender, EventArgs e)
  // React'te:    function handleAddTodo()
  function handleAddTodo() {
    // Boş input kontrolü
    if (inputValue.trim() === '') return

    // Yeni todo objesi oluştur
    const newTodo = {
      id: Date.now(),           // benzersiz ID (WinForms'taki gibi)
      text: inputValue.trim(),  // todo metni
      completed: false          // tamamlandı mı?
    }

    // State'i güncelle — ESKİ diziyi değiştirmiyoruz, YENİ dizi oluşturuyoruz
    // WinForms'ta: todos.Add(newTodo) → listeyi doğrudan değiştirirsin
    // React'te:    setTodos([...todos, newTodo]) → yeni dizi oluşturup set edersin
    // "...todos" = spread operator, mevcut elemanları yeni diziye kopyalar
    setTodos([...todos, newTodo])

    // Input'u temizle
    setInputValue('')
  }

  // Todo'yu tamamlandı/tamamlanmadı olarak işaretle
  function handleToggleTodo(id) {
    // Her todo'yu kontrol et, ID eşleşirse completed'ı tersine çevir
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }  // bu todo'yu güncelle
        : todo                                       // diğerlerini olduğu gibi bırak
    ))
  }

  // Todo sil
  function handleDeleteTodo(id) {
    // filter = ID eşleşMEYENleri tut (yani eşleşeni sil)
    // WinForms'ta: todos.RemoveAll(t => t.Id == id)
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Form submit olduğunda (Enter tuşu veya buton tıklama)
  function handleSubmit(e) {
    e.preventDefault()  // Sayfanın yenilenmesini engelle
    handleAddTodo()
  }

  // ---------- JSX (Ekran Çıktısı) ----------
  // WinForms'ta Designer'da kontrolleri sürüklersin
  // React'te JSX ile "ne görünsün" tanımlarsın
  return (
    <div className="app">
      <h1>Todo App</h1>

      {/* Form — WinForms'taki Panel + TextBox + Button gibi düşün */}
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Yeni görev ekle..."
          value={inputValue}                              // Input'un değeri state'ten gelir
          onChange={(e) => setInputValue(e.target.value)}  // Her tuş basımında state güncellenir
        />
        <button type="submit">Ekle</button>
      </form>

      {/* Todo Listesi */}
      {todos.length === 0 ? (
        // Liste boşsa mesaj göster
        <p className="empty-message">Henüz görev yok. Yukarıdan ekleyin!</p>
      ) : (
        // Liste doluysa todo'ları göster
        // .map() = WinForms'taki foreach gibi, her eleman için bir JSX döndürür
        <ul className="todo-list">
          {todos.map(todo => (
            // key = React'in her elemanı takip etmesi için gerekli benzersiz değer
            // className = CSS class'ı (completed ise ek class ekle)
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

export default App
