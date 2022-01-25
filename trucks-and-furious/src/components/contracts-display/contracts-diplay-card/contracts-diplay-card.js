import React, {Component} from 'react';
import './contracts-displayp-card.css';

class ContractCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='contract-card'>
                <p>Transportator: {this.props.contract.carry.email}</p>
                <p>Expeditor: {this.props.contract.sender.email}</p>
                <p>De la: {this.props.contract.departure}</p>
                <p>Pana la: {this.props.contract.destination}</p>
                <p>Pret: {this.props.contract.price} RON</p>
            </div>
        )
    }
}

export default ContractCard;