import React, { useState, Component, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth, database } from "../../firebase";
import './popup.css';

export default function MyPopUp(props){

    const [requests, setRequests] = useState([]);
    const [trucks, setTrucks] = useState([]);

    useEffect(() => {
        let requests = [];
        const requestsRefs = props.userType === 'expeditor' 
            ? database.ref('transport_requestss') : database.ref('transport_offers');
        
        const fetchRequests = async () => {
            await requestsRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const childId = childSnapshot.key;
    
                    if(childData.contact.email === auth.currentUser.email) {
                        requests.push({ id: childId, data: childData });
                    }
                });
                setRequests(requests);
            });
        }

        fetchRequests();
    }, []);

    useEffect(() => {
        let trucks = [];
        if (props.userType === "expeditor")
            return;

        const trucksRefs = database.ref('trucks');
        const fetchTrucks = async () => {
            await trucksRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const childId = childSnapshot.key;
                    
                    childData.details = `${childData.type} - V:${childData.volume} - W:${childData.weight}`;

                    if(childData.owner === auth.currentUser.email && childData.status === 'available') {
                        trucks.push({ id: childId, data: childData });
                    }
                });
                setTrucks(trucks);
            });
        }
        fetchTrucks();
    }, []);

    const fetchTrucksDetails = (truckId) => {
        const truck = trucks.find(truck => truck.id === truckId);
        if (!truck) return `Nu există date despre camionul ${truckId}`;

        return `${truck.data.type} - V:${truck.data.volume} - W:${truck.data.weight}`;
    }

    const fetchRequestDetails = (request) => {
        return `Destinație: ${request.data.arrival} | Plecare: ${request.data.departure}`;
    }

    return (props.trigger) ? (
        requests &&
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}> x </span>
                <div>
                    <div>
                        <h4 className="popup-title">
                            {props.userType === 'expeditor' ? 'Alege o cerere de transport:' : 'Alege un camion:'}
                        </h4>
                    </div>

                    <Card id='card-container-login'>
                        <Card.Body>
                            <Form>
                                {props.userType === 'expeditor' ? 
                                requests.map(request => {
                                    return <>
                                        <Link to={{pathname: `/contract/${props.requestId}/${request.id}`}}>
                                            <Button className="w-100 auth-button option-btn" type="submit">
                                                {fetchRequestDetails(request)}
                                            </Button> 
                                        </Link>
                                        <br></br>
                                    </>
                                }) :
                                requests.map(request => {
                                    return <>
                                        <Link to={{pathname: `/contract/${props.requestId}/${request.id}`}}>
                                            <Button className="w-100 auth-button option-btn" type="submit">
                                                {/* TODO: change status for truck */}
                                                { fetchTrucksDetails(request.data.truckId) }
                                            </Button> 
                                        </Link>
                                        <br></br>
                                    </>
                                })}
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    ): "";
}