import React from 'react';
import { UserContext } from '../App.js';
import Registration from './registration.js'

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showRegistration: false,
        }
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(state => ({
            showRegistration: !state.showRegistration
        }));
    }

    render() {
        if (this.state.showRegistration) {
            return (
                <div>
                    <Registration />
                    <button onClick={this.handleToggleClick}>Already have an account? Signin!</button>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Signin onSuccessfulSignin={this.props.onSuccessfulSignin} />
                    <button onClick={this.handleToggleClick}>No account? Register!</button>
                </div>
            );
        }
    }
}

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.handleSignin = this.handleSignin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    };

    async handleSignin(e) {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:5100/User/signin", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                }),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                localStorage.setItem("token", resJson.access_token);
                this.props.onSuccessfulSignin(this.state.username);
            }
        } catch (error) {

        }
    }
    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <UserContext.Provider value={this.state.username}>
                <div className='Login'>
                    <form onSubmit={this.handleSignin}>
                        <h2>Signin</h2>
                        <label for="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            required
                        />
                        <label for="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            required
                        />
                        <input type="submit" value="Sign in"></input>
                    </form>
                </div>
            </UserContext.Provider>
        );
    }
}

export default LoginControl;