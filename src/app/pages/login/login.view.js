// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from '../../components';
import { Locations } from '../../constants';
import './login.styles.scss';

type Props = {
    login: (string) => *,
};

type State = {
    canEnter: boolean,
    name: string
};

export default class LoginView extends Component<Props, State> {
    static contextTypes = {
        changeLocation: PropTypes.func.isRequired,
    };

    state = {
        canEnter: false,
        name: '',
    };

    tryLogin = () => {
        const { name } = this.state;
        this.props.login(name);
        this.context.changeLocation(Locations.HOME);
    };

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return this.state.canEnter !== nextState.canEnter;
    }

    handleEnterName = (e: { target: any }) => {
        this.setState({
            canEnter: !!e.target.value,
            name: e.target.value,
        });
    };

    render() {
        const { canEnter } = this.state;
        return (
            <div className="login">
                <div className="login_form">
                    <h3>Enter your name</h3>
                    <div>
                        <Input onChange={this.handleEnterName} />
                    </div>
                    <div className="login_form_actions">
                        <Button disabled={!canEnter} onClick={this.tryLogin}>Login</Button>
                    </div>
                </div>
            </div>
        );
    }
}
