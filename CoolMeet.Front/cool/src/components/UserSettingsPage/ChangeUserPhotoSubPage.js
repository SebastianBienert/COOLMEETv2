import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';

class ChangeUserPhotoSubPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
             pictures: [] 
        };
    }

    onDrop = (pictureFiles, pictureDataURLs) => {
		this.setState({
            pictures: this.state.pictures.concat(pictureFiles),
        });
	}
    
    render() {
        return (
            <ImageUploader
                	withIcon={true}
                	buttonText='Choose images'
                	onChange={this.onDrop}
                	imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview={true}
            />
        );
    }
}

export default ChangeUserPhotoSubPage;