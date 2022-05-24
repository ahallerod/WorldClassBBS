import React from 'react';

export default class NewPostControl extends React.Component {
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
                <button onClick={this.handleToggleClick} className="toggle-button">Add Reply</button>
                <CreateNewPost boardId={this.props.boardId} isInputVisible={this.state.isInputVisible} onSubmit={this.props.onSubmit} />

            </div>
        )
    }
}

class CreateNewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        }
        this.addPost = this.addPost.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    render() {
        if (this.props.isInputVisible) {
            return (
                <div className='form-grid'>
                    <form onSubmit={this.addPost}>
                        <label>Message:</label>
                        <input
                            type="text"
                            id="message"
                            name="message"
                            value={this.state.message}
                            required
                            maxLength={70}
                            minLength={5}
                            onChange={this.handleInputChange}
                        />
                        <button type="submit">Post</button>
                    </form>
                </div>
            )
        }
    }

    async addPost(e) {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            fetch('http://localhost:5100/Post/new', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Token': token,
                },
                body: JSON.stringify({
                    message: this.state.message,
                    boardId: this.props.boardId,
                }),
            });
            
            this.setState({
                message: '',
            });
            this.props.onSubmit();
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