import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../store/actions';
import View from './login.view';

function mapStateToProps() {
    return {};
}

function bindActionsToProps(dispatch) {
    return {
        login: bindActionCreators(login, dispatch),
    };
}

export default connect(mapStateToProps, bindActionsToProps)(View);
