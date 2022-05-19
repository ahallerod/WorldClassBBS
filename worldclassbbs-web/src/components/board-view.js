import React from 'react';

export default class ViewBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: null,
            posts: null,
        }
    }
    render(){
        return (
            <div>
                <ViewBoardHeader board={this.state.board} />
                <ListPosts posts={this.state.posts} />
                <ReplyToBoard />
            </div>
        )
    }
    componentDidMount(){
        this.getBoards();
    }

    getBoards() {
        const token = localStorage.getItem("token");
        fetch('http://localhost:5100/Board/' + this.props.boardID, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Token': token,
            }})
            .then(response => response.json())
            .then(data => {
                this.setState({
                    board: data.board,
                    posts: data.posts,
                });
            })
            .catch(console.error);
    }
}

class ViewBoardHeader extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        if(this.props.board != null){
            return (
                <table>
                    <tr>
                        <td colSpan={3}>
                            {this.props.board.title}
                        </td>
                    </tr>
                    <tr>
                        <td>{this.props.board.createdByUser.username}</td>
                        <td>{this.props.board.createdDate}</td>
                        <td>Views: {this.props.board.views}</td>
                    </tr>
                </table>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
        
    }
}
class ListPosts extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (

            <ViewPost />

        )
    }
}

class ViewPost extends React.Component {
    render(){
        return(
            <div>post</div>
        )
    }

}

class ReplyToBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: ''

        }
    }
    render(){
        return(
            <div>
                <form>

                </form>
            </div>
        )
    }
}