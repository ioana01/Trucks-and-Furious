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
            truckData: {}
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

        await offersRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;

                if(childId === this.state.side1Id || childId === this.state.side2Id) {
                    offersData = childData;
                }
            });

            this.setState({ transportOfferData: offersData });
        });

        const trucksRefs = database.ref('trucks');
        let truckData;

        await trucksRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;

                if(childId === this.state.transportOfferData.truck_id) {
                    truckData = childData;
                }
            });

            this.setState({ truckData: truckData });
        });

        database.ref('/trucks').child(this.state.transportOfferData.truck_id).update({'status': 'unavailable'});
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
                        <p>Tarif/km pana la client: {this.state.transportOfferData.client_price} RON</p>
                        <p>Tarif/km pana la destinatie: {this.state.transportOfferData.destination_price} RON</p>
                        <p>Termen de plata: {this.state.transportOfferData.deadline}</p>
                    </div>

                    <div className='info-section'>
                        <p>Marfa: {this.state.transportRequestData.merch_type}</p>
                        <p>Camion: </p>
                        <ul>
                            <li>type: {this.state.truckData.truck_type}</li>
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