import React, { useState, Component } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth, database } from "../../firebase";
import './popup.css';

class MyPopUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requests: []
        }
    }

    async componentDidMount() {
        if(this.props.userType === 'expeditor') {
            const requestsRefs = database.ref('transport_requests');
            let requests = [];
    
            await requestsRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const childId = childSnapshot.key;
    
                    if(childData.contact.email === auth.currentUser.email) {
                        requests.push({
                            id: childId,
                            data: childData
                        })
                    }
                });

                this.setState({ requests: requests });
            });
        } else if(this.props.userType === 'transportator') {
            const requestsRefs = database.ref('transport_offers');
            let requests = [];
    
            await requestsRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const childId = childSnapshot.key;
    
                    if(childData.contact.email === auth.currentUser.email) {
                        requests.push({
                            id: childId,
                            data: childData
                        })
                    }
                });

                this.setState({ requests: requests });
            });
        }
    }

    render() {
        return (this.props.trigger) ? (
            this.state.requests &&
            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={this.props.handleClose}> x </span>
                    <div>
                        <div>
                            <h4 className="popup-title">
                                {this.props.userType === 'expeditor' ? 'Choose your request:' : 'Choose your truck'}
                            </h4>
                        </div>
    
                        <Card id='card-container-login'>
                            <Card.Body>
                                <Form>
                                    {this.props.userType === 'expeditor' ? 
                                    this.state.requests.map(request => {
                                        return <>
                                            <Link to={{pathname: `/contract/${this.props.requestId}/${request.id}`}}>
                                                <Button className="w-100 auth-button option-btn" type="submit">
                                                    {request.id}
                                                </Button> 
                                            </Link>
                                            <br></br>
                                        </>
                                    }) :
                                    this.state.requests.map(request => {
                                        return <>
                                            <Link to={{pathname: `/contract/${this.props.requestId}/${request.id}`}}>
                                                <Button className="w-100 auth-button option-btn" type="submit">
                                                    {/* TODO: change status for truck */}
                                                    {request.data.truck_id}
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
}

export default MyPopUp;