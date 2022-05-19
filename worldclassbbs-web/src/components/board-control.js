import React from 'react';
import BoardOverview from './board-overview.js';

export default class BoardControl extends React.Component {
    constructor() {
        super();
        this.state = {
            navigation: 'board-main',

        }
    }
    render() {
        switch (this.state.navigation) {
            case 'board-main':
                return(<BoardOverview />);

            case 'view-tread':

                return;
            default:
                return(<BoardOverview />);
        }
        
    }

    

}


//TEST DATA

const boards = [
    {
        "boardId": 1,
        "title": "The first board in the BBS",
        "noOfPosts": 4,
        "views": 8,
        "createdDate": "0001-01-01T00:00:00",
        "createdByUser": {
            "username": "BlackKnight"
        }
    },
    {
        "boardId": 2,
        "title": "The second board in the BBS",
        "noOfPosts": 0,
        "views": 0,
        "createdDate": "0001-01-01T00:00:00",
        "createdByUser": {
            "username": "BlackKnight"
        }
    }
]