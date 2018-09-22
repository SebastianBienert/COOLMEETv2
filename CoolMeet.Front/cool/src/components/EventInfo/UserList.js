import React from 'react';
import UserInfo from './UserInfo';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

const UserList = ({users}) => {
    return (
        <div>
            <div id="usersHeading">Uczestnicy:</div>
            <ListGroup>
                {users.map(user => {
                    return(
                        <ListGroupItem key={user.id} >
                            <UserInfo key={user.id} {...user}></UserInfo>
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
        </div>
    );
};

export default UserList;