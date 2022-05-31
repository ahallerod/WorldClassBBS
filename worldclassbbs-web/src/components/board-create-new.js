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
            <div>
                <button onClick={this.handleToggleClick} className="toggle-button">
                    Create New Board
                </button>
                <CreateNewBoard isInputVisible={this.state.isInputVisible} />
            </div>
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
                <div className='form-grid'>
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
                        <button type="submit">Create</button>
                    </form>                
                </div>
            )
        }
    }

    async addBoard(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        fetch('http://localhost:5100/Board/new', {
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