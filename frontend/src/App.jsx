import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './hocs/Layout';

import Home from './containers/Home';
import SignUp from './containers/Signup';
import Login from './containers/Login';
import Profile from './containers/Profile';
import Movie from './containers/Movies';
import Error from './components/Error';
import {Provider} from 'react-redux';
import store from './store';


const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/profile" component={Profile}/>
                    <Route exact path="/movie" component={Movie}/>
                    <Route exact path="*" component={Error}/>
                </Switch>
            </Layout>
        </Router>
    </Provider>
)

export default App;