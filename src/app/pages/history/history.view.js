// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Locations } from '../../constants';
import { Button } from '../../components';
import './history.styles.scss';

type Props = {
    name: string,
    fetchHistory: () => *,
    logout: () => *,
    history: Array<Object>,
};


export default class HistoryView extends Component<Props> {
    static contextTypes = {
        changeLocation: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { fetchHistory } = this.props;
        fetchHistory();
    }

    doLogout = () => {
        const { logout } = this.props;
        const { changeLocation } = this.context;
        logout();
        changeLocation(Locations.LOGIN);
    };

    goHome = () => {
        const { changeLocation } = this.context;
        changeLocation(Locations.HOME);
    };

    render() {
        const { name, history } = this.props;
        return (
            <div className="history">
                <h1>
Your are:
                    {name}
                </h1>
                <div className="history_items">
                    <table cellSpacing="0">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Avg. Speed</td>
                                <td> Words per minute </td>
                                <td> Completion </td>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((result: Object, index: number) => (
                                <tr key={result.name + index}>
                                    <td>{result.name}</td>
                                    <td>
                                        {result.avgSpeed}
                                        {' '}
wpm
                                    </td>
                                    <td>
                                        {result.endSpeed}
                                        {' '}
wpm
                                    </td>
                                    <td>
                                        {result.complete}
                                        {' '}
%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="history_actions">
                    <Button onClick={this.goHome}>
                        START
                    </Button>
                    <Button onClick={this.doLogout}>
                        Logout
                    </Button>
                </div>
            </div>
        );
    }
}
