import React, {Component} from 'react';
import './demand-and-supply-list.css';
import DemandAndSupplyItem from '../demand-and-supply-item/demand-and-supply-item';
// import AddIcon from '@material-ui/icons/Add';
import { database, auth } from "../../firebase";

class DemandAndSupplyList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listType: '',
            currentUserType: '',
            transportRequestsList: [],
            transportOffersList: []
        }

        this.addCerere = this.addCerere.bind(this);
        this.redirectToAddForm = this.redirectToAddForm.bind(this);
    }

    async componentDidMount() {
        const usersRefs = database.ref('users');
        const email = auth.currentUser.email;
        const transportRequestsRefs = database.ref('transport_requests');
        const transportOffersRefs = database.ref('transport_offers');
        let transportRequestsList = [];
        let transportOffersList = [];

        await usersRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();

                if(childData.email === email) {
                    localStorage.setItem('user', JSON.stringify(childData));
                    this.setState({ currentUserType: childData.userType });
                }
            });

            const message = this.state.currentUserType === 'transportator' ? 'Lista de cereri' : 'Lista de camioane';
            this.setState({ listType: message });
        });

        await transportRequestsRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;

                transportRequestsList.push(
                    {
                        data: childData,
                        id: childId
                    }
                )
            });

            this.setState({ transportRequestsList: transportRequestsList });
        });

        await transportOffersRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;

                transportOffersList.push(
                    {
                        data: childData,
                        id: childId
                    }
                )
            });

            this.setState({ transportOffersList: transportOffersList });
        });

    }

    addCerere() {
        // const userData = {
        //     departure: 'Braila',
        //     departure_time: '2 feb 2022, 10:00',
        //     maximum_departure_time: '2 feb 2022, 17:00',
        //     arrival: 'Oradea',
        //     arrival_time: '20 feb 2022, 10:00',
        //     maximum_arrival_time: '20 feb 2022, 17:00',
        //     merch_type: 'mobila',
        //     mass: 300,
        //     volume: 200,
        //     budget: 3000,
        //     contact: {
        //         phone: '0700000000',
        //         email: 'test@gmail.com'
        //     }
        // }
        const userData = {
            departure: 'Adjud',
            departure_time: '15 ian 2022, 10:00',
            arrival: 'Baia Mare',
            arrival_time: '25 ian 2022, 10:00',
            truck_type: 'Iveco',
            mass: 12,
            volume: 2000,
            length: 8,
            width: 4,
            height: 3,
            client_price: 2,
            destination_price: 3.5,
            contact: {
                phone: '0700000000',
                email: 'test@gmail.com'
            }
        }

        database.ref('transport_offers').push(userData);
    }

    redirectToAddForm() {
        window.location.href = '/demand-supply-add-form';
    }

    render() {
        return(
            <>
                <div className='list-body'>
                    <div className="d-flex flex-row align-items-baseline">
                        <span className='list-type'>{this.state.listType}</span>
                        {/* <AddIcon className='ml-2' onClick={this.redirectToAddForm}/> */}
                    </div>
                    {/* <button onClick={this.addCerere}>Click me!</button> */}
                    {this.state.currentUserType === 'transportator' &&
                    this.state.transportRequestsList.map((element) => {
                        return <DemandAndSupplyItem 
                                    departure={element.data.departure}
                                    destination={element.data.arrival} 
                                    departure_time={element.data.departure_time} 
                                    arrival_time={element.data.arrival_time}
                                    merchandise={element.data.merch_type}
                                    userType={this.state.currentUserType}
                                    id={element.id.replace('-','')}/>
                    })}
                    {this.state.currentUserType === 'expeditor' &&
                    this.state.transportOffersList.map((element) => {
                        return <DemandAndSupplyItem 
                                    departure={element.data.departure}
                                    destination={element.data.arrival} 
                                    departure_time={element.data.departure_time} 
                                    arrival_time={element.data.arrival_time}
                                    price={element.data.destination_price}
                                    userType={this.state.currentUserType}
                                    id={element.id.replace('-','')}/>
                    })}
                    {
                        this.state.currentUserType === 'admin' ? window.location.href='/admin' : null
                    }
                </div>
            </>
        );
    }
}

export default DemandAndSupplyList;