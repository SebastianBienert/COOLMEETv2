import React from 'react';
import {Row, Col, ControlLabel, Grid, Button} from 'react-bootstrap';
import {Tag, Input, Icon} from 'antd';
import ManageTagCloud from './ManageTagCloud';

const ManageTagsSubPage = ({customRenderer, tags, handleInputChange,confirmTagChanges, handleInputConfirm, inputValue, inputVisible, showInput}) => {
    return (
        <Grid>
            <Row>
                <Col xs={2}>
                    <ControlLabel>Kliknij by usunac tag</ControlLabel>
                </Col>
                <Col xs={9}>
                    <ManageTagCloud tags={tags} customRenderer={customRenderer}></ManageTagCloud>
              </Col>
              
            </Row>
            <Row>
                <Col xs={2}>
                    <ControlLabel>Dodaj nowy tag</ControlLabel>
                </Col>
                <Col xs={9}>
                    {inputVisible && (
                        <Input
                            type="text"
                            size="small"
                            style={{ width: 78 }}
                            value={inputValue}
                            onChange={handleInputChange}
                            onPressEnter={handleInputConfirm}
                        />
                    )}
                    {!inputVisible && (
                        <Tag
                            onClick={showInput}
                            style={{ background: '#fff', borderStyle: 'dashed' }}
                        >
                            <Icon type="plus" /> Nowy tag
                        </Tag>
                    )}
                </Col>
            </Row>
            <Row xs={12} className="text-center">
                <Button 
                    onClick={confirmTagChanges} 
                    bsStyle="primary" 
                    bsSize="large"
                    className="text-center" 
                    type="button">
                        Zatwierdz
                </Button>
            </Row>
        </Grid>
    );
};
export default ManageTagsSubPage;