import React from 'react';
import {withScriptjs,withGoogleMap,GoogleMap,Marker,InfoBox,InfoWindow} from "react-google-maps";
import { compose, withProps } from "recompose";
import Geocode from '../../geocode'
import '../Map/Map.css';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events : props.events,
            height : props.height || 434
        }
    }

    componentWillMount(){
        this.attachCoordinates(this.state.events)
    }
    componentWillReceiveProps(newProps) {
        console.log("Will receive props..");
        if(!this.eventTheSame(newProps.events, this.state.events))
        {
            console.log("BEFORE EATTO: ", newProps.events)
            this.attachCoordinates(newProps.events)
            console.log("AFTER EATT: ", this.state.events);
        }
    }

    eventTheSame(newEvents, oldEvents){
        if(newEvents.length != oldEvents.length)
            return false;
        newEvents.forEach(newEvent => {
            let oldEvent = oldEvents.find(e => e.id == newEvent.id);
            if(oldEvent === undefined || oldEvent.lat === undefined || oldEvent.lat == 0 || oldEvent.lng === undefined || oldEvent.lng == 0)
                return false;
        })
        return true;
    }

    shouldComponentUpdate(newProps){
        if(this.eventTheSame(newProps.events, this.state.events))
        {
            return false;
        }
        return true;
    }

    attachCoordinates(events){
        let promises = [];
        let result = [];
        events.forEach(e => {
            let eventWithCoords = Object.assign({}, e)
            const address = `${e.country} ${e.city} ${e.address}`;
            promises.push(Geocode.fromAddress(address)
                .then(response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    console.log("LAT, LNG: ", lat, lng);
                    eventWithCoords = Object.assign(e, {lat, lng});
                    console.log("Withcords: ", eventWithCoords);
                    result.push(eventWithCoords);
                },error => {
                    console.error(error);
                    eventWithCoords = Object.assign(e, {lat : null, lng: null});
                    result.push(eventWithCoords);
                })
        )});
        Promise.all(promises).then(() =>
        {
            console.log("RESULT: ", result);
            this.setState({
                events : result
            })
        })
    }
    
    renderMap = () => {
        const MyMapComponent =  compose(
            withProps({
              googleMapURL:
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyCsa_1pNIHdjYwaH0b3S5SwQjH22beM3Y8&v=3.exp&libraries=geometry,drawing,places",
              loadingElement: <div className="loader"/>,
              containerElement: <div className="containerElement" style={{height : this.state.height + 'px'}}/>,
              mapElement: <div className="mapElement" />
            }),
            withScriptjs,
            withGoogleMap
        )(props => {
            console.log(`LAT: ${this.state.events[0].lat}, LNG: ${this.state.events[0].lng }`);
            let center;
            if(!this.state.events[0].lat || !this.state.events[0].lng)
                center = {lat : 0, lng : 0};
            else
                center = { lat: this.state.events[0].lat, lng: this.state.events[0].lng }
            return (<GoogleMap defaultZoom={15} defaultCenter={center}>
              {props.isMarkerShown && (
                this.renderMarkers(props)
              )}
            </GoogleMap>)}
        );
          return <MyMapComponent isMarkerShown />
    }

    renderMarkers = (props) => {
        let markers = [];
        this.state.events.forEach(event => {
            if(event.lat != null && event.lng != null){
                markers.push(   
                    <Marker key={event.id} position={{ lat: event.lat, lng: event.lng }}>
                        <InfoWindow onCloseClick={props.onToggleOpen}>
                            <div>
                            Nazwa: {event.name} <br/>
                            Adres: {event.address}
                            </div>
                        </InfoWindow>
                    </Marker>)
            } 
        })
        return markers;
    }


    getMap() {
        if (this.state.events.length > 0 && this.state.events[0] !== 'undefined') {
            return this.renderMap()
        }
        else {
            return <div className="loader"></div>
        }
    }

    render() {
        return (
               this.getMap()
        )
    }
}

export default Map;