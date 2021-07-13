import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeScreen from './components/HomeScreen/HomeScreen';
import Search from './components/Search/Search';
function App() {
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Switch>
                    <Route path="/dashboard">
                        <HomeScreen isLoggedIn={true} />
                    </Route>
                    <Route path="/settings">
                        <h1>settings</h1>
                    </Route>
                    <Route path="/search">
                        <Search />
                    </Route>
                    <Route path="/">
                        <HomeScreen isLoggedIn={false} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
