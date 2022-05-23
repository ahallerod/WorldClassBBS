import React from "react";

class NavBarBoardMain extends React.Component {
    constructor(){
        super();
    }

    render(){
        return (
            <table>
                <tr>
                    <td>
                        <button>Refresh</button>
                    </td>
                </tr>
            </table>
        )
    }
}

class NavBarViewBoard extends React.Component {
    constructor(){
        super();
    }
    onClickHandler = () => {
        this.props.viewBoardMain();
    }

    render(){
        return (
            <table>
                <tr>
                    <td>
                        <button onClick={this.onClickHandler}>Back</button>
                    </td>
                </tr>
            </table>
        )
    }
}

export {
    NavBarBoardMain,
    NavBarViewBoard,
}