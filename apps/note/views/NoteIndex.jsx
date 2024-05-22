const notes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#f00d' },
        info: { txt: 'Fullstack Me Baby!' },
    },
    {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
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
                { txt: 'Coding power', doneAt: 187111111 },
            ],
        },
    },
]

export function NoteIndex() {
    return (
        <div className='note-index'>
            <input type='text' placeholder='Take a note...' className='note-input' />
            <div className='note-container'>
                {notes.map(note => {
                    switch (note.type) {
                        case 'NoteTxt':
                            return (
                                <div
                                    key={note.id}
                                    className='note-card'
                                    style={{ backgroundColor: note.style.backgroundColor }}
                                >
                                    {note.info.txt}
                                </div>
                            )
                        case 'NoteImg':
                            return (
                                <div
                                    key={note.id}
                                    className='note-card'
                                    style={{ backgroundColor: note.style.backgroundColor }}
                                >
                                    <img src={note.info.url} alt={note.info.title} />
                                    <p>{note.info.title}</p>
                                </div>
                            )
                        case 'NoteTodos':
                            return (
                                <div key={note.id} className='note-card'>
                                    <h3>{note.info.title}</h3>
                                    <ul>
                                        {note.info.todos.map((todo, index) => (
                                            <li key={index}>
                                                {todo.txt} - {todo.doneAt ? 'Done' : 'Pending'}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        default:
                            return (
                                <div key={note.id} className='note-card'>
                                    Unknown Note Type
                                </div>
                            )
                    }
                })}
            </div>
        </div>
    )
}
