import React, {Component} from 'react'
import './demand-and-supply-list.css'
import DemandAndSupplyItem from '../demand-and-supply-item/demand-and-supply-item';
import { database, auth } from "../../firebase";

class DemandAndSupplyList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listType: '',
            currentUserType: ''
        }
    }

    async componentDidMount() {
        const usersRefs = database.ref('users');
        const email = auth.currentUser.email;

        await usersRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();

                if(childData.email === email) {
                    this.setState({ currentUserType: childData.userType });
                }
            });

            const message = this.state.currentUserType === 'transportator' ? 'Lista de cereri' : 'Lista de camioane';
            this.setState({ listType: message });
        });

    }

    render() {
        return(
            <>
                <div className='list-body'>
                    <p className='list-type'>{this.state.listType}</p>
                    <DemandAndSupplyItem 
                        destination={'Cluj'} 
                        departure={'12 feb 2022, 15:00'} 
                        arrival={'20 feb 2022, 10:00'}
                        price={'2 ron/km'}
                        merchandise={'mobila'}
                        userType={this.state.currentUserType}/>
                    <DemandAndSupplyItem 
                        destination={'Cluj'} 
                        departure={'12 feb 2022, 15:00'} 
                        arrival={'20 feb 2022, 10:00'}
                        price={'2 ron/km'}
                        merchandise={'animale'}
                        userType={this.state.currentUserType}/>
                    <DemandAndSupplyItem 
                        destination={'Cluj'} 
                        departure={'12 feb 2022, 15:00'} 
                        arrival={'20 feb 2022, 10:00'}
                        price={'2 ron/km'}
                        merchandise={'alimente'}
                        userType={this.state.currentUserType}/>
                    <DemandAndSupplyItem 
                        destination={'Cluj'} 
                        departure={'12 feb 2022, 15:00'} 
                        arrival={'20 feb 2022, 10:00'}
                        price={'2 ron/km'}
                        merchandise={'colete'}
                        userType={this.state.currentUserType}/>
                    <DemandAndSupplyItem 
                        destination={'Cluj'} 
                        departure={'12 feb 2022, 15:00'} 
                        arrival={'20 feb 2022, 10:00'}
                        price={'2 ron/km'}
                        merchandise={'mobila'}
                        userType={this.state.currentUserType}/>
                </div>
            {/* <div className='plus-sign'>
                <p>+</p>
            </div> */}
            </>
        );
    }
}

export default DemandAndSupplyList;