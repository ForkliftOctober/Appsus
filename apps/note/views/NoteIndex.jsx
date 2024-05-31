import { initialNotes } from '../services/note.service.js'
import { ColorPicker } from '../cmps/ColorPicker.jsx'
import { NoteActions, NoteTxt, NoteImg, NoteTodos } from '../cmps/NoteList.jsx'

export function NoteIndex() {
    const [notes, setNotes] = React.useState(() => {
        const savedNotes = localStorage.getItem('notes')
        return savedNotes ? JSON.parse(savedNotes) : initialNotes
    })

    const [currentNote, setCurrentNote] = React.useState('')
    const textareaRef = React.useRef(null)
    const [isColorPickerOpen, setIsColorPickerOpen] = React.useState(false)
    const [selectedNoteId, setSelectedNoteId] = React.useState(null)

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

            {isColorPickerOpen && (
                <ColorPicker
                    onSelectColor={color => handleChangeColor(selectedNoteId, color)}
                    onClose={() => setIsColorPickerOpen(false)}
                />
            )}

            <div className='pinned-container'>
                <h3>Pinned Notes</h3>
                <div className='note-container'>
                    {pinnedNotes.map(note =>
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
                    {regularNotes.map(note =>
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
