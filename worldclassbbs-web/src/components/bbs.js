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
                <div id="wrapper">
                    <LoginControl onSuccessfulSignin={this.onSuccessfulSignin} />
                </div>
            )
        }
        return (
            <div id="wrapper">
                <div className="bbs-grid">
                    <Logo />
                    <UserSnippet username={this.state.username} />
                    <BoardControl />           
                </div>

            </div>
        );
    }

}