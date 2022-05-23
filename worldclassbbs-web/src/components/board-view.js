import React from 'react';
import {NavBarViewBoard} from './nav-bar.js';
import NewPostControl from './post-create-new.js'

export default class ViewBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: null,
            posts: null,
            boardId: null,
        }
    }
    render(){
        return (
            <div>
                <NavBarViewBoard viewBoardMain={this.props.viewBoardMain} />
                <ViewBoardHeader board={this.state.board} />
                <ListPosts posts={this.state.posts} />
                <NewPostControl boardId={this.state.boardId} />
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
                    boardId: data.board.boardId,
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
        this.state = {
            renderposts: [],
        }
    }
    render(){
        if(this.props.posts != null && this.props.posts.length > 0) {
            let posts = [];
            let i = 1;
            this.props.posts.forEach((post) => {
                posts.push(
                    <ViewPost post={post} key={i.toString()} />
                )
                i++;
            });
            return ( <div>{posts}</div> );
        } else {
            return (<div>No Posts in this Board!</div>);
        }
    }
}

class ViewPost extends React.Component {
    render(){
        return(
            <div>{this.props.post.message} by {this.props.post.createdByUser.username}</div>
        )
    }

}