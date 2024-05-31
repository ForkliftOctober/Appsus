export const initialNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#CCFF90' },
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
        style: { backgroundColor: '#F28B82' },
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