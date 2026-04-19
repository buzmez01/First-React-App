// ============================================
// NoteCard — A component that displays a single note
// ============================================
// Think of it like a UserControl in WinForms:
//   - It receives data from outside (properties)
//   - It triggers events (button click)
//
// In React, these are called "props".
// Props = data passed to a component from outside (read-only)

// WHAT ARE PROPS?
// In WinForms, you set properties on a UserControl:
//   noteCard1.Title = "Shopping";
//   noteCard1.Content = "Buy milk";
//   noteCard1.OnDelete += NoteCard_OnDelete;
//
// In React, you do the same thing in JSX:
//   <NoteCard title="Shopping" content="Buy milk" onDelete={handleDelete} />
//
// Inside the component, you access them via the "props" parameter:
//   function NoteCard(props) { ... props.title ... }
//
// Or with destructuring:
//   function NoteCard({ title, content, onDelete }) { ... }

function NoteCard({ note, onEdit, onDelete }) {
  // note = { id, title, content, date } object
  // onEdit = function to call when clicked (comes from parent)
  // onDelete = function to call when deleted (comes from parent)

  return (
    <div className="note-card" onClick={() => onEdit(note)}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-card-footer">
        <span className="date">{note.date}</span>
        <button onClick={(e) => {
          e.stopPropagation()  // prevent card click, only delete button should fire
          onDelete(note.id)
        }}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default NoteCard
