import React from 'react';

const Greetings = (props) =>{
    return(
        <h4 className="text-center" style={{ textTransform: 'capitalize' }} > Witaj {props.user.firstName} {props.user.lastName}!</h4>
    );
}

export default Greetings;