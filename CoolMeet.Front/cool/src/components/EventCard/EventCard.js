import React from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import {BASE_URL} from "../constants";
import './EventCard.css';
import withAuth from '../withAuth'
import {Panel, Button} from 'react-bootstrap';

class EventCard extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            users: props.event.users || [],
            userAlreadyJoined: this.userAlreadyJoinedEvent(),
            statusUnavailable: props.event.status.description === "Niedostępny"
        }
    }
    
    checkStatus = () => {
        if (this.props.event.status.id === 1) {
            return  <span className="pull-right active">(Aktywny)</span>;
        }
        return <span className="pull-right inactive">(Nieaktywny)</span>
    }


    componentWillReceiveProps(newState) {
        this.setState( prevState => ({
            users: newState.event.users || [],
        }))
    }


    userAlreadyJoinedEvent = () => {
        const allIds = this.props.event.users.map(user => user.id);
        return allIds.includes(this.props.user.id)
    }

    leaveUserFromEvent = () =>{
     axios.post(BASE_URL + `/Event/leave/${this.props.event.id}`,null)
        .then(response => {
            console.info(`Leave from ${this.props.event.name}`);
            if(this.props.onDelete) {
                this.props.onDelete();
            } else {
                this.setState({
                    userAlreadyJoined: false
                })
            }  
        })
    }

    joinToEvent = () => {
        axios({ method: 'POST', url: `${BASE_URL}/Event/join/${this.props.event.id}`})
        .then(response =>{
            console.info(`Join to ${this.props.event.name}`);
            this.setState( prevState =>{
                return{
                    users: [...prevState.users, response.data],
                }
            })
            this.setState({
                userAlreadyJoined: true
            })
        })
    }


    getButtonJoinOrLeave = () => {
        if (this.state.userAlreadyJoined) {
            return(        
            <Button type="button" bsStyle="danger" className="btnStyle" onClick={this.leaveUserFromEvent} >
                Wyjdz
                <span className="glyphicon glyphicon-remove"></span>                
            </Button>
            )
        }
        else if(this.state.statusUnavailable) {
            return (<Button type="button" disabled bsStyle="success" className="btnStyle" onClick={this.joinToEvent}>Dołącz</Button>)
        }
        return <Button type="button" disabled={this.state.userAlreadyJoined || this.state.statusUnavailable} bsStyle="success" className="btnStyle" onClick={this.joinToEvent}>Dołącz</Button>
    }

    getTitle = () => {
        console.log("tutaj")
        console.log("ADMIN: ", this.props.event.administrator)
        if(this.props.event.administrator && this.props.event.administrator.id === this.props.user.id)
        {
            return(
                <Link to={`/eventAdministrationPanel/${this.props.event.id}`} >  
                {this.props.event.name}
                   <span className="adminPanel badge badge-secondary">Admin</span>
                </Link>
                )
            
        }
        else{
            return this.props.event.name

        }
    }

    render(){
    return (

		<Panel>
			<Panel.Body>
				<span className="card-meta pull-right">{new Date(this.props.event.startDate).toDateString("llll")} - {new Date(this.props.event.endDate).toDateString()}</span>
				<h4 className="title">
                    {this.getTitle()}
                    {this.checkStatus()}     
				</h4>
                <p className="summary pull-left">
                    {this.props.event.country}, {this.props.event.city} {this.props.event.address}
                </p>

                <p className="summary pull-right"> 
                    {this.props.loggedIn && 
                    <Link to={`/eventInfo/${this.props.event.id}`} >  
                        <Button type="button" bsStyle="info">
                            Info
                            <span className="glyphicon glyphicon-info-sign"></span>
                        </Button>
                    </Link>}
                    {this.getButtonJoinOrLeave()} 
                    
                </p>
			</Panel.Body>  
		</Panel>
      );
    }
}

export default withAuth(EventCard);