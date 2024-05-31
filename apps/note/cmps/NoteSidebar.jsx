export function NoteSidebar({ filter, setFilter }) {
    return (
        <div className='note-sidebar'>
            <ul>
                <li>
                    <button
                        onClick={() => setFilter('all')}
                        className={filter === 'all' ? 'active' : ''}
                    >
                        <i className='fas fa-sticky-note'></i> Notes
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setFilter('text')}
                        className={filter === 'text' ? 'active' : ''}
                    >
                        <i className='fas fa-bell'></i> Reminders
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setFilter('image')}
                        className={filter === 'image' ? 'active' : ''}
                    >
                        <i className='fas fa-tag'></i> Images
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setFilter('todo')}
                        className={filter === 'todo' ? 'active' : ''}
                    >
                        <i className='fas fa-tasks'></i> To-dos
                    </button>
                </li>
            </ul>
        </div>
    )
}
