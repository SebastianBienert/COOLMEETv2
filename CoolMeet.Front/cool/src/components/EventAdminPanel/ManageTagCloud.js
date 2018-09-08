import React from 'react';
import PropTypes from 'prop-types';
import { TagCloud } from "react-tagcloud";

class ManageTagCloud extends React.Component {
    constructor(props){
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.tags.length == nextProps.tags.length)
            return false;
        return true;
    } 

    render(){
        const tagData = this.props.tags.map(tag => {
            return{
                 key : tag.id,
                 value : `#${tag.name}`,
                 count : 10
            } 
         });
         const colorOptions = {
             luminosity: 'light',
             hue: 'blue'
        };
        return (
            <div>
                <TagCloud minSize={12}
                            maxSize={35}
                            tags={tagData}
                            colorOptions={colorOptions}
                            renderer={this.props.customRenderer} />
            </div>
        );
    }
};
export default ManageTagCloud;