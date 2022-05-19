import React from "react";
import fetchApi from './helpers/api.js';

class BoardOneliner extends React.Component {
    render() {
        const board = this.props.board;
        return (
            <tr>
                <td>
                    {board.title} created by {board.createdByUser.username}. {board.noOfPosts} posts, {board.views} views.
                </td>
            </tr>
        )
    }
}

class CreateBoardControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isInputVisible: false }
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(state => ({
            isInputVisible: !state.isInputVisible
        }));
    }

    render() {
        return (
            <table>
                <thead>
                    <tr onClick={this.handleToggleClick}><td colspan="2">Create New Board</td></tr>
                </thead>
                <CreateNewBoard isInputVisible={this.state.isInputVisible} />
            </table>
        )
    }
}

class CreateNewBoard extends React.Component {
    render() {
        if (this.props.isInputVisible) {
            return (
                <tbody>
                    <tr>
                        <td>Title:</td>
                        <td><input type="text" /></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <textarea></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2"><button>Create</button></td>
                    </tr>
                </tbody>
            )
        }
    }
}

export default class BoardOverview extends React.Component {
    constructor() {
        super();
        this.state = {
            boards: [],
            sort: 'date',
        }
    }
    componentDidMount() {
        this.setState( { boards: fetchApi('Board/?sort=' + this.state.sort)});
    }
    render() {
        const rows = [];

        /*this.state.boards.forEach((board) => {
            rows.push(
                <BoardOneliner board={board} />
            )

        });*/

        return (
            <div>
                <table border="1">
                    <tbody>
                        {rows}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <CreateBoardControl />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}