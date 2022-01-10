import React, {Component} from 'react';
// import DateTimePicker from 'react-datetime-picker';

export default class DemandAndSupplyAddForm extends Component   {

    constructor(props) {
        super(props);
        
        this.state = {
            arrival: '',
            arrivalTime: null,
            client_price: 2,
            budget: 0,
            email: '',
            phone: '',
            departure: '',
            departureTime: null,
            destination_proce: 0,
            height: 0,
            length: 0,
            mass: 0,
            truck_type: '',
            maximum_arrival_time: null,
            maximum_departure_time: null,
            merch_type: '',
            volume: 0,
            width: 0,
            currentUserType: 'expeditor'
        }

        this.handleArrival = this.handleArrival.bind(this);
        this.handleArrivalTime = this.handleArrivalTime.bind(this);
        this.handleClientPrice = this.handleClientPrice.bind(this);
        this.handleBudget = this.handleBudget.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleDeparture = this.handleDeparture.bind(this);
        this.handleDepartureTime = this.handleDepartureTime.bind(this);
        this.handleDestinationPrice = this.handleDestinationPrice.bind(this);
        this.handleHeight = this.handleHeight.bind(this);
        this.handleLength = this.handleLength.bind(this);
        this.handleMass = this.handleMass.bind(this);
        this.handleMaximumArrivalTime = this.handleMaximumArrivalTime.bind(this);
        this.handleMaximumDepartureTime = this.handleMaximumDepartureTime.bind(this);
        this.handleMerchType = this.handleMerchType.bind(this);
        this.handleVolume = this.handleVolume.bind(this);
        this.handleWidth = this.handleWidth.bind(this);
    }

    handleArrival(evnet) {
    }

    handleArrivalTime(event) {
    }

    handleClientPrice(event) {
    }

    handleBudget(event) {
    }

    handleEmail(event) {
    }

    handlePhone(event) {
    }

    handleDeparture(event) {
    }

    handleDepartureTime(event) {
    }

    handleDestinationPrice(event) {
    }

    handleHeight(event) {
    }

    handleLength(event) {
    }

    handleMass(event) {
    }

    handleMaximumArrivalTime(event) {
    }

    handleMaximumDepartureTime(event) {
    }

    handleMerchType(event) {
    }

    handleVolume(event) {
    }

    render() {
        return(
            <div className='row p-2 justify-content-md-center'>

            </div>
        );
    }
}
