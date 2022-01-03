import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './request-details.css';
import { database } from "../../firebase";

class RequestDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentId: `-${this.props.match.params.id}`,
            currentItem: {},
            isSender: false
        }
    }

    async componentDidMount() {
        const transportRequestsRefs = database.ref('transport_requests');
        const transportOffersRefs = database.ref('transport_offers');

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
    }

    render() {
        console.log(this.state.currentItem.contact);
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
                            <p>Data plecarii: {this.state.currentItem.departure_time}</p>
                            <p>Data sosirii: {this.state.currentItem.arrival_time}</p>
                        </div>
                        (!this.state.isSender ?
                        <div className='info-section'>
                            <p>Data maxima a plecarii: {this.state.currentItem.maximum_departure_time}</p>
                            <p>Data maxima a sosirii: {this.state.currentItem.maximum_arrival_time}</p>
                        </div>
                        <div className='info-section'>
                            <p>Tipul de marfa: {this.state.currentItem.merch_type}</p>
                            <p>Masa: {this.state.currentItem.mass}kg</p>
                            <p>Volum: {this.state.currentItem.volume}m<sup>3</sup></p>
                        </div>
                        <div className='info-section'>
                            <p>Buget disponibil: {this.state.currentItem.budget} RON</p>
                            <p>Telefon: {this.state.currentItem.contact.phone}</p>
                            <p>Email: {this.state.currentItem.contact.email}</p>
                        </div>
                        <div className='btn-container'>
                            <Link className="btn close-deal-btn" to={{pathname: `/item/${this.props.id}`}}> Preia marfa </Link>
                        </div>
                    </div> 
                :
                    <div className='item-info'>
                        <div className='info-section'>
                            <p>Plecare: {this.state.currentItem.departure}</p>
                            <p>Destinatie: {this.state.currentItem.arrival}</p>
                        </div>
                        <div className='info-section'>
                            <p>Data plecarii: {this.state.currentItem.departure_time}</p>
                            <p>Data sosirii: {this.state.currentItem.arrival_time}</p>
                        </div>
                        <div className='info-section'>
                            <p>Tip camion: {this.state.currentItem.truck_type}</p>
                            <p>Masa: {this.state.currentItem.mass}t</p>
                            <p>Volum: {this.state.currentItem.volume}m<sup>3</sup></p>
                            <p>Lungime: {this.state.currentItem.length}m</p>
                            <p>Latime: {this.state.currentItem.width}m</p>
                            <p>Inaltime: {this.state.currentItem.height}m</p>
                        </div>
                        <div className='info-section'>
                            <p>Pret/km (pana la client): {this.state.currentItem.client_price} RON</p>
                            <p>Pret/km (pana la destinatie): {this.state.currentItem.destination_price} RON</p>
                            <p>Telefon: {this.state.currentItem.contact.phone}</p>
                            <p>Email: {this.state.currentItem.contact.email}</p>
                        </div>
                        <div className='btn-container'>
                            <Link className="btn close-deal-btn" to={{pathname: ``}}> Rezerva camion </Link>
                        </div>
                    </div>)}
            </>
        );
    }
}

export default RequestDetails;