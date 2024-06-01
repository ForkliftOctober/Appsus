import { initialNotes } from '../services/note.service.js'
import { ColorPicker } from '../cmps/ColorPicker.jsx'
import { NoteActions, NoteTxt, NoteImg, NoteTodos } from '../cmps/NoteList.jsx'
import { NoteSidebar } from '../cmps/NoteSidebar.jsx'

export function NoteIndex() {
    const [notes, setNotes] = React.useState(() => {
        const savedNotes = localStorage.getItem('notes')
        return savedNotes ? JSON.parse(savedNotes) : initialNotes
    })

    const [currentNote, setCurrentNote] = React.useState('')
    const textareaRef = React.useRef(null)
    const [isColorPickerOpen, setIsColorPickerOpen] = React.useState(false)
    const [selectedNoteId, setSelectedNoteId] = React.useState(null)
    const [filter, setFilter] = React.useState('all')

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

    const handleChangeColor = (noteId, color) => {
        setNotes(prevNotes => {
            const updatedNotes = prevNotes.map(note => {
                if (note.id === noteId) {
                    return { ...note, style: { ...note.style, backgroundColor: color } }
                }
                return note
            })
            return updatedNotes
        })
        setIsColorPickerOpen(false)
    }

    const handleOpenColorPicker = noteId => {
        setSelectedNoteId(noteId)
        setIsColorPickerOpen(true)
    }

    const handleTodoToggle = (noteId, todoIdx) => {
        setNotes(prevNotes => {
            const updatedNotes = prevNotes.map(note => {
                if (note.id === noteId) {
                    const updatedTodos = note.info.todos.map((todo, idx) => {
                        if (idx === todoIdx) {
                            return { ...todo, doneAt: todo.doneAt ? null : Date.now() }
                        }
                        return todo
                    })
                    return { ...note, info: { ...note.info, todos: updatedTodos } }
                }
                return note
            })
            return updatedNotes
        })
    }
    const [isFocused, setIsFocused] = React.useState(false)

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

    React.useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes))
    }, [notes])

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

    const filteredNotes = notes => {
        if (filter === 'all') return notes
        if (filter === 'text') return notes.filter(note => note.type === 'NoteTxt')
        if (filter === 'image') return notes.filter(note => note.type === 'NoteImg')
        if (filter === 'todo') return notes.filter(note => note.type === 'NoteTodos')
    }

    return (
        <div className='note-index'>
            <div className='sidebar-container'>
                <NoteSidebar filter={filter} setFilter={setFilter} />
            </div>
            <div className='content-container'>
                <textarea
                    ref={textareaRef}
                    className={`note-input ${isFocused ? 'focused' : ''}`}
                    placeholder='Take a note...'
                    value={currentNote}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ resize: 'none', overflow: 'hidden' }}
                    rows={isFocused ? 5 : 1}
                ></textarea>

                {isColorPickerOpen && (
                    <ColorPicker
                        onSelectColor={color => handleChangeColor(selectedNoteId, color)}
                        onClose={() => setIsColorPickerOpen(false)}
                    />
                )}

                <div className='pinned-container'>
                    <h3>Pinned Notes</h3>
                    <div className='note-container'>
                        {filteredNotes(pinnedNotes).map(note =>
                            renderNote(
                                note,
                                handleDeleteNote,
                                handleCopyNote,
                                handleTogglePin,
                                handleOpenColorPicker,
                                handleTodoToggle
                            )
                        )}
                    </div>
                </div>

                <div className='regular-container'>
                    <h3>Notes</h3>
                    <div className='note-container'>
                        {filteredNotes(regularNotes).map(note =>
                            renderNote(
                                note,
                                handleDeleteNote,
                                handleCopyNote,
                                handleTogglePin,
                                handleOpenColorPicker,
                                handleTodoToggle
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function renderNote(
    note,
    handleDeleteNote,
    handleCopyNote,
    handleTogglePin,
    handleOpenColorPicker,
    handleTodoToggle
) {
    switch (note.type) {
        case 'NoteTxt':
            return (
                <NoteTxt
                    key={note.id}
                    note={note}
                    onDelete={handleDeleteNote}
                    onCopy={handleCopyNote}
                    onTogglePin={handleTogglePin}
                    onColorChange={handleOpenColorPicker}
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
                    onColorChange={handleOpenColorPicker}
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
                    onColorChange={handleOpenColorPicker}
                    handleTodoToggle={handleTodoToggle}
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
