import React from "react";
import CreateBoardControl from './board-create-new.js';
import {NavBarBoardMain} from './nav-bar.js'

export default class BoardOverview extends React.Component {
    constructor() {
        super();
        this.state = {
            boards: [],
            sort: 'date',
        }
        this.getBoards = this.getBoards.bind(this);
    }
    componentDidMount() {
        this.setState({boards: this.getBoards()});
    }

    render() {
        return (
            <div className="board-grid">
                <NavBarBoardMain refresh={this.getBoards} />
                <ul>
                    {this.state.rows}
                </ul>
                <div className="create-new-board">
                    <CreateBoardControl />
                </div>
            </div>
        );
    }
    
    //API METHODS

    getBoards() {
        const token = localStorage.getItem("token");
        fetch('http://localhost:5100/Board/?sort=' + this.state.sort, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Token': token,
            }})
            .then(response => response.json())
            .then(data => {
                const oneliners = [];
                let i = 1;
                data.forEach((board) => {
                    oneliners.push(
                        <BoardOneliner board={board} viewBoardCallback = {this.props.viewBoardCallback} key={i.toString()} />
                    )
                    i++;
                });
                this.setState({rows : oneliners});
            })
            .catch(console.error);
    }
}

class BoardOneliner extends React.Component {
    onClickHandler = () => {
        this.props.viewBoardCallback(this.props.board.boardId);
    }
    render() {
        const board = this.props.board;
        return (
            <li className="board-item" onClick={this.onClickHandler}>
                <div>{board.title} created by {board.createdByUser.username}</div>
                <div>{board.createdDate} {board.createdTime} | {board.noOfPosts} replies, {board.views} views</div>
            </li>
        )
    }
}
