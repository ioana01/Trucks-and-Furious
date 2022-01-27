import React, { useState, useEffect} from 'react';
import './demand-and-supply-list.css';
import DemandAndSupplyItem from '../demand-and-supply-item/demand-and-supply-item';
import AddIcon from '@material-ui/icons/Add';
import { database, auth } from "../../firebase";

function DemandAndSupplyList(props) {
    const [listType, setListType] = useState('');
    const [currentUserType, setCurrentUserType] = useState('');
    const [transportRequestsList, setTransportRequestsList] = useState([]);
    const [transportOffersList, setTransportOffersList] = useState([]);
    const [myPostings, setMyPostings] = useState([]);
    const [highlitedItems, setHighlitedItems] = useState([]);

    useEffect(() => {
        const usersRefs = database.ref('users');
        const email = auth.currentUser.email;

        const fetchUsers = async () => {
            await usersRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();

                    if(childData.email === email) {
                        localStorage.setItem('user', JSON.stringify(childData));
                        setCurrentUserType(childData.userType);
                    }
                });      
            });
        };
        fetchUsers();
    }, [])

    useEffect(() => {
        const message = currentUserType === 'transportator' ? 'Lista de cereri' : 'Lista de oferte';
        setListType(message);
    }, [currentUserType])

    useEffect(() => {
        const transportRequestsRefs = database.ref('transport_requestss');

        let transportRequestsList = [];
        const fetchRequests = async () => {
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
    
                setTransportRequestsList(transportRequestsList);
            });
        }
        fetchRequests();
    }, [])

    useEffect(() => {
        const transportOffersRefs = database.ref('transport_offers');
        let transportOffersList = [];

        const fetchOffers = async () => {
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
    
                setTransportOffersList(transportOffersList);
            });
        }
        fetchOffers();
    }, []);

    useEffect(() => {
        if (!transportRequestsList.length || currentUserType === 'transportator')
            return;

        const personalPostings = transportRequestsList.filter((item) => {
            return item.data.contact.email === auth.currentUser.email;
        })
        setMyPostings(personalPostings);
    }, [transportRequestsList]);

    useEffect(() => {
        if (!transportOffersList.length || currentUserType === 'expeditor')
            return;

        const personalPostings = transportOffersList.filter((item) => {
            return item.data.contact.email === auth.currentUser.email;
        })
        setMyPostings(personalPostings);
    }, [transportOffersList]);

    useEffect(() => {
        if (!transportOffersList.length || !transportRequestsList.length || !myPostings.length)
            return;
        
        let highlited = []
        let analyzedList = currentUserType === 'transportator' ?
            transportRequestsList : transportOffersList;

        myPostings.forEach((posting) => {
            analyzedList.forEach((item) => {
                if (posting.data.departure === item.data.departure || 
                    posting.data.arrival === item.data.arrival)
                    highlited.push(item.id);
            })
        })

        setHighlitedItems(highlited)
    }, [transportRequestsList, transportOffersList, myPostings]);

    function isRecommended(list, itemId) {
        return list.indexOf(itemId) > -1;
    }

    return(
        <>
            <div className='list-body'>
                <div className="p-4">
                    <h2>Welcome, {currentUserType} {auth.currentUser.email}</h2>
                </div>
                <div className="d-flex flex-row align-items-baseline mb-4">
                    <span className='list-type'>{listType}</span>
                    <span className="add-form-text">Adauga {currentUserType === "transportator" ? "oferta" : "cerere"}</span>
                    <a href='/demand-supply-add-form' className='ml-2'><AddIcon/></a>
                    {
                        currentUserType === "transportator" &&
                        <>
                            <span className='add-form-text'>Adauga camion</span>
                            <a href='/add-trucks' className='ml-2'><AddIcon/></a>
                        </>
                    }
                </div>
                {currentUserType === 'transportator' &&
                transportRequestsList.map((element) => {
                    return <DemandAndSupplyItem
                                isRecommended={isRecommended(highlitedItems, element.id)}
                                departure={element.data.departure}
                                destination={element.data.arrival} 
                                departureTime={element.data.departureTime} 
                                arrivalTime={element.data.arrivalTime}
                                merchandise={element.data.merch}
                                userType={currentUserType}
                                id={element.id.replace('-','')}
                                key={element.id.replace('-','')}/>
                })}
                {currentUserType === 'expeditor' &&
                transportOffersList.map((element) => {
                    return <DemandAndSupplyItem 
                                isRecommended={isRecommended(highlitedItems, element.id)}
                                departure={element.data.departure}
                                destination={element.data.arrival} 
                                departureTime={element.data.departureTime} 
                                arrivalTime={element.data.arrivalTime}
                                destinationPrice={element.data.destinationPrice}
                                clientPrice={element.data.clientPrice}
                                userType={currentUserType}
                                id={element.id.replace('-','')}
                                key={element.id.replace('-','')}/>
                })}
                {
                    currentUserType === 'admin' ? window.location.href='/admin' : null
                }
            </div>
        </>
    );
}

export default DemandAndSupplyList;