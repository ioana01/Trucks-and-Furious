import React, { useRef, useEffect, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import { defaultLocations } from "../../default_locations";
import "./map.css";

import { newTruckGraphic } from "./argcis-utils";
import { database } from "../../firebase";

export default function ArgcisMap(props) {

    const [contractNonce, setContractNonce] = useState(`${props.match.params.contractNonce}`);
    const [contract, setContract] = useState(null);

    const [locationPoints, setLocationPoints] = useState({
        departure: {x: 0, y: 0, name: ''},
        destination: {x: 0, y: 0, name: ''},
        clientPosition: {x: 0, y: 0, name: ''}
    })

    const mapDiv = useRef(null);
    const trucksLayer = useRef(new GraphicsLayer());
    const routesLayer = useRef(new GraphicsLayer());
    const view = useRef(new MapView({
        container: mapDiv.current,
        map: new Map({
            basemap: "arcgis-navigation",
            layers: [trucksLayer.current, routesLayer.current]
        }),
        scale: 1000000,
        center: [26.10298000000006, 44.43429000000003],
    }));

    const attributes = {
        Name: "Truck info",
        Description: `<p>Hello this is a popover</p>`
            // `<p>Truck id: ${truck.id}</p> 
            // // <p>De la: ${truckInfo[0].data.departure}</p>
            // // <p>Pana la: ${truckInfo[0].data.arrival}</p>
            // // <p>Data plecare: ${truckInfo[0].data.departureTime}</p>
            // // <p>Data sosire: ${truckInfo[0].data.arrivalTime}</p>`
            // <p>Pret: ${truckInfo[0].data.totalPrice ? truckInfo[1].data.totalPrice : '-'} RON</p>`
    }

    const [points, setPoints] = useState([]);

    // useEffect(() => {
    //     const locations = defaultLocations();
    //     const initialTrucks = locations.map(location => newTruckGraphic({x: location.x, y: location.y}, "green", attributes));
    //     trucksLayer.current.removeAll();
    //     trucksLayer.current.addMany(initialTrucks);
    // }, []);

    useEffect(() => {
        if (!contractNonce)
            return;
        
        let contract;
        const contractRefs = database.ref('contracts');

        const fetchContract = async () => {
            await contractRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const childId = childSnapshot.key;
    
                    if(childData.nonce === contractNonce) {
                        contract = { id: childId, data: childData };
                    }
                });
                setContract(contract);
            });
        }

        fetchContract();
    }, [contractNonce]);

    useEffect(() => {
    
        if (!contract)
            return;

        const locations = defaultLocations();
        const defaultClientPosition = locations.find(location => location.name === contract.data.clientPosition);
        const defaultDeparture = locations.find(location => location.name === contract.data.departure);
        const defaultDestination = locations.find(location => location.name === contract.data.destination);

        setLocationPoints({
            departure: {x: defaultDeparture.x, y: defaultDeparture.y, name: defaultDeparture.name},
            destination: {x: defaultDestination.x, y: defaultDestination.y, name: defaultDestination.name},
            clientPosition: {x: defaultClientPosition.x, y: defaultClientPosition.y, name: defaultClientPosition.name}
        });
    }, [contract]);

    useEffect(() => {

        if (!locationPoints.clientPosition.name 
            || !locationPoints.departure.name 
            || !locationPoints.destination.name)
            return;

        console.log("Showing the following location maps: ");
        console.log(locationPoints);

    }, [locationPoints])

    useEffect (() => {

        // const timer = setInterval(() => {
        //     const trucks = [];

        //     for (let i = 0; i < trucksLayer.current.graphics.length; i += 1) {
        //         const oldTruck = trucksLayer.current.graphics.getItemAt(i);
        //         const newTruck = newTruckGraphic({x: oldTruck.geometry.x, y: oldTruck.geometry.y}, "green", attributes);
        //         trucks.push(newTruck);
        //     }

        //     trucksLayer.current.removeAll();
        //     trucksLayer.current.addMany(trucks);
        // }, 10000);

        // return () => clearInterval(timer);

        // const truckOne = newTruckGraphic({ x: 26.10298000000006, y: 44.43429000000003 }, "red");
        // const truckTwo = newTruckGraphic({ x: 26.10298000000006, y: 45.43429000000003 }, "red");

        // trucksLayer.current.removeAll();
        // trucksLayer.current.addMany([truckOne, truckTwo]);
    }, [])

    return (
        <div style={{ width: '100vw', height: '100vh' }} ref={mapDiv}></div>
    );
}