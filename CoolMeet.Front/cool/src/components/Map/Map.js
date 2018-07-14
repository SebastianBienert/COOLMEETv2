import React from 'react';
import {BASE_URL} from "../constants";
import AuthService from '../AuthService';
import {withScriptjs,withGoogleMap,GoogleMap,Marker,InfoWindow} from "react-google-maps";
import { compose, withProps } from "recompose";
import Geocode from '../../geocode'
import '../Map/Map.css';
import PropTypes from "prop-types";

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.AuthService = new AuthService(BASE_URL);        
        this.state = {
        }
        console.log(props)
    }

    componentWillReceiveProps(newProps) {
        Geocode.fromAddress(newProps.address).then(
            response => {
              const { lat, lng } = response.results[0].geometry.location;
              this.setState({
                  lat: lat,
                  lng: lng
              })
              
            },
            error => {
              console.error(error);
            }
          );
    }
    
    renderMap = (latValue, lngValue) => {
        const MyMapComponent =  compose(
            withProps({
              googleMapURL:
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyCsa_1pNIHdjYwaH0b3S5SwQjH22beM3Y8&v=3.exp&libraries=geometry,drawing,places",
              loadingElement: <div className="loadingElement"  />,
              containerElement: <div className="containerElement" />,
              mapElement: <div className="mapElement" />
            }),
            withScriptjs,
            withGoogleMap
        )(props => (
            <GoogleMap defaultZoom={15} defaultCenter={{ lat: latValue, lng: lngValue }}>
              {props.isMarkerShown && (
                <Marker position={{ lat: latValue, lng: lngValue }}>
                    <InfoWindow onCloseClick={props.onToggleOpen}>
                        <div>
                        Nazwa: {this.props.name} <br/>
                        Adres: {this.props.address}
                        </div>
                    </InfoWindow>
                </Marker>
              )}
            </GoogleMap>
        ));
          return <MyMapComponent isMarkerShown />
      }


    getMap() {
        if (this.state.lat) {
            return this.renderMap(this.state.lat, this.state.lng)
        }
        else {
            return <div class="loader"></div>
        }
    }

    render() {
        return (
               this.getMap()
        )
    }
}

Map.propTypes = {
    address: PropTypes.string.isRequired
  };

export default Map;