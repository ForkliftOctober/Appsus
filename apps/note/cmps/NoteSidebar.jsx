export function NoteSidebar({ filter, setFilter }) {
    return (
        <div className='note-sidebar'>
            <ul>
                <li>
                    <button
                        onClick={() => setFilter('all')}
                        className={filter === 'all' ? 'active' : ''}
                    >
                        <i className='fas fa-sticky-note'></i> All Notes
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setFilter('text')}
                        className={filter === 'text' ? 'active' : ''}
                    >
                        <i class='fa-solid fa-file-word'></i> Text
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setFilter('image')}
                        className={filter === 'image' ? 'active' : ''}
                    >
                        <i class='fa-regular fa-image'></i> Images
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
