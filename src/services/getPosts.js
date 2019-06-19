import moment from 'moment';
//TODO: mock stub
export const posts = [{
    photoUrl: "https://source.unsplash.com/random/209x209",
    caption: "text",
    userId: 1,
    createdAt: moment("20180101", "YYYYMMDD"),
    updatedAt: moment("20180101", "YYYYMMDD"),
    address: "Shanghai China",
    lat: 0,
    lng: 0,
    likesCount: 108,
    comments_count: 2,
    user: {
        username: 'toeinriver',
        avatarUrl: 'https://source.unsplash.com/random/201x201'
    },
    comments: [{
        id: 1,
        username: 'toeinriver',
        body: 'yay'
    },
        {
            id: 2,
            username: 'someone',
            body: 'hahaha'
        },
    ],
    commentPagination: {
        nextPage: null,
        currentPage: null
    }
}, {
    photoUrl: "https://source.unsplash.com/random/202x202",
    caption: "text",
    userId: 1,
    createdAt: moment("20180101", "YYYYMMDD"),
    updatedAt: moment("20180101", "YYYYMMDD"),
    address: "Shanghai China",
    lat: 0,
    lng: 0,
    likesCount: 108,
    comments_count: 2,
    user: {
        username: 'toeinriver',
        avatarUrl: 'https://source.unsplash.com/random/203x203'
    },
    comments: [{
        id: 1,
        username: 'toeinriver',
        body: 'yay'
    },
        {
            id: 2,
            username: 'someone',
            body: 'hahaha'
        },
    ],
    commentPagination: {
        nextPage: null,
        currentPage: null
    }
}, {
    photoUrl: "https://source.unsplash.com/random/200x200",
    caption: "text",
    userId: 1,
    createdAt: moment("20180101", "YYYYMMDD"),
    updatedAt: moment("20180101", "YYYYMMDD"),
    address: "Shanghai China",
    lat: 0,
    lng: 0,
    likesCount: 108,
    comments_count: 2,
    user: {
        username: 'toeinriver',
        avatarUrl: 'https://source.unsplash.com/random/204x204'
    },
    comments: [{
        id: 1,
        username: 'toeinriver',
        body: 'yay'
    },
        {
            id: 2,
            username: 'someone',
            body: 'hahaha'
        },
    ],
    commentPagination: {
        nextPage: null,
        currentPage: null
    }
}
];