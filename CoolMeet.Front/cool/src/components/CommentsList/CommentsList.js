import React, { Component } from 'react';
import axios from 'axios';
import {BASE_URL} from '../constants.js'
import Comment from '../Comment/Comment';
import {Button, FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';
class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state ={
            comments: props.comments || [],
            textComment: ""
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.comments !== this.state.comments) {
            this.setState({
                comments : nextProps.comments
            })
        }
    }

    addComment = () => {
        // axios({ method: 'POST', url: `${BASE_URL}/comment`, data: { eventId: this.props.event.id, text: this.state.textComment }, headers: {'Authorization': `Bearer ${this.AuthService.getToken()}`}})
       axios.post(BASE_URL + '/comment', { eventId: this.props.eventId, text: this.state.textComment })
            .then((res) => {
                this.setState(prevState => {
                    return {
                        comments: [...prevState.comments,
                             { 
                                 eventId: this.props.eventId, 
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

    deleteComment = (id) => {
        axios.delete(BASE_URL + `/Comment/${id}`)
        .then(response =>{
            this.setState(prevState => {
                return {
                    comments : prevState.comments.filter(c => c.id !== id),
                    textComment : prevState.textComment
                }
            });
        });
    }

    editComment = (id, text) => {
        axios.patch(BASE_URL + `/Comment/${id}`,{
            Text : text
        })
        .then(response =>{
            this.setState(prevState => {
                let editingComment = prevState.comments.find(c => c.id === id);
                editingComment.text = text;
                return {
                    comments : prevState.comments,
                    textComment : prevState.textComment
                }
            });
        });
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    renderComments = () => {
        if (this.props.comments) {
            console.log("Comments:", this.props.comments)
            return this.state.comments.map((comment) => <Comment 
            editable={comment.user.id === this.props.user.id}
            id={comment.id}
            key={comment.id}
            delete={this.deleteComment}
            edit={this.editComment}
            commentId={comment.id} 
            name={comment.text} user={`${comment.user.firstName || 'anonim'} ${comment.user.lastName || ''}`}
            date={comment.created}/>)
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

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user
    };
  }

export default connect(mapStateToProps)(CommentList);