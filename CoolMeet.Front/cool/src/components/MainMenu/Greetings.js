import React from 'react';
import {connect} from 'react-redux';

class Greetings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName : props.user.firstName,
            lastName : props.user.lastName
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.state.firstName !== nextProps.user.firstName)
            this.setState({
                firstName : nextProps.user.firstName
            })
        if(this.state.lastName !== nextProps.user.lastName)
            this.setState({
                lastName : nextProps.user.lastName
            })
    }

    render() {
        const {firstName, lastName} = this.state
        return(
            <h4 className="text-center" style={{ textTransform: 'capitalize' }} > Witaj {firstName} {lastName}!</h4>
        );
    };
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user
    };
  }
export default connect(mapStateToProps)(Greetings);