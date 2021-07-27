import React, { useEffect } from 'react';
import { Alert, Fade } from 'react-bootstrap';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import Dashboard from 'components/Dashboard/Dashboard';
import HomeScreen from 'components/HomeScreen/HomeScreen';
import Search from 'components/Search/Search';
import Settings from 'components/Settings/Settings';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import PublicRoute from 'components/PublicRoute/PublicRoute';
import { loginSuccessful } from 'redux/authSlice';
function App() {
    const { message, type } = useSelector((state) => state.messageAlert);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [cookies] = useCookies(['authToken']);
    const handleCookiesOnStartUp = () => {
        if (cookies['authToken'] && !isAuthenticated)
            dispatch(loginSuccessful());
    };
    useEffect(handleCookiesOnStartUp);
    return (
        <div className="wrapper">
            {message !== '' ? (
                <Alert
                    variant={type}
                    className="m-0 border-0"
                    transition={Fade}
                >
                    <p className="m-0">
                        <strong>{message}</strong>
                    </p>
                </Alert>
            ) : (
                ''
            )}

            <BrowserRouter>
                <Switch>
                    <PrivateRoute
                        component={Dashboard}
                        path="/dashboard/:id"
                        exact
                    />
                    <PrivateRoute
                        component={Dashboard}
                        path="/dashboard"
                        exact
                    />
                    <PrivateRoute component={Settings} path="/settings" />
                    <PrivateRoute component={Search} path="/search" />
                    <PublicRoute component={HomeScreen} path="/" />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
