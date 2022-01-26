import React from 'react';
import { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { database, auth } from "../../../firebase";

export default function DemandAndSupplyAddForm() {

    const [user, setUser] = useState({ email: '', name: '', userType: '' });
    const [departure, setDeparture] = useState();
    const [arrival, setArrival] = useState();
    const [departureTime, setDepartureTime] = useState(null);
    const [arrivalTime, setArrivalTime] = useState(null);
    const [trucks, setTrucks] = useState([]);
    const [merches, setMerches] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [contact, setContact] = useState({ email: '', phone: '' });
    const [ownerId, setOwnerId] = useState();
    const [maximumDepartureTime, setMaximumDepartureTime] = useState(null);
    const [maximumArrivalTime, setMaximumArrivalTime] = useState(null);
    const [weight, setWeight] = useState();
    const [volume, setVolume] = useState();
    const [totalBudget, setTotalBudget] = useState(0);

    const [selectedTruck, setSelectedTruck] = useState({ id: '', type: '', volume: '', width: '', height: '', length: '', weight: '' });
    const [selectedMerch, setSelectedMerch] = useState();

    const [truckDropdownOptions, setTruckDropdownOptions] = useState([]);
    const [merchDropdownOptions, setMerchDropdownOptions] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
    }, []);

    useEffect(() => {
        let userId;
        const email = auth.currentUser.email;
        const usersRefs = database.ref('users');

        async function getUserRefs() {
            await usersRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const childId = childSnapshot.key;
                    if(childData.email === email) {
                        userId = childId;
                    }
                });

                setOwnerId(userId);
            });
        }
        getUserRefs();
    }, []);

    useEffect(() => {
        let trucksList = [];
        const trucksRefs = database.ref('trucks');

        trucksRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;
                trucksList.push({ data: childData, id: childId });
            });

            setTrucks(trucksList);
        }); 

    }, [ownerId]);

    useEffect(() => {
        let merchList = []; 
        const merchRefs = database.ref('merch');

        merchRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;
                merchList.push({ data: childData, id: childId });
            });

            setMerches(merchList);
        });
    }, []);

    useEffect(() => {
        const personalTrucks = trucks.filter(truck => truck.data.ownerId === ownerId);
        const trucksNames = personalTrucks.map(truck => truck.data.type + '-V:' + truck.data.volume + '-W:' + truck.data.weight);
        setTruckDropdownOptions(trucksNames);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trucks]);

    useEffect(() => {
        const merchesNames = merches.map(merch => merch.data.name);
        setMerchDropdownOptions(merchesNames);
    }, [merches]);

    useEffect(() => {
        setSelectedTruck(truckDropdownOptions[0]);
    }, [truckDropdownOptions]);

    useEffect(() => {
        setSelectedMerch(merchDropdownOptions[0]);
    }, [merchDropdownOptions]);

    const handleArrival = (event) => setArrival(event.target.value);
    const handleArrivalTime = (event) => setArrivalTime(event);
    const handleTotalBudget = (event) => setTotalBudget(Number(event.target.value)); 
    const handleEmail = (event) => setContact({ ...contact, email: event.target.value });
    const handlePhone = (event) => setContact({ ...contact, phone: event.target.value });
    const handleDeparture = (event) => setDeparture(event.target.value);
    const handleDepartureTime = (event) => setDepartureTime(event);
    const handleTotalCost = (event) => setTotalCost(Number(event.target.value));
    const handleMaximumDepartureTime = (event) => setMaximumDepartureTime(event);
    const handleMaximumArrivalTime = (event) => setMaximumArrivalTime(event);
    const handleWeight = (event) => setWeight(Number(event.target.value));
    const handleVolume = (event) => setVolume(Number(event.target.value));

    const handleSelectedTruck = (event) => {
        setSelectedTruck(event)
    }

    const handleSelectedMerch = (event) => {
        setSelectedMerch(event)
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        (user.userType === 'expeditor') 
            ? handleExpeditorFormSubmit() 
            : handleTransportatorFormSubmit();
    }

    const handleExpeditorFormSubmit = () => {
        const transportRequest = {
            ownerId: ownerId,
            departure: departure,
            arrival: arrival,
            departureTime: departureTime.toISOString(),
            arrivalTime: arrivalTime.toISOString(),
            maximumArrivalTime: maximumArrivalTime.toISOString(),
            maximumDepartureTime: maximumDepartureTime.toISOString(),
            contact: contact,
            totalBudget: totalBudget,
            merch: merches.find(m => m.data.name === selectedMerch.value)?.data.name,
            weight: weight,
            volume: volume,
        }
        database.ref('transport_requests').push(transportRequest);
    }

    const handleTransportatorFormSubmit = () => {

        const chosenTruck = trucks.find(truck => truck.data.type === selectedTruck.value.split('-')[0]);

        const transportOffer = {
            ownerId: ownerId,
            departure: departure,
            arrival: arrival,
            departureTime: departureTime.toISOString(),
            arrivalTime: arrivalTime.toISOString(),
            truck: {
                id: chosenTruck.id,
                type: chosenTruck.data.type,
                volume: chosenTruck.data.volume,
                width: chosenTruck.data.width,
                height: chosenTruck.data.height,
                length: chosenTruck.data.length,
            },
            totalCost: totalCost,
            contact: contact,
        }

        database.ref('transport_offers').push(transportOffer);
    }

    return (
        <div>
            <div className='row justify-content-md-center'>
                   <div className='col-md-8 mt-4 p-4'>
                   <h2 className='mb-4'>{user.userType === 'expeditor' ? 'Adaugă cerere' : 'Adaugă ofertă'}</h2>
                       <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="arrival-input">Locul plecării:</label>
                                <input type="text" className="form-control" id="arrival-input" 
                                    onChange={handleDeparture}
                                    value={departure}
                                    placeholder="Please enter the departure location..."/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="departure-time-input">Data plecării:</label>
                                <DateTimePicker className="form-control" id="departure-time-input" 
                                    onChange={handleDepartureTime}
                                    value={departureTime}
                                />
                            </div>
                            { 
                                user.userType === 'expeditor' &&
                                    <div className="form-group">
                                        <label htmlFor="maximum-departure-time-input">Data plecării maximă:</label>
                                        <DateTimePicker className="form-control" id="maximum-departure-time-input" 
                                            onChange={handleMaximumDepartureTime}
                                            value={maximumDepartureTime}
                                        />
                                    </div>
                            }

                           <div className="form-group">
                                <label htmlFor="arrival-input">Locul destinație:</label>
                                <input type="text" className="form-control" id="arrival-input" 
                                    onChange={handleArrival}
                                    value={arrival}
                                    placeholder="Please enter the arrival location..."/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="arrival-time-input">Data destinație:</label>
                                <DateTimePicker className="form-control" id="arrival-time-input" 
                                    onChange={handleArrivalTime}
                                    value={arrivalTime}
                                />
                            </div>
                            {
                                user.userType === 'expeditor' &&
                                    (<div className="form-group">
                                        <label htmlFor="maximum-arrival-time-input">Data destinației maximă:</label>
                                        <DateTimePicker className="form-control" id="maximum-arrival-time-input" 
                                            onChange={handleMaximumArrivalTime}
                                            value={maximumArrivalTime}
                                        />
                                    </div>)
                            }

                            { 
                                user.userType === 'transportator' ?
                                    (<div className="form-group">
                                        <label htmlFor="trucks-dropdown">Listă camioane:</label>
                                        <Dropdown options={truckDropdownOptions}
                                            value={selectedTruck}
                                            onChange={handleSelectedTruck} placeholder="Select a truck option" />
                                    </div>) : null
                            }
                            { 
                                user.userType === 'transportator' ?
                                    (<div className="form-group">
                                        <label htmlFor="total-cost-input">Cost total:</label>
                                        <input type="number" className="form-control" id="total-cost-input" placeholder="Please enter the total cost..."
                                            onChange={handleTotalCost}
                                            value={totalCost}/>
                                    </div>) : null
                            }
                            {
                                user.userType === 'expeditor' &&
                                    (<div className="form-group">
                                        <label htmlFor="budget-input">Buget total:</label>
                                        <input type="number" className="form-control" id="budget-input" placeholder="Please enter the total budget..."
                                            onChange={handleTotalBudget}
                                            value={totalBudget}/>
                                    </div>)
                            }
                            {
                                user.userType === 'expeditor' &&
                                    (<div className="form-group">
                                        <label htmlFor="weight-input">Greutatea transportului:</label>
                                        <input type="number" className="form-control" id="weight-input" 
                                            onChange={handleWeight}
                                            value={weight}
                                            placeholder="Please enter the transport weight..."/>
                                    </div>)
                            }
                            
                            {   
                                user.userType === 'expeditor' &&
                                    (<div className="form-group">
                                        <label htmlFor="volume-input">Volumului transportului:</label>
                                        <input type="number" className="form-control" id="volume-input" 
                                            onChange={handleVolume}
                                            value={volume}
                                            placeholder="Please enter the transport volume..."/>
                                    </div>)
                            }

                            { 
                                user.userType === 'expeditor' ?
                                    (<div className="form-group">
                                        <label htmlFor="merches-dropdown">Listă de marfuri:</label>
                                        <Dropdown options={merchDropdownOptions}
                                            value={selectedMerch}
                                            onChange={handleSelectedMerch} placeholder="Select a merch option" />
                                    </div>) : null
                            }

                            <div className="form-group">
                                <label htmlFor="email-input">Email:</label>
                                <input type="texts" className="form-control" id="email-input" placeholder="Please enter the contact email..."
                                    onChange={handleEmail}
                                    value={contact.email}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone-input">Telefon:</label>
                                <input type="phone" className="form-control" id="phone-input" placeholder="Please enter the contact phone..."
                                    onChange={handlePhone}
                                    value={contact.phone}/>
                            </div>
                            
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
               </div>
        </div>
    )
}
