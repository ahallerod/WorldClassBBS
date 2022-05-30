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
        this.refresh = this.refresh.bind(this);
    }
    render(){
        return (
            <div className='board-grid'>
                <NavBarViewBoard viewBoardMain={this.props.viewBoardMain} refresh={this.refresh} />
                <ViewBoardHeader board={this.state.board} />
                <ListPosts posts={this.state.posts} />
                <NewPostControl boardId={this.state.boardId} onSubmit={this.refresh} />
            </div>
        )
    }
    componentDidMount(){
        this.getBoard();
    }

    refresh() {
        this.getBoard();
    }

    getBoard() {
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
    render() {
        if(this.props.board != null){
            return (
                <div className='board-header'>
                    <div><h2>{this.props.board.title}</h2></div>
                    <div>
                        Created by: {this.props.board.createdByUser.username}<br />
                        {this.props.board.createdDate}
                        &nbsp;Views: {this.props.board.views}                        
                    </div>
                </div>
            )
        } else {
            return (
                <h2>Loading...</h2>
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
            return ( <ul>{posts}</ul> );
        } else {
            return (<div className='no-posts'>No Posts in this Board!</div>);
        }
    }
}

class ViewPost extends React.Component {
    render(){
        return(
            <li>
                <div>{this.props.post.message}</div>
                <div>by {this.props.post.createdByUser.username} @ {this.props.post.createdDate} {this.props.post.createdTime}</div>
            </li>
        )
    }

}