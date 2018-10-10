import React from 'react';
import {Button, Row} from 'react-bootstrap';
const DeleteEventSubPage = ({deleteEvent}) => {
    return (
        <Row xs={12} className="text-center">
            <Button 
                onClick={deleteEvent} 
                bsStyle="danger" 
                bsSize="large"
                className="text-center" >
                    Usuń wydarzenie
            </Button>
        </Row>
    );
};

export default DeleteEventSubPage;