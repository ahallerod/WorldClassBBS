import React from "react";
import BoardOverview from './board-components.js';
import LoginControl from "./signin.js";
import UserSnippet from "./user-components.js";

export default class BBS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: '',
        }
        this.successfulLogin = this.successfulLogin.bind(this);
    }
    successfulLogin(username) {
        this.setState({
            username: username,
            loggedIn: true,
        });
    }

    render() {
        if (!this.state.loggedIn) {
            return (
                <LoginControl onSuccessfulLogin={this.successfulLogin} />
            )
        }
        return (
            <div>
                <table border="1">
                    <tr>
                        <td>
                            <h1>World Class BBS System</h1>
                        </td>
                        <td>
                            <UserSnippet username={this.state.username} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <BoardOverview bbs={boards} />
                        </td>
                    </tr>
                </table>
            </div>
        );
    }

}

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