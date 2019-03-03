import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Locations } from '../../../constants';

export function requireAuth(PageComponent) {
    function mapStateToProps(state) {
        return {
            isLoggedIn: state.auth.isLoggedIn,
        };
    }

    class RequireAuth extends Component {
        static contextTypes = {
            changeLocation: PropTypes.func.isRequired,
        };

        componentDidMount() {
            this.checkAuth();
        }

        checkAuth() {
            const { isLoggedIn } = this.props;
            if (!isLoggedIn) {
                this.context.changeLocation(Locations.LOGIN);
            }
        }

        render() {
            return <PageComponent {...this.props} />;
        }
    }
    return connect(mapStateToProps)(RequireAuth);
}
