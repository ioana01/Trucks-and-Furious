import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import './contract.css';
import { database, auth } from "../../firebase";
import {defaultLocations} from "../../default_locations";

export default function Contract(props) {

    const [sideOneId, setSideOneId] = useState(`${props.match.params.clientRequest}`);
    const [sideTwoId, setSideTwoId] = useState(`${props.match.params.myRequestId}`);
    const [transportRequestData, setTransportRequestData] = useState({id: null, data: null});
    const [transportOfferData, setTransportOfferData] = useState({id: null, data: null});
    const [truck, setTruck] = useState();
    const [contractNonce, setContractNonce] = useState('');

    useEffect(() => {
        let transportRequestData;
        let transportRequestId;
        const transportRequestsRefs = database.ref('transport_requestss');

        const fetchTransportRequestData = async () => {
            await transportRequestsRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const childId = childSnapshot.key;
    
                    if(childId === sideOneId || childId === sideTwoId) {
                        transportRequestData = childData;
                        transportRequestId = childId;
                    }
                });
                
                //database.ref('/transport_requests').child(transportRequestId).update({'status': 'unavailable'});
                setTransportRequestData({id: transportRequestId, data: transportRequestData});
            });
        }

        fetchTransportRequestData();
    }, []);

    useEffect(() => {
        let transportOfferData;
        let transportOfferId;
        const transportOfferRefs = database.ref('transport_offers');

        const fetchTransportOffersData = async () => {
            await transportOfferRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const childId = childSnapshot.key;
    
                    if(childId === sideOneId || childId === sideTwoId) {
                        transportOfferData = childData;
                        transportOfferId = childId;
                    }
                });
                
                //database.ref('/trucks').child(transportOfferData.truckId).update({'status': 'unavailable'});
                //database.ref('/transport_offers').child(transportOfferId).update({'status': 'unavailable'});
                setTransportOfferData({id: transportOfferId, data: transportOfferData});
            });
        }

        fetchTransportOffersData();
    }, []);

    useEffect(() => {
        if (!transportOfferData.data) 
            return;

        let truckData;
        const truckRefs = database.ref('trucks');

        const fetchTruckData = async () => {
            await truckRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const childId = childSnapshot.key;
    
                    if(childId === transportOfferData.data.truckId) {
                        truckData = childData;
                    }
                });
                
                setTruck(truckData);
            });
        }

        fetchTruckData();
    }, [transportOfferData]);

    useEffect(() => {

        if (!transportOfferData.data || !transportRequestData.data)
            return;

        createContract();
    }, [transportOfferData, transportRequestData])


    const createContract = () => {

        const nonce = (Math.trunc(Math.random() % 1000000 * 100000000)).toString();

        const contract = {
            carry: {
                email: transportOfferData.data.contact.email,
                phone: transportOfferData.data.contact.phone
            },
            sender: {
                email: transportRequestData.data.contact.email,
                phone: transportRequestData.data.contact.phone
            },
            transportRequestId: transportRequestData.id,
            transportOfferId: transportOfferData.id,
            departure: transportOfferData.data.departure,
            destination: transportOfferData.data.arrival,
            clientPosition: transportRequestData.data.departure,
            totalPrice: getTotalPrice(),
            deadline: transportRequestData.data.maximumArrivalTime,
            merch: transportRequestData.data.merch,
            truck: transportOfferData.data.truck.id,
            nonce: nonce
        }

        database.ref('contracts').push(contract);
        setContractNonce(nonce);
    }

    const distance = (lat1, lat2, lon1, lon2) => {
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

    const getTotalPrice = () => {
        // const priceToClient = distance(
        //     transportRequestData.data.clientPosition.latitude,
        //     this.state.truckData.departure.latitude,
        //     this.state.transportRequestData.clientPosition.longitude,
        //     this.state.truckData.departure.longitude) * 
        //     (this.state.transportOfferData.clientPrice + this.state.transportOfferData.destinationPrice);

        // const priceToDestination = distance(
        //     this.state.truckData.departure.latitude,
        //     this.state.truckData.destination.latitude,
        //     this.state.truckData.departure.longitude,
        //     this.state.truckData.destination.longitude) * this.state.transportOfferData.destinationPrice;
        const priceToClient = 200;
        const priceToDestination = 698;

        const totalPrice = Math.round((priceToClient + priceToDestination) * 100) / 100;

        database.ref('/transport_offers').child(transportOfferData.id).update({'totalPrice': totalPrice});

        return totalPrice;
    }

    return(
        <>
            { transportOfferData.data && transportRequestData.data &&
                <div className='item-info'>
                    <h2>Contract</h2>

                    <div className='info-section'>
                        <p>Transportator:</p>
                        {transportOfferData.data.contact &&
                        <ul>
                            <li>email: {transportOfferData.data.contact.email}</li>
                            <li>phone: {transportOfferData.data.contact.phone}</li>
                        </ul>}
                    </div>

                    <div className='info-section'>
                        <p>Expeditor:</p>
                        {transportRequestData.data.contact &&
                        <ul>
                            <li>email: {transportRequestData.data.contact.email}</li>
                            <li>phone: {transportRequestData.data.contact.phone}</li>
                        </ul>}
                    </div>

                    <div className='info-section'>
                        <p>Plecare: {transportOfferData.data.departure}</p>
                        <p>Destinatie: {transportOfferData.data.arrival}</p>

                        {transportRequestData.data && transportOfferData.data &&
                        <p>Tarif: {getTotalPrice()} RON</p>}

                        <p>Termen de livrare limita: {transportRequestData.data.maximumArrivalTime}</p>
                    </div>

                    <div className='info-section'>
                        <p>Marfa: {transportRequestData.data.merch}</p>
                        <p>Camion: </p>
                        <ul>
                            <li>marca: {transportOfferData?.data.truck.type}</li>
                            <li>inaltime: {transportOfferData?.data.truck.height} m</li>
                            <li>lungime: {transportOfferData?.data.truck.length} m</li>
                            <li>latime: {transportOfferData?.data.truck.width} m</li>
                            <li>greutate: {transportOfferData?.data.truck.weight} kg</li>
                            <li>volum: {transportOfferData?.data.truck.volume} m<sup>3</sup></li>
                        </ul>
                    </div>

                    <p>Obs: Acest contract reprezintă angajamentul ferm între cele doua parti</p>

                    <a href={`/map/${contractNonce}`}><span>Visualize map</span></a>
                </div>}
        </>
    );
}