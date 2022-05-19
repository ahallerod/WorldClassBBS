import React from 'react';
import BoardOverview from './board-overview.js';
import ViewBoard from './board-view.js';

export default class BoardControl extends React.Component {
    constructor() {
        super();
        this.state = {
            navigation: 'board-main',
            viewboardID: null,

        }
    }
    render() {
        switch (this.state.navigation) {
            case 'board-main':
                return(<BoardOverview viewBoardCallback = {this.viewBoardCallback} />);

            case 'view-board':
                return(<ViewBoard boardID={this.state.viewboardID} />);
            default:
                return(<BoardOverview />);
        }
    }

    viewBoardCallback = (boardID) => {
        this.setState({
            navigation: 'view-board',
            viewboardID: boardID,
        })
    }
    

}