import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './demand-and-supply-item.css';
import logo from './logo192.png';

class DemandAndSupplyItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div class="container item-container">
                <div class="row">
                    <div class="col-12 col-lg-4 left">
                        <img src={logo}></img>
                    </div>
                    <div class="col-12 col-lg-8">
                        <div class="container right-container">
                            <div class="row">
                                <div class="col-12 col-lg-9">
                                    <p>Plecare: {this.props.departure}</p>
                                    <p>Destinatie: {this.props.destination}</p>
                                    <p>Data plecarii: {this.props.departure_time}</p>
                                    <p>Data sosirii: {this.props.arrival_time}</p>
                                </div>
                                {this.props.userType === 'transportator' ?
                                    <div class="col-12 col-lg-3">
                                        <p>{this.props.merchandise}</p>
                                    </div> :
                                    <div class="col-12 col-lg-3">
                                        <p>{this.props.price} RON/km</p>
                                    </div>}
                            </div>
                        </div>
                        <Link className="btn more-info-btn" to={{pathname: `/item/${this.props.id}`}}> More info </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default DemandAndSupplyItem;