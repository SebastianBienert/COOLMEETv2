import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import { BASE_URL } from '../constants';
import axios from 'axios';
import {userActions} from '../../actions/userActions';
import {Button, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
class ChangeUserPhotoSubPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
             picture : null
        };
    }

    onDrop = (pictureFiles, pictureDataURLs) => {
        console.log("ARGS:", pictureFiles, pictureDataURLs)
		this.setState({
            picture : pictureFiles[0] || null
        });
    }
    
    handleSubmit = () => {
        var formData = new FormData();
        formData.append("fileUpload", this.state.picture);
        axios.post(`${BASE_URL}/Account/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
            .then(resp =>{
                this.props.updatePhoto();
            })
            .catch(err =>{
                console.log(err);
            })
    }
    
    render() {
        return (
            <div>
                <ImageUploader
                        withIcon={true}
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        withPreview={true}
                        label='Maksymalny rozmiar: 5mb, ackeptowalny format: jpg,png'
                        buttonText='Wybierz zdjęcie'
                />
                <Row xs={12} className="text-center mt-4">
                    <Button 
                        disabled={this.state.picture == null} 
                        bsStyle="primary"
                        bsSize="large"
                        type="submit"
                        onClick={this.handleSubmit}>
                            Prześlij
                    </Button>     
                </Row>
                
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return{
        updatePhoto : () => dispatch(userActions.reloadImage())
    }
}

export default connect(null, mapDispatchToProps)(ChangeUserPhotoSubPage);