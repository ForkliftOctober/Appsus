export const initialNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#CCFF90' },
        info: {
            txt: 'Fullstack Me Baby!',
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
    {
        id: 'n104',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://new-edifier-us-oss.edifier.com/images/20230801/77bb9998353cae7dedfee503d30a4348.png',
            title: 'R1280DB',
        },
        style: { backgroundColor: '#D7AEFB' },
    },
    {
        id: 'n105',
        type: 'NoteTodos',
        isPinned: true,
        info: {
            title: 'Shopping list',
            todos: [
                { txt: 'במבה', doneAt: null },
                { txt: 'שוקולית', doneAt: null },
                { txt: 'חלב', doneAt: 187111111 },
                { txt: 'פרמזן', doneAt: null },
            ],
        },
        style: { backgroundColor: '#FFF475' },
    },
]
