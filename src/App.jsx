import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header/Header.jsx';
import ActivityFeed from "./views/ActivityFeed/ActivityFeed.jsx";
import ActivityDetails from "./views/ActivityDetails/ActivityDetails.jsx";

const App = () => {
    return (
        <Router>
            <div id='app'> {/* Added id to match the CSS selector */}
                <div className='container'>
                    <Header/>
                    <div className="container-view">
                        <Routes>
                            <Route path="/" element={<ActivityFeed />}/>
                            <Route path="/:id" element={<ActivityDetails />}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
