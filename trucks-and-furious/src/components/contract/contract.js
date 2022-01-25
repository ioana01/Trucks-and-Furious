import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './contract.css';
import { database, auth } from "../../firebase";

class Contract extends Component {
    constructor(props) {
        super(props);

        this.state = {
            side1Id: `${this.props.match.params.clientRequest}`,
            side2Id: `${this.props.match.params.myRequestId}`,
            transportRequestData: {},
            transportOfferData: {},
            truckData: {},
            offerId: ''
        }
    }

    async componentDidMount() {
        const requestsRefs = database.ref('transport_requests');
        let requestData;

        await requestsRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;

                if(childId === this.state.side1Id || childId === this.state.side2Id) {
                    requestData = childData;
                }
            });

            this.setState({ transportRequestData: requestData });
        });

        const offersRefs = database.ref('transport_offers');
        let offersData;
        let offerId;

        await offersRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;

                if(childId === this.state.side1Id || childId === this.state.side2Id) {
                    offersData = childData;
                    offerId = childId;
                }
            });

            this.setState({ transportOfferData: offersData });
            this.setState({ offerId: offerId });
        });

        const trucksRefs = database.ref('trucks');
        let truckData;

        await trucksRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;

                if(childId === this.state.transportOfferData.truckId) {
                    truckData = childData;
                }
            });

            this.setState({ truckData: truckData });
        });

        database.ref('/trucks').child(this.state.transportOfferData.truckId).update({'status': 'unavailable'});

        this.createContract();
    }

    createContract() {
        const contract = {
            carry: {
                email: this.state.transportOfferData.contact.email,
                phone: this.state.transportOfferData.contact.phone
            },
            sender: {
                email: this.state.transportRequestData.contact.email,
                phone: this.state.transportRequestData.contact.phone
            },
            departure: this.state.transportOfferData.departure,
            destination: this.state.transportOfferData.arrival,
            price: this.getTotalPrice(),
            deadline: this.state.transportOfferData.deadline,
            merch: this.state.transportRequestData.merchType,
            truck: this.state.transportOfferData.truckId,
        }

        database.ref('contracts').push(contract);
    }

    distance(lat1, lat2, lon1, lon2) {
        // The math module contains a function
        // named toRadians which converts from
        // degrees to radians.
        lon1 =  lon1 * Math.PI / 180;
        lon2 = lon2 * Math.PI / 180;
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;

        // Haversine formula
        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let a = Math.pow(Math.sin(dlat / 2), 2)
            + Math.cos(lat1) * Math.cos(lat2)
            * Math.pow(Math.sin(dlon / 2),2);
        
        let c = 2 * Math.asin(Math.sqrt(a));

        // Radius of earth in kilometers. Use 3956
        // for miles
        let r = 6371;

        // calculate the result
        return(c * r);
    }

    getTotalPrice() {
        const priceToClient = this.distance(
            this.state.transportRequestData.clientPosition.latitude,
            this.state.truckData.departure.latitude,
            this.state.transportRequestData.clientPosition.longitude,
            this.state.truckData.departure.longitude) * 
            (this.state.transportOfferData.clientPrice + this.state.transportOfferData.destinationPrice);

        const priceToDestination = this.distance(
            this.state.truckData.departure.latitude,
            this.state.truckData.destination.latitude,
            this.state.truckData.departure.longitude,
            this.state.truckData.destination.longitude) * this.state.transportOfferData.destinationPrice;

        const totalPrice = Math.round((priceToClient + priceToDestination) * 100) / 100;

        database.ref('/transport_offers').child(this.state.offerId).update({'totalPrice': totalPrice});

        return totalPrice;
    }

    render() {
        return(
            <>
                {this.state.transportOfferData && this.state.transportRequestData &&
                <div className='item-info'>
                    <h2>Contract</h2>

                    <div className='info-section'>
                        <p>Transportator:</p>
                        {this.state.transportOfferData.contact &&
                        <ul>
                            <li>email: {this.state.transportOfferData.contact.email}</li>
                            <li>phone: {this.state.transportOfferData.contact.phone}</li>
                        </ul>}
                    </div>

                    <div className='info-section'>
                        <p>Expeditor:</p>
                        {this.state.transportRequestData.contact &&
                        <ul>
                            <li>email: {this.state.transportRequestData.contact.email}</li>
                            <li>phone: {this.state.transportRequestData.contact.phone}</li>
                        </ul>}
                    </div>

                    <div className='info-section'>
                        <p>Plecare: {this.state.transportOfferData.departure}</p>
                        <p>Destinatie: {this.state.transportOfferData.arrival}</p>

                        {this.state.transportRequestData && this.state.truckData &&
                        this.state.transportRequestData.clientPosition && this.state.truckData.departure &&
                        <p>Tarif: {this.getTotalPrice()} RON</p>}

                        <p>Termen de plata: {this.state.transportOfferData.deadline}</p>
                    </div>

                    <div className='info-section'>
                        <p>Marfa: {this.state.transportRequestData.merchType}</p>
                        <p>Camion: </p>
                        <ul>
                            <li>type: {this.state.truckData.type}</li>
                            <li>height: {this.state.truckData.height} m</li>
                            <li>length: {this.state.truckData.length} m</li>
                            <li>width: {this.state.truckData.width} m</li>
                            <li>mass: {this.state.truckData.mass} kg</li>
                            <li>volume: {this.state.truckData.volume} m<sup>3</sup></li>
                        </ul>
                    </div>

                    <p>Obs: Acest contract reprezintă angajamentul ferm între cele doua parti</p>
                </div>}
            </>
        );
    }
}

export default Contract;