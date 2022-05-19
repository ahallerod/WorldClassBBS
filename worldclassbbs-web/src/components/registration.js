import React from "react";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null,
        };
    }

    handleRegistration = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("https://127.0.0.1:7100/User/register", {
                method: "POST",
                body: JSON.stringify({
                    username: this.state.username,
                    email: this.state.email,
                    password: this.password
                }),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                localStorage.setItem("token", resJson.token);
            }
        } catch (error) {

        }
    }

    render() {
        return (
            <div className='Registration'>
                <form onSubmit={this.handleRegistration}>
                    <h2>Register new User</h2>
                    <label>Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={this.username}
                        required
                        pattern="[A-Za-z0-9]{4,30}"
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={this.password}
                        required
                        pattern="[A-Za-z0-9]{4,100}"
                    />
                    <label for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={this.email}
                        required
                    />
                    <input type="submit" value="Register"></input>
                </form>
            </div>
        )
    }
}

export default Registration;