import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';

import HomeScreen from './components/HomeScreen/HomeScreen';
import Search from './components/Search/Search';
import Settings from './components/Settings/Settings';
function App() {
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Switch>
                    <Route path="/dashboard/:id">
                        <Dashboard />
                    </Route>
                    <Route path="/dashboard/" exact>
                        <Dashboard />
                    </Route>
                    <Route path="/dashboard/:id" exact>
                        <Dashboard />
                    </Route>
                    <Route path="/settings">
                        <Settings />
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
