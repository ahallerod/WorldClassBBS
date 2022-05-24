import React from "react";

class NavBarBoardMain extends React.Component {
    onClickRefreshHandler = () => {
        this.props.refresh();
    }
    render(){
        return (
            <div className="nav-bar">
                <button onClick={this.onClickRefreshHandler}>Refresh</button>
            </div>
        )
    }
}

class NavBarViewBoard extends React.Component {
    onClickBackHandler = () => {
        this.props.viewBoardMain();
    }
    onClickRefreshHandler = () => {
        this.props.refresh();
    }

    render(){
        return (
            <div className="nav-bar">
                <button onClick={this.onClickBackHandler}>Back</button>
                <button onClick={this.onClickRefreshHandler}>Refresh</button>
            </div>
        )
    }
}

export {
    NavBarBoardMain,
    NavBarViewBoard,
}