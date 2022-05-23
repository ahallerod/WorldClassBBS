import React from 'react';

export default class CreateBoardControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isInputVisible: false,
            rows: [],
        }
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
                    <tr onClick={this.handleToggleClick}>
                        <td>Create New Board</td>
                    </tr>
                </thead>
                <CreateNewBoard isInputVisible={this.state.isInputVisible} />
            </table>
        )
    }
}

class CreateNewBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
        }
        this.addBoard = this.addBoard.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    render() {
        if (this.props.isInputVisible) {
            return (
                <tbody>
                    <tr>
                        <td>
                            <form onSubmit={this.addBoard}>
                                <label>Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={this.state.title}
                                    required
                                    maxLength={70}
                                    minLength={5}
                                    onChange={this.handleInputChange}
                                />
                                <input type="submit" value="Create"></input>
                            </form>
                        </td>
                    </tr>
                </tbody>
            )
        }
    }

    async addBoard(e) {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            let res = fetch('http://localhost:5100/Board/new', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Token': token,
                },
                body: JSON.stringify({
                    title: this.state.title,
                }),
            });
            
            this.setState({
                title: '',
            });
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
}