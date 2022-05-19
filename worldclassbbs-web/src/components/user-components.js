import React from 'react';

class UserSnippet extends React.Component {
    render() {
        return (

            <table>
                <tr>
                    <td>
                        Logged in as user: <br />
                        <b>{this.props.username}</b>
                    </td>
                </tr>
            </table>

        );
    }
}

export default UserSnippet;