// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Switch, withRouter, Route, Redirect,
} from 'react-router-dom';
import { Locations } from '../constants';
import history from '../utils/history';
import { requireAuth } from './helpers';
import LoginPage from './login/login.index';
import HomePage from './home/home.index';
import HistoryPage from './history/history.index';
import './styles.scss';

function mapStateToProps() {
    return {
    };
}

type Props = {
};

class Root extends React.Component<Props> {
    static propTypes = {
    };

    static childContextTypes = {
        changeLocation: PropTypes.func.isRequired,
    };

    getChildContext() {
        return {
            changeLocation: this.changeLocation,
        };
    }

    changeLocation = (location:string) => {
        history.changeLocation(location);
    };

    render() {
        return (
            <div className="app">
                <div className="app_content">
                    <Switch>
                        <Route
                            exact
                            path={Locations.HOME}
                            component={requireAuth(HomePage)}
                        />
                        <Route
                            exact
                            component={requireAuth(HistoryPage)}
                            path={Locations.HISTORY}
                        />
                        <Route
                            exact
                            component={LoginPage}
                            path={Locations.LOGIN}
                        />
                        <Redirect to={Locations.HOME} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Root));
