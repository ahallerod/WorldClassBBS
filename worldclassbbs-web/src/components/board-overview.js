import React from "react";
import CreateBoardControl from './board-create-new.js';

class BoardOneliner extends React.Component {
    render() {
        const board = this.props.board;
        return (
            <tr>
                <td>
                    {board.title} created by {board.createdByUser.username}. {board.noOfPosts} replies, {board.views} views.
                </td>
            </tr>
        )
    }
}



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
        //this.setState( { boards: fetchApi('Board/?sort=' + this.state.sort)});
        this.setState({boards: this.getBoards()});
    }

    render() {




        return (
            <div>
                <table border="1">
                    <tbody>
                        {this.state.rows}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <CreateBoardControl />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
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
                        <BoardOneliner board={board} key={i.toString()}/>
                    )
                    i++;
                });
                this.setState({rows : oneliners});
            })
            .catch(console.error);
    }
}