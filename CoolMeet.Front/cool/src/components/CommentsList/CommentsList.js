import React, { Component } from 'react';
import axios from 'axios';
import {BASE_URL} from '../constants.js'
import Comment from '../Comment/Comment';
import {Button, FormControl} from 'react-bootstrap';
export default class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state ={
            comments: props.event.comments || [],
            textComment: ""
        }
    }

    addComment = () => {
        // axios({ method: 'POST', url: `${BASE_URL}/comment`, data: { eventId: this.props.event.id, text: this.state.textComment }, headers: {'Authorization': `Bearer ${this.AuthService.getToken()}`}})
       axios.post(BASE_URL + '/comment', { eventId: this.props.event.id, text: this.state.textComment })
            .then((res) => {
                this.setState(prevState => {
                    return {
                        comments: [...prevState.comments,
                             { 
                                 eventId: this.props.event.id, 
                                 created: res.data.created,  
                                 user: res.data.user, 
                                 userId: res.data.userId,
                                 text: res.data.text,
                                 id: res.data.id
                                }],
                        textComment: ""         
                    }
                })       
            });
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    renderComments = () => {
        
        if (this.props.event)
            if (this.props.event.comments) {
                return this.state.comments.map((comment) => <Comment key={comment.id} commentId={comment.id} name={comment.text} user={`${comment.user.firstName || 'anonim'} ${comment.user.lastName || ''}`} date={comment.created}/>)
            }
    };

    render() {
        return (
            <div>
                 {this.renderComments()}
                 <div>
                    <FormControl name="textComment" type="text" id="textComment" onChange={this.handleInputChange} value={this.state.textComment}
                        className="form-control col-12" placeholder="Dodaj komentarz" />
                    <Button bsStyle="warning" bsSize="small" onClick={this.addComment}
                        disabled={!this.state.textComment}>Dodaj komentarz</Button>
                </div>
            </div>
        )
    }
}