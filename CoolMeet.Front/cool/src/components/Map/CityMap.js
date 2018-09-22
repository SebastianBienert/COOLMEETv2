import React, { Component } from 'react';
import Map from './Map.js';
import axios from 'axios';
import {Well} from 'react-bootstrap';
import { BASE_URL} from "../constants";
import { AutoComplete } from 'antd';
import { Row, Col, Icon, Input } from 'antd';
import { debounce } from "throttle-debounce";

class CityMap extends Component {

    constructor(props){
        super(props);
        this.state = {
            city : props.city || "" ,
            allCities : [],
            events : []
        }
        this.autocompleteDebounced = debounce(500, this.fetchCities)
    }

    componentWillMount(){
        this.fetchEvents();
        this.fetchCities();
    }

    fetchEvents = () => {
        axios.get(`${BASE_URL}/Event?city=${this.state.city}`)
        .then(response =>{
            this.setState({
                events : response.data
            })
        })
        .catch(error => console.log(error));
    }

    fetchCities = () => {
        axios.get(`${BASE_URL}/Event/cities?query=${this.state.city}`)
        .then(response =>{
            this.setState({
                allCities : response.data
            })
        })
        .catch(error => console.log(error));
    }

    onChange = (value) => {
        this.setState({
            city : value
        }, () => {
            this.autocompleteDebounced();
        })
    }

    render() {
        return (
            <div className="greyForm">
                <Row>
                    <Col span={24}>
                        <AutoComplete
                                style={{ width: `100%` }}
                                dataSource={this.state.allCities}
                                placeholder="Miasto"
                                onChange={this.onChange}
                                value={this.state.city}
                                filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}>
                            <Input suffix={<Icon type="search" onClick={this.fetchEvents} className="certain-category-icon" />} />
                        </AutoComplete>
                    </Col>
                </Row>
                
                <Row>
                    <Col span={24}>
                        {this.state.events.length > 0 ?
                            <Map height={600} events = {this.state.events} ></Map> :
                            <Well>
                                Brak wydarzen zapisanych w tym miescie
                            </Well>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CityMap;