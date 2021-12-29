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
                                    <p>Destinatie: {this.props.destination}</p>
                                    <p>Plecare: {this.props.departure}</p>
                                    <p>Sosire: {this.props.arrival}</p>
                                </div>
                                {this.props.userType === 'transportator' ?
                                <div class="col-12 col-lg-3">
                                    <p>{this.props.merchandise}</p>
                                </div> :
                                <div class="col-12 col-lg-3">
                                    <p>{this.props.price}</p>
                                </div>}
                            </div>
                        </div>
                        <Link className="btn more-info-btn" to={{pathname: `/item/${this.props.item}`}}> More info </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default DemandAndSupplyItem;