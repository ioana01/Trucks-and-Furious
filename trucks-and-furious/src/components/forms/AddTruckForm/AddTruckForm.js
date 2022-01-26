import React from 'react';
import { useState, useEffect } from "react";
import { database, auth } from "../../../firebase";

export default function AddTruckForm() {

    const [type, setType] = useState();
    const [volume, setVolume] = useState();
    const [weight, setWeight] = useState();
    const [length, setLength] = useState();
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [ownerId, setOwnerId] = useState();

    const handleType = (event) => setType(event.target.value);
    const handleVolume = (event) => setVolume(Number(event.target.value));
    const handleWeight = (event) => setWeight(Number(event.target.value));
    const handleLength = (event) => setLength(Number(event.target.value));
    const handleWidth = (event) => setWidth(Number(event.target.value));
    const handleHeight = (event) => setHeight(Number(event.target.value));

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(type, volume, weight, length, width, height);
        
        const truck = {
            type: type,
            volume: volume,
            weight: weight,
            length: length,
            width: width,
            height: height,
            latitude: 0,
            longitude: 0,
            owner: auth.currentUser.email,
            ownerId: ownerId,
        }

        database.ref('trucks').push(truck);
    }

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

    return (
        <div className='row justify-content-md-center'>
            <div className='col-md-8 mt-4 p-4'>
                <h2 className='mb-4'>Adaugă camion</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='truck-type-input'>Marca camionului:</label>
                        <input type='text' className='form-control' id='truck-type-input'
                                placeholder='Please enter your Truck type'
                                onChange={handleType}
                                value={type} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='volume-input'>Volum:</label>
                        <input type='number' className='form-control' id='volume-input'
                            placeholder='Please enter your Truck permitted Volume'
                            onChange={handleVolume}
                            value={volume} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='length-input'>Lungime:</label>
                        <input type='number' className='form-control' id='length-input'
                            placeholder='Please enter your Truck Trail Length'
                            onChange={handleLength}
                            value={length} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='height-input'>Înălțime:</label>
                        <input type='number' className='form-control' id='height-input'
                            placeholder='Please enter your Truck Trail Height'
                            onChange={handleHeight}
                            value={height} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='width-input'>Lățime:</label>
                        <input type='number' className='form-control' id='width-input'
                            placeholder='Please enter your Truck Trail Width'
                            onChange={handleWidth}
                            value={width} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='width-input'>Cantitate:</label>
                        <input type='number' className='form-control' id='weight-input'
                            placeholder='Please enter your truck maximum weight'
                            onChange={handleWeight}
                            value={weight} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}
