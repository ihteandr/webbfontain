import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWords, saveResult, logout } from '../../store/actions';
import View from './home.view';

function mapStateToProps(state) {
    return {
        name: state.auth.name,
        words: state.base.words,
        isLoading: state.base.isLoading,
    };
}

function bindActionsToProps(dispatch) {
    return {
        fetchWords: bindActionCreators(fetchWords, dispatch),
        saveResult: bindActionCreators(saveResult, dispatch),
        logout: bindActionCreators(logout, dispatch),
    };
}

export default connect(mapStateToProps, bindActionsToProps)(View);
