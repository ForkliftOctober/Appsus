export const NoteActions = ({ noteId, onColorChange, onCopy, onTogglePin, onDelete, isPinned }) => (
    <div className='note-actions'>
        <button onClick={() => onTogglePin(noteId)} title={isPinned ? 'Unpin Note' : 'Pin Note'}>
            <i className='fa-solid fa-thumbtack'></i>
        </button>
        <button onClick={() => onColorChange(noteId)} title='Background options'>
            <i className='fa-solid fa-palette'></i>
        </button>
        <button onClick={() => onCopy(noteId)} title='Make a copy'>
            <i className='fa-solid fa-copy'></i>
        </button>
        <button onClick={() => onDelete(noteId)} title='Delete Note'>
            <i className='fa-solid fa-trash'></i>
        </button>
    </div>
)

export const NoteTxt = ({ note, onColorChange, onCopy, onTogglePin, onDelete }) => (
    <div className='note-card' style={note.style || {}}>
        {note.info.txt}
        <NoteActions
            noteId={note.id}
            onColorChange={onColorChange}
            onCopy={onCopy}
            onTogglePin={onTogglePin}
            onDelete={onDelete}
            isPinned={note.isPinned}
        />
    </div>
)

export const NoteImg = ({ note, onColorChange, onCopy, onTogglePin, onDelete }) => (
    <div className='note-card' style={note.style || {}}>
        <img src={note.info.url} alt={note.info.title} />
        <p>{note.info.title}</p>
        <NoteActions
            noteId={note.id}
            onColorChange={onColorChange}
            onCopy={onCopy}
            onTogglePin={onTogglePin}
            onDelete={onDelete}
            isPinned={note.isPinned}
        />
    </div>
)

export const NoteTodos = ({
    note,
    onColorChange,
    onCopy,
    onTogglePin,
    onDelete,
    handleTodoToggle,
}) => (
    <div className='note-card' style={note.style || {}}>
        <h4>{note.info.title}</h4>
        <ul>
            {note.info.todos.map((todo, index) => (
                <li key={index} className={todo.doneAt ? 'done' : ''}>
                    <input
                        type='checkbox'
                        checked={!!todo.doneAt}
                        onChange={() => handleTodoToggle(note.id, index)}
                    />
                    <span onClick={() => handleTodoToggle(note.id, index)}>{todo.txt}</span>
                </li>
            ))}
        </ul>
        <NoteActions
            noteId={note.id}
            onColorChange={onColorChange}
            onCopy={onCopy}
            onTogglePin={onTogglePin}
            onDelete={onDelete}
            isPinned={note.isPinned}
        />
    </div>
)
