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
            currentItem: null,
            isSender: false,
            currentTruck: {},
            isOpen: false
        }
    }

    async componentDidMount() {
        const transportRequestsRefs = database.ref('transport_requestss');
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
            <div style={{fontSize: "1.1rem"}}>
                {this.state.currentItem && this.state.currentItem.contact &&
                (!this.state.isSender ? 
                    <div className='item-info'>
                        <div className='info-section'>
                            <p><strong>Plecare:</strong> {this.state.currentItem.departure}</p>
                            <p><strong>Destinație:</strong> {this.state.currentItem.arrival}</p>
                        </div>
                        <div className='info-section'>
                            <p><strong>Data plecării:</strong> {this.state.currentItem.departureTime}</p>
                            <p><strong>Data sosirii:</strong> {this.state.currentItem.arrivalTime}</p>
                        </div>
                        <div className='info-section'>
                            <p><strong>Data maximă a plecării:</strong> {this.state.currentItem.maximumDepartureTime}</p>
                            <p><strong>Data maximă sosirii:</strong> {this.state.currentItem.maximumArrivalTime}</p>
                        </div>
                        <div className='info-section'>
                            <p><strong>Tipul de marfă:</strong> {this.state.currentItem.merch}</p>
                            <p><strong>Masa:</strong> {this.state.currentItem.weight}kg</p>
                            <p><strong>Volum:</strong> {this.state.currentItem.volume}m<sup>3</sup></p>
                        </div>
                        <div className='info-section'>
                            <p><strong>Buget disponibil:</strong> {this.state.currentItem.budget} RON</p>
                            <p><strong>Telefon:</strong> {this.state.currentItem.contact.phone}</p>
                            <p><strong>Email:</strong> {this.state.currentItem.contact.email}</p>
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
                            <p><strong>Plecare: </strong>{this.state.currentItem.departure}</p>
                            <p><strong>Destinație: </strong>{this.state.currentItem.arrival}</p>
                        </div>
                        <div className='info-section'>
                            <p><strong>Data plecării:</strong> {this.state.currentItem.departureTime}</p>
                            <p><strong>Data sosirii:</strong> {this.state.currentItem.arrivalTime}</p>
                        </div>
                        <div className='info-section'>
                            <p><strong>Tip camion:</strong> {this.state.currentItem.truck.type}</p>
                            <p><strong>Masa:</strong> {this.state.currentItem.truck.weight}t</p>
                            <p><strong>Volum:</strong> {this.state.currentItem.truck.volume}m<sup>3</sup></p>
                            <p><strong>Lungime:</strong> {this.state.currentItem.truck.length}m</p>
                            <p><strong>Lățime:</strong> {this.state.currentItem.truck.width}m</p>
                            <p><strong>Înălțime:</strong> {this.state.currentItem.truck.height}m</p>
                        </div>
                        <div className='info-section'>
                            <p><strong>Preț/km (până la client):</strong> {this.state.currentItem.clientPrice} RON</p>
                            <p><strong>Preț/km (până la destinație):</strong> {this.state.currentItem.destinationPrice} RON</p>
                            <p><strong>Telefon:</strong> {this.state.currentItem.contact.phone}</p>
                            <p><strong>Email:</strong> {this.state.currentItem.contact.email}</p>
                        </div>
                        <div className='btn-container'>
                            <Button className="btn btn-outline-success join-game-btn" onClick={(e) => this.togglePopupOpen(e)}>
                                <MyPopUp
                                    trigger = {this.state.isOpen}
                                    handleClose = {this.handleClose}
                                    userType = 'expeditor'
                                    requestId={this.state.currentId}/>
                                Rezervă camion
                            </Button>
                        </div>
                    </div>)}
            </div>
        );
    }
}

export default RequestDetails;