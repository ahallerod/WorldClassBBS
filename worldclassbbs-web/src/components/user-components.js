import React from 'react';

class UserSnippet extends React.Component {
    render() {
        return (
            <div className='user-snippet'>
                Logged in as user: <br />
                <b>{this.props.username}</b>
            </div>

        );
    }
}

export default UserSnippet;