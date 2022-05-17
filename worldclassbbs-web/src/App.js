import React from 'react';
import BBS from './components/bbs.js';
import './App.css';

export const UserContext = React.createContext();

function App() {
    return (

        <div className="App">
            <BBS />
        </div>
    );
}

export default App;