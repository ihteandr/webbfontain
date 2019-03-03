import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchHistory, logout } from '../../store/actions';
import View from './history.view';

function mapStateToProps(state) {
    return {
        name: state.auth.name,
        history: state.base.history,
    };
}

function bindActionsToProps(dispatch) {
    return {
        fetchHistory: bindActionCreators(fetchHistory, dispatch),
        logout: bindActionCreators(logout, dispatch),
    };
}

export default connect(mapStateToProps, bindActionsToProps)(View);
