import React from 'react';
import Registration from './registration.js';
import Logo from './logo.js';

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
                <div className="login-grid">
                    <Logo />
                    <Registration />
                    <button onClick={this.handleToggleClick} className="toggle-button">Already have an account? Signin!</button>
                </div>
            );
        }
        else {
            return (
                <div className="login-grid">
                    <Logo />
                    <Signin onSuccessfulSignin={this.props.onSuccessfulSignin} />
                    <button onClick={this.handleToggleClick} className="toggle-button">No account? Register!</button>
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
            failedSignin: false
        };
        this.handleSignin = this.handleSignin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    };

    async handleSignin(e) {
        e.preventDefault();

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
        
        if (res.status === 200) {
            let resJson = await res.json();
            localStorage.setItem("token", resJson.token);
            this.props.onSuccessfulSignin(this.state.username);
        } else if (res.status === 401) {
            this.setState({
                failedSignin: true,
            });
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
            <div className='form-grid'>
                <h2>Sign in</h2>
                <form onSubmit={this.handleSignin}>
                    <label>Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        required
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        required
                    />
                    <button type="submit">Sign in</button>
                </form>
                {this.state.failedSignin &&
                    <span className="warning">Username or Password incorrect. Try again.</span>
                }   
            </div>
        );
    }
}

export default LoginControl;