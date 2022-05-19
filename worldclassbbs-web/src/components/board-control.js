import React from 'react';
import BoardOverview from './board-overview.js';

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
                return(<BoardOverview />);

            case 'view-tread':

                return;
            default:
                return(<BoardOverview />);
        }
        
    }

    

}