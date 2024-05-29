const initialNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#f00d' },
        info: {
            txt: 'Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby! Fullstack Me Baby! ',
        },
    },
    {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://www.ynet.co.il/PicServer2/24012010/2522593/bobi_gd.jpg',
            title: 'Bobi and Me',
        },
        style: { backgroundColor: '#f00d' },
    },
    {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Keeping at it!', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 },
            ],
        },
    },
]

const NoteActions = ({ noteId, onColorChange, onCopy, onTogglePin, onDelete, isPinned }) => (
    <div className='note-actions'>
        <button onClick={() => onTogglePin(noteId)} title={isPinned ? 'Unpin Note' : 'Pin Note'}>
            <i className='fa-solid fa-thumbtack'></i>
        </button>
        <button onClick={() => onColorChange(noteId)} title='Change Color'>
            <i className='fa-solid fa-palette'></i>
        </button>
        <button onClick={() => onCopy(noteId)} title='Copy Note'>
            <i className='fa-solid fa-copy'></i>
        </button>
        <button onClick={() => onDelete(noteId)} title='Delete Note'>
            <i className='fa-solid fa-trash'></i>
        </button>
    </div>
)

const NoteTxt = ({ note, onColorChange, onCopy, onTogglePin, onDelete }) => (
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

const NoteImg = ({ note, onColorChange, onCopy, onTogglePin, onDelete }) => (
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

const NoteTodos = ({ note, onColorChange, onCopy, onTogglePin, onDelete }) => (
    <div className='note-card' style={note.style || {}}>
        <h4>{note.info.title}</h4>
        <ul>
            {note.info.todos.map((todo, index) => (
                <li key={index}>
                    {todo.txt} - {todo.doneAt ? 'Done' : 'Pending'}
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

export function NoteIndex() {
    const [notes, setNotes] = React.useState(() => {
        const savedNotes = localStorage.getItem('notes')
        return savedNotes ? JSON.parse(savedNotes) : initialNotes
    })

    const handleDeleteNote = noteId => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
    }

    const handleCopyNote = noteId => {
        const noteToCopy = notes.find(note => note.id === noteId)
        if (noteToCopy) {
            const newNote = { ...noteToCopy, id: 'n' + new Date().getTime() }
            setNotes(prevNotes => [...prevNotes, newNote])
        }
    }

    const handleTogglePin = noteId => {
        setNotes(prevNotes => {
            const updatedNotes = prevNotes.map(note => {
                if (note.id === noteId) {
                    return { ...note, isPinned: !note.isPinned }
                }
                return note
            })
            return updatedNotes
        })
    }

    React.useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes))
    }, [notes])

    const [currentNote, setCurrentNote] = React.useState('')
    const textareaRef = React.useRef(null)

    const handleChange = event => {
        setCurrentNote(event.target.value)
        textareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }

    React.useEffect(() => {
        const handleOutsideClick = event => {
            if (currentNote.trim() && !textareaRef.current.contains(event.target)) {
                const newNote = {
                    id: 'n' + new Date().getTime(),
                    createdAt: Date.now(),
                    type: 'NoteTxt',
                    isPinned: false,
                    info: {
                        txt: currentNote.trim(),
                    },
                }
                setNotes(prevNotes => [...prevNotes, newNote])
                setCurrentNote('')
                textareaRef.current.style.height = 'auto'
            }
        }

        document.addEventListener('click', handleOutsideClick)
        return () => document.removeEventListener('click', handleOutsideClick)
    }, [currentNote])

    const pinnedNotes = notes.filter(note => note.isPinned)
    const regularNotes = notes.filter(note => !note.isPinned)

    return (
        <div className='note-index'>
            <textarea
                ref={textareaRef}
                className='note-input'
                placeholder='Take a note...'
                value={currentNote}
                onChange={handleChange}
                style={{ resize: 'none', overflow: 'hidden' }}
                rows={1}
            ></textarea>

            <div className='pinned-container'>
                <h3>Pinned Notes</h3>
                <div className='note-container'>
                    {pinnedNotes.map(note =>
                        renderNote(note, handleDeleteNote, handleCopyNote, handleTogglePin)
                    )}
                </div>
            </div>

            <div className='regular-container'>
                <h3>Notes</h3>
                <div className='note-container'>
                    {regularNotes.map(note =>
                        renderNote(note, handleDeleteNote, handleCopyNote, handleTogglePin)
                    )}
                </div>
            </div>
        </div>
    )
}

function renderNote(note, handleDeleteNote, handleCopyNote, handleTogglePin) {
    switch (note.type) {
        case 'NoteTxt':
            return (
                <NoteTxt
                    key={note.id}
                    note={note}
                    onDelete={handleDeleteNote}
                    onCopy={handleCopyNote}
                    onTogglePin={handleTogglePin}
                />
            )
        case 'NoteImg':
            return (
                <NoteImg
                    key={note.id}
                    note={note}
                    onDelete={handleDeleteNote}
                    onCopy={handleCopyNote}
                    onTogglePin={handleTogglePin}
                />
            )
        case 'NoteTodos':
            return (
                <NoteTodos
                    key={note.id}
                    note={note}
                    onDelete={handleDeleteNote}
                    onCopy={handleCopyNote}
                    onTogglePin={handleTogglePin}
                />
            )
        default:
            return (
                <div key={note.id} className='note-card'>
                    Unknown Note Type
                </div>
            )
    }
}
