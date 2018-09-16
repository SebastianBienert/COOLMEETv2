
import React from 'react';
import {Row, Checkbox, Form,Button, FormGroup, Grid} from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../constants';
import toastr from 'toastr';
import {userActions} from '../../actions/userActions';
import {connect} from 'react-redux';

class ChangeProfileSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
             allowBrowsingEvents : props.allowBrowsingEvents,
             allowShowingProfile : props.allowShowingProfile
        };
    }

    handleInputChange = (event) => {
        event.persist()
        this.setState({
            [event.target.name]: event.target.checked
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.patch(BASE_URL + '/Account/settings', this.state)
        .then(response =>{
            this.props.updateUserData(this.state);
            toastr.success("Dane zostały zmienione");
        })
        .catch(errors =>{
            toastr.error("Coś poszło nie tak :(");
            console.log(errors)
        })
    }
    
    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <Grid>
                    <Row componentClass={FormGroup}>
                        <Checkbox name="allowBrowsingEvents" checked={this.state.allowBrowsingEvents} onChange={this.handleInputChange}>
                            Zezwalaj na przeglądanie moich wydarzeń
                        </Checkbox>   
                    </Row>
                    <Row componentClass={FormGroup}>
                        <Checkbox name="allowShowingProfile" onChange={this.handleInputChange} checked={this.state.allowShowingProfile}>
                            Zezwalaj na wyswietlanie mojego profilu
                        </Checkbox>   
                    </Row>
                    <Row xs={12} className="text-center mt-4">
                        <Button bsStyle="primary" bsSize="large" type="submit">Zmień ustawienia</Button>
                    </Row>
                </Grid>
            </Form>
        );
    }
}

function mapDispatchToProps(dispatch){
    return {
        updateUserData: (data) => dispatch(userActions.updateData(data))
    };
}
export default connect(null, mapDispatchToProps)(ChangeProfileSettings);
