import Main from './Main'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../redux/actions'
import { withRouter } from 'react-router'

function mapStateToProp(state) {
    return {
        categories: state.categories,
        items: state.items
    }
}

function mapDispatchToProp(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

const App = withRouter(connect(mapStateToProp, mapDispatchToProp)(Main))
export default App