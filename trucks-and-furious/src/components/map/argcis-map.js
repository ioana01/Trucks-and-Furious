import React, { useRef, useEffect, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import { defaultLocations } from "../../default_locations";
import "./map.css";

import { newTruckGraphic } from "./argcis-utils";

export default function ArgcisMap(props) {

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

    useEffect(() => {
        const locations = defaultLocations();
        const initialTrucks = locations.map(location => newTruckGraphic({x: location.x, y: location.y}, "green", attributes));
        trucksLayer.current.removeAll();
        trucksLayer.current.addMany(initialTrucks);
    }, []);


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