import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/pl';
import {Panel, Button, FormControl, Row, Grid} from 'react-bootstrap'
import './Comment.css';
class Comment extends Component{
    constructor(props){
        super(props);
        this.state = {
            editing : false,
            textComment : this.props.name
        }
    }

    renderButtons(){
        return (
                <div className="pull-right">
                    {!this.state.editing && <Button className="btn-outline-secondary" onClick={this.startEditing} >Edytuj</Button>}
                    <Button className="btn-outline-secondary" onClick={this.delete}>Usun</Button>
                </div>
        );
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    renderBody(){
        if(this.state.editing)
        return(       
            <div >
                <FormControl name="textComment" type="text" id="textComment" 
                            onChange={this.handleInputChange} value={this.state.textComment}
                            className="form-control col-12"/>
                <Button bsStyle="warning"
                        bsSize="small" 
                        onClick={this.edit}
                        className="pull-right"
                        disabled={!this.state.textComment}>Zatwierdz</Button>
            </div>
        )

        return(<p>{this.props.name}</p>)
    }

    delete = () =>{
        this.props.delete(this.props.id);
    }

    startEditing = () =>{
        this.setState({
            editing : true
        });
    }

    edit = () =>{
        this.props.edit(this.props.id, this.state.textComment);
        this.setState({
            editing : false
        });
    }
    
    render = () =>{
        const date = moment(this.props.date).format('MMMM Do YYYY, h:mm');
 
        return (
            <Panel>
                <Panel.Heading >
                    <span className="capitalize-text">Autor: {this.props.user}</span> 
                    <span className="pull-right capitalize-text">{date}</span>
                </Panel.Heading>
                <Panel.Body className={this.state.editing ? "editing" : null}>
                        {this.renderBody()}
                        {
                            this.props.editable && 
                                this.renderButtons()
                        }
                </Panel.Body>
            </Panel>
        )
     }
}
export default Comment;