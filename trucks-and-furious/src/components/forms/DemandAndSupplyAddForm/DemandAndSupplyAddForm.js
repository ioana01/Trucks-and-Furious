import React from 'react';
import { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { database, auth } from "../../../firebase";

export default function DemandAndSupplyAddForm() {

    const [user, setUser] = useState();
    const [departure, setDeparture] = useState();
    const [arrival, setArrival] = useState();
    const [departureTime, setDepartureTime] = useState();
    const [arrivalTime, setArrivalTime] = useState();
    const [trucks, setTrucks] = useState([]);
    const [selectedTruck, setSelectedTruck] = useState({ id: '', type: '', volume: '', width: '', height: '', length: '', weight: '' });
    const [totalCost, setTotalCost] = useState();
    const [contact, setContact] = useState({ name: '', phone: '' });
    const [ownerId, setOwnerId] = useState();
    const [maximumDepartureTime, setMaximumDepartureTime] = useState();
    const [maximumArrivalTime, setMaximumArrivalTime] = useState();
    const [merch, setMerch] = useState();
    const [weight, setWeight] = useState();
    const [volume, setVolume] = useState();
    const [totalBudget, setTotalBudget] = useState();

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

                trucksList.push(
                    {
                        data: childData,
                        id: childId
                    }
                )
            });

            setTrucks(trucksList);
        }); 

    }, [ownerId]);

    return (
        <div>Add Form</div>
    )
}

// class DemandAndSupplyAddForm extends Component {

//     constructor(props) {
//         super(props);
        
//         this.state = {
//             arrival: '',
//             arrivalTime: null,
//             clientPrice: 0,
//             budget: 0,
//             email: '',
//             phone: '',
//             departure: '',
//             departureTime: null,
//             destinationPrice: 0,
//             height: 0,
//             length: 0,
//             mass: 0,
//             truckType: '',
//             maximumArrivalTime: null,
//             maximumDepartureTime: null,
//             merchType: '',
//             volume: 0,
//             width: 0,
//             trucks: [],
//             currentUserType: 'expeditor',
//             currentUserId: null
//         }

//         this.handleArrival = this.handleArrival.bind(this);
//         this.handleArrivalTime = this.handleArrivalTime.bind(this);
//         this.handleClientPrice = this.handleClientPrice.bind(this);
//         this.handleBudget = this.handleBudget.bind(this);
//         this.handleEmail = this.handleEmail.bind(this);
//         this.handlePhone = this.handlePhone.bind(this);
//         this.handleDeparture = this.handleDeparture.bind(this);
//         this.handleDepartureTime = this.handleDepartureTime.bind(this);
//         this.handleDestinationPrice = this.handleDestinationPrice.bind(this);
//         this.handleHeight = this.handleHeight.bind(this);
//         this.handleLength = this.handleLength.bind(this);
//         this.handleMass = this.handleMass.bind(this);
//         this.handleMaximumArrivalTime = this.handleMaximumArrivalTime.bind(this);
//         this.handleMaximumDepartureTime = this.handleMaximumDepartureTime.bind(this);
//         this.handleMerchType = this.handleMerchType.bind(this);
//         this.handleVolume = this.handleVolume.bind(this);
//         this.handleWidth = this.handleWidth.bind(this);

//         this.handleFormSubmit = this.handleFormSubmit.bind(this);
//         this.handleExpeditorFormSubmit = this.handleExpeditorFormSubmit.bind(this);
//         this.handleTransporterFormSubmit = this.handleTransporterFormSubmit.bind(this);
//     }

//     async componentDidMount() {
//         const email = auth.currentUser.email;
//         const usersRefs = database.ref('users');
//         const trucksRefs = database.ref('trucks');
//         let trucksList = [];

//         await usersRefs.on('value', snapshot => {
//             snapshot.forEach((childSnapshot) => {
//                 const userData = childSnapshot.val();
//                 const userKey = childSnapshot.key;

//                 if(userData.email === email) {            
//                     if (userData.userType === 'transportator') {
//                         // await trucksRefs.on('value', snapshot => {
//                         //     snapshot.forEach(childSnapshot => {
//                         //         const childData = childSnapshot.val();
//                         //         const childId = childSnapshot.key;
                                
//                         //         if (childData.ownerId === userKey) {
//                         //             trucksList.push({ data: childData, id: childId });
//                         //         }
//                         //     });

//                         this.setState({ 
//                             currentUserType: userData.userType,
//                             currentUserId: userKey,
//                             trucks: trucksList
//                         });
//                     }
//                     else 
//                     {
//                         this.setState({ 
//                             currentUserType: userData.userType,
//                             currentUserId: userKey,
//                             trucks: []
//                         });
//                     }
//                 }
//             });
//         });

//         // await usersRefs
//         //     .child(email)
//         //     .once("email")
//         //     .then(snapshot => {
//         //         console.log(snapshot.value);
//         //     })
//     }

//     handleArrival(event) {
//         console.log(event.target.value);
//         this.setState({ arrival: event.target.value });
//     }

//     handleArrivalTime(event) {
//         console.log(event);
//         this.setState({ arrivalTime: event });
//     }

//     handleClientPrice(event) {
//         this.setState({ clientPrice: event.target.value });
//     }

//     handleBudget(event) {
//         this.setState({ budget: event.target.value });
//     }

//     handleEmail(event) {
//         this.setState({ email: event.target.value });
//     }

//     handlePhone(event) {
//         this.setState({ phone: event.target.value });
//     }

//     handleDeparture(event) {
//         this.setState({ departure: event.target.value });
//     }

//     handleDepartureTime(event) {
//         this.setState({ departureTime: event });
//     }

//     handleDestinationPrice(event) {
//         this.setState({ destinationPrice: event.target.value });
//     }

//     handleHeight(event) {
//         this.setState({ height: event.target.value });
//     }

//     handleLength(event) {
//         this.setState({ length: event.target.value });
//     }

//     handleMass(event) {
//         this.setState({ mass: event.target.value });
//     }

//     handleMaximumArrivalTime(event) {
//         this.setState({ maximumArrivalTime: event });
//     }

//     handleMaximumDepartureTime(event) {
//         this.setState({ maximumDepartureTime: event });
//     }

//     handleMerchType(event) {
//         this.setState({ merchType: event.target.value });
//     }

//     handleVolume(event) {
//         this.setState({ volume: event.target.value });
//     }

//     handleWidth(event) {
//         this.setState({ width: event.target.value });
//     }

//     handleFormSubmit(event) {
//         event.preventDefault();
//         (this.state.currentUserType === 'expeditor') 
//             ? this.handleExpeditorFormSubmit() 
//             : this.handleTransporterFormSubmit();
//     }

//     handleExpeditorFormSubmit(event) {
//         event.preventDefault();
//     }

//     handleTransporterFormSubmit(event) {
//         event.preventDefault();
//     }

//     render() {
//         return(
//             <div className='row justify-content-md-center'>
//                 <div className='col-md-8 mt-4 p-4'>
//                     <h2 className='mb-4'>{this.state.currentUserType === 'expeditor' ? 'Request' : 'Offer'} add form</h2>
//                     <form onSubmit={this.handleFormSubmit}>
//                         <div className="form-group">
//                             <label htmlFor="arrival-input">Arrival location:</label>
//                             <input type="text" className="form-control" id="arrival-input" 
//                                 onChange={this.handleArrival}
//                                 value={this.state.arrival}
//                                 placeholder="Please enter the arrival location..."/>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="arrival-time-input">Arrival time:</label>
//                             <DateTimePicker className="form-control" id="arrival-time-input" 
//                                 onChange={this.handleArrivalTime}
//                                 value={this.state.arrivalTime}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="budget-input">Budget:</label>
//                             <input type="number" className="form-control" id="budget-input" placeholder="Please enter the available budget..."
//                                 onChange={this.handleBudget}
//                                 value={this.state.budget}/>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="email-input">Contact email:</label>
//                             <input type="texts" className="form-control" id="email-input" placeholder="Please enter the contact email..."
//                                 onChange={this.handleEmail}
//                                 value={this.state.email}/>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="phone-input">Contact phone:</label>
//                             <input type="phone" className="form-control" id="phone-input" placeholder="Please enter the contact phone..."
//                                 onChange={this.handlePhone}
//                                 value={this.state.phone}/>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="arrival-input">Departure location:</label>
//                             <input type="text" className="form-control" id="arrival-input" 
//                                 onChange={this.handleDeparture}
//                                 value={this.state.departure}
//                                 placeholder="Please enter the departure location..."/>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="departure-time-input">Departure time:</label>
//                             <DateTimePicker className="form-control" id="departure-time-input" 
//                                 onChange={this.handleDepartureTime}
//                                 value={this.state.departureTime}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="mass-input">Transport mass:</label>
//                             <input type="number" className="form-control" id="mass-input" 
//                                 onChange={this.handleMass}
//                                 value={this.state.mass}
//                                 placeholder="Please enter the transport mass..."/>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="maximum-arrival-time-input">Maximum arrival time:</label>
//                             <DateTimePicker className="form-control" id="maximum-arrival-time-input" 
//                                 onChange={this.handleMaximumArrivalTime}
//                                 value={this.state.maximumArrivalTime}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="maximum-departure-time-input">Maximum departure time:</label>
//                             <DateTimePicker className="form-control" id="maximum-departure-time-input" 
//                                 onChange={this.handleMaximumDepartureTime}
//                                 value={this.state.maximumDepartureTime}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="merch-type-input">Transport merch type:</label>
//                             <input type="text" className="form-control" id="merch-type-input" 
//                                 onChange={this.handleMerchType}
//                                 value={this.state.merchType}
//                                 placeholder="Please enter the transport merch type..."/>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="volume-input">Transport volume:</label>
//                             <input type="number" className="form-control" id="volume-input" 
//                                 onChange={this.handleVolume}
//                                 value={this.state.volume}
//                                 placeholder="Please enter the transport volume..."/>
//                         </div>
//                         <button type="submit" className="btn btn-primary">Submit</button>
//                     </form>
//                 </div>
//             </div>
//         );
//     }
// }

// export default DemandAndSupplyAddForm;