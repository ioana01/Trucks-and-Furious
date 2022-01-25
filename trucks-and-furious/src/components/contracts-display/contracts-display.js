import React, {Component} from 'react';
import { database, auth } from '../../firebase';
import './contracts-diaplay.css';
import ContractCard from './contracts-diplay-card/contracts-diplay-card';

class ContractsDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUserContracts: []
        }
    }

    async componentDidMount() {
        const contractsRefs = database.ref('contracts');
        let contracts = [];

        await contractsRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;

                if(childData.carry.email === auth.currentUser.email || childData.sender.email === auth.currentUser.email) {
                    contracts.push(childData);
                }
            });

            this.setState({ currentUserContracts: contracts });
        });

    }

    render() {
        console.log(this.state.currentUserContracts);
        return(
            <div className='contracts-container'>
                {this.state.currentUserContracts &&
                this.state.currentUserContracts.map(contract => <ContractCard contract={contract}/>)}
            </div>
        );
    }
}

export default ContractsDisplay;