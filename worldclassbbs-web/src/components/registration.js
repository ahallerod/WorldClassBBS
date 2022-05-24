import React from "react";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null,
            registrationSuccess: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleRegistration = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:5100/User/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                }),
            });
            
            if (res.status === 200) {
                let resJson = await res.json();
                localStorage.setItem("token", resJson.token);
                this.setState({
                    registrationSuccess: true,
                });
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
            <div className='Registration form-grid'>
                <h2>Register new User</h2>
                <form onSubmit={this.handleRegistration}>
                    <label>Username: </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={this.handleInputChange}
                        required
                        pattern="[A-Za-z0-9]{4,30}"
                    />
                    <label>Password: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={this.handleInputChange}
                        required
                        pattern="[A-Za-z0-9]{4,100}"
                    />
                    <label>Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={this.handleInputChange}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
                {this.state.registrationSuccess &&
                    <span className="warning">Registration Successful! Please login.</span>
                }   
            </div>
        )
    }
}

export default Registration;