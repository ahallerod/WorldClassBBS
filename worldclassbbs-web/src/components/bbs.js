import React from "react";
import BoardControl from './board-control.js';
import LoginControl from "./signin.js";
import UserSnippet from "./user-components.js";
import Logo from './logo.js'

export default class BBS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: '',
        }
        this.onSuccessfulSignin = this.successfulSignin.bind(this);
    }
    successfulSignin(username) {
        this.setState({
            username: username,
            loggedIn: true,
        });
    }

    render() {
        if (!this.state.loggedIn) {
            return (
                <LoginControl onSuccessfulSignin={this.onSuccessfulSignin} />
            )
        }
        return (
            <div>
                <table id="wrapper-table">
                    <tr>
                        <td className="bottom-border">
                            <Logo />
                        </td>
                        <td className="bottom-border">
                            <UserSnippet username={this.state.username} />
                        </td>
                    </tr>
                    <tr colSpan="2">
                        <BoardControl />
                    </tr>
                </table>
            </div>
        );
    }

}