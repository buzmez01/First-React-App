import { useState, useEffect } from 'react'
import NoteCard from './NoteCard'
import './NotesApp.css'

function NotesApp() {
  // --- STATE ---
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // Edit mode: which note is being edited?
  // null = adding a new note, an id = editing that note
  // WinForms equivalent: if editingId != null show "Update" button, otherwise show "Add"
  const [editingId, setEditingId] = useState(null)

  // ============================================
  // localStorage: Storing Data in the Browser
  // ============================================
  // WinForms equivalent: Settings.Default.Save() or File.WriteAllText()
  // In web:              localStorage.setItem("key", "value")
  //
  // localStorage only stores strings, so:
  //   Saving: JSON.stringify(notes)  →  convert object to string
  //   Loading: JSON.parse(string)    →  convert string to object
  //
  // C# equivalent:
  //   JsonSerializer.Serialize(notes)
  //   JsonSerializer.Deserialize<List<Note>>(json)

  // ON PAGE LOAD: load notes from localStorage
  // useEffect + [] = Form_Load
  useEffect(() => {
    const saved = localStorage.getItem('notes')
    if (saved) {
      setNotes(JSON.parse(saved))
    }
  }, [])

  // WHEN NOTES CHANGE: save to localStorage
  // useEffect + [notes] = "run this code every time notes changes"
  //
  // In WinForms you'd do this manually:
  //   call SaveToFile() after every Add/Delete/Update
  //
  // In React, useEffect does this automatically:
  //   notes changed → useEffect triggered → saved to localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])
  //   ^^^^^^
  //   dependency array: "run when notes changes"
  //   In Weather App we used [] (run only once)
  //   Here we use [notes] (run every time notes changes)

  // --- CRUD Operations ---
  // C = Create, R = Read, U = Update, D = Delete

  // CREATE / UPDATE
  function handleSave() {
    if (title.trim() === '') return

    if (editingId) {
      // UPDATE — update existing note
      setNotes(notes.map(note =>
        note.id === editingId
          ? { ...note, title: title.trim(), content: content.trim() }
          : note
      ))
    } else {
      // CREATE — add new note
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        date: new Date().toLocaleDateString('en-US')
      }
      setNotes([newNote, ...notes])  // add new note to the beginning
    }

    // Clear the form
    setTitle('')
    setContent('')
    setEditingId(null)
  }

  // Switch to edit mode
  function handleEdit(note) {
    setTitle(note.title)
    setContent(note.content)
    setEditingId(note.id)
  }

  // Cancel editing
  function handleCancel() {
    setTitle('')
    setContent('')
    setEditingId(null)
  }

  // DELETE
  function handleDelete(id) {
    setNotes(notes.filter(note => note.id !== id))
    // If the deleted note was being edited, clear the form
    if (editingId === id) {
      handleCancel()
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    handleSave()
  }

  return (
    <div className="notes-app">
      <h2>Notes</h2>

      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Note content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="note-form-buttons">
          <button type="submit" className="btn-save">
            {/* If editingId exists show "Update", otherwise show "Add" */}
            {editingId ? 'Update' : 'Add'}
          </button>
          {/* Cancel button only visible in edit mode */}
          {editingId && (
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Notes List */}
      {notes.length === 0 ? (
        <p className="empty-message">No notes yet. Add one above!</p>
      ) : (
        <div className="notes-list">
          {notes.map(note => (
            // Passing PROPS to NoteCard
            // Each prop = a WinForms property assignment
            <NoteCard
              key={note.id}
              note={note}              // data
              onEdit={handleEdit}      // edit callback
              onDelete={handleDelete}  // delete callback
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default NotesApp
