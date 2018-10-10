import React from 'react';
import UserInfo from '../EventInfo/UserInfo';
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap';
const ManageUsersSubPage = ({users,administrators, deleteUser, assignRights}) => {
    return (
        <div>
            <ListGroup>
                {users.map(user => {
                    return(
                        <ListGroupItem key={user.id}>
                            <UserInfo {...user}></UserInfo>
                            <Button 
                                    disabled={administrators.some(a => a.id === user.id)}
                                    value={user.id} bsStyle="primary" 
                                    className="pull-right"
                                    onClick={assignRights}>
                                Nadaj prawa administratora
                            </Button>
                            <Button value={user.id} bsStyle="danger" onClick={deleteUser} className="pull-right">
                                Usuń                           
                            </Button>
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
        </div>
    );
};
export default ManageUsersSubPage;