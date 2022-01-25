import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './request-details.css';
import { database } from "../../firebase";
import MyPopUp from '../popup/popup';
import { Card, Form, Button, Alert } from "react-bootstrap";
class RequestDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentId: `-${this.props.match.params.id}`,
            currentItem: {},
            isSender: false,
            currentTruck: {},
            isOpen: false
        }
    }

    async componentDidMount() {
        const transportRequestsRefs = database.ref('transport_requests');
        const transportOffersRefs = database.ref('transport_offers');
        const trucksRefs = database.ref('trucks');

        await transportRequestsRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;

                if(childId === this.state.currentId) {
                    this.setState({ currentItem: childData })
                }
            });
        });

        await transportOffersRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;

                if(childId === this.state.currentId) {
                    this.setState({ currentItem: childData })
                    this.setState({ isSender: true })
                }
            });
        });

        await trucksRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;

                if(childId === this.state.currentItem.truckId) {
                    this.setState({ currentTruck: childData })
                }
            });
        });
    }

    togglePopupOpen = (e) => {
        if (this.state.isOpen == false) {
            this.setState({ isOpen: true });
        }
    }

    handleClose = (e) => {
        this.setState({ isOpen: false });
    }

    render() {
        return(
            <>
                {this.state.currentItem && this.state.currentItem.contact &&
                (!this.state.isSender ? 
                    <div className='item-info'>
                        <div className='info-section'>
                            <p>Plecare: {this.state.currentItem.departure}</p>
                            <p>Destinatie: {this.state.currentItem.arrival}</p>
                        </div>
                        <div className='info-section'>
                            <p>Data plecarii: {this.state.currentItem.departureTime}</p>
                            <p>Data sosirii: {this.state.currentItem.arrivalTime}</p>
                        </div>
                        <div className='info-section'>
                            <p>Data maxima a plecarii: {this.state.currentItem.maximumDepartureTime}</p>
                            <p>Data maxima a sosirii: {this.state.currentItem.maximumArrivalTime}</p>
                        </div>
                        <div className='info-section'>
                            <p>Tipul de marfa: {this.state.currentItem.merchType}</p>
                            <p>Masa: {this.state.currentItem.mass}kg</p>
                            <p>Volum: {this.state.currentItem.volume}m<sup>3</sup></p>
                        </div>
                        <div className='info-section'>
                            <p>Buget disponibil: {this.state.currentItem.budget} RON</p>
                            <p>Telefon: {this.state.currentItem.contact.phone}</p>
                            <p>Email: {this.state.currentItem.contact.email}</p>
                        </div>
                        <div className='btn-container'>
                            <Button className="btn btn-outline-success join-game-btn" onClick={(e) => this.togglePopupOpen(e)}>
                                <MyPopUp
                                    trigger = {this.state.isOpen}
                                    handleClose = {this.handleClose}
                                    userType = 'transportator'
                                    requestId={this.state.currentId}/>
                                Preia marfa
                            </Button>
                        </div>
                    </div> 
                :
                    <div className='item-info'>
                        <div className='info-section'>
                            <p>Plecare: {this.state.currentItem.departure}</p>
                            <p>Destinatie: {this.state.currentItem.arrival}</p>
                        </div>
                        <div className='info-section'>
                            <p>Data plecarii: {this.state.currentItem.departureTime}</p>
                            <p>Data sosirii: {this.state.currentItem.arrivalTime}</p>
                        </div>
                        <div className='info-section'>
                            <p>Tip camion: {this.state.currentTruck.type}</p>
                            <p>Masa: {this.state.currentTruck.mass}t</p>
                            <p>Volum: {this.state.currentTruck.volume}m<sup>3</sup></p>
                            <p>Lungime: {this.state.currentTruck.length}m</p>
                            <p>Latime: {this.state.currentTruck.width}m</p>
                            <p>Inaltime: {this.state.currentTruck.height}m</p>
                        </div>
                        <div className='info-section'>
                            <p>Pret/km (pana la client): {this.state.currentItem.clientPrice} RON</p>
                            <p>Pret/km (pana la destinatie): {this.state.currentItem.destinationPrice} RON</p>
                            <p>Telefon: {this.state.currentItem.contact.phone}</p>
                            <p>Email: {this.state.currentItem.contact.email}</p>
                        </div>
                        <div className='btn-container'>
                            <Button className="btn btn-outline-success join-game-btn" onClick={(e) => this.togglePopupOpen(e)}>
                                <MyPopUp
                                    trigger = {this.state.isOpen}
                                    handleClose = {this.handleClose}
                                    userType = 'expeditor'
                                    requestId={this.state.currentId}/>
                                Rezerva Camion
                            </Button>
                        </div>
                    </div>)}
            </>
        );
    }
}

export default RequestDetails;