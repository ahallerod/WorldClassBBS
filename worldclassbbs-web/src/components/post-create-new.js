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
            <table>
                <thead>
                    <tr onClick={this.handleToggleClick}><td colspan="2">Add Reply</td></tr>
                </thead>
                <CreateNewPost boardId={this.props.boardId} isInputVisible={this.state.isInputVisible} />
            </table>
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
                <tbody>
                    <tr>
                        <td>
                            <form onSubmit={this.addPost}>
                                <label>Message:</label>
                                <input
                                    type="text"
                                    id="message"
                                    name="message"
                                    value={this.state.title}
                                    required
                                    maxLength={70}
                                    minLength={5}
                                    onChange={this.handleInputChange}
                                />
                                <input type="submit" value="Post"></input>
                            </form>
                        </td>
                    </tr>
                </tbody>
            )
        }
    }

    async addPost(e) {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            let res = fetch('http://localhost:5100/Post/new', {
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