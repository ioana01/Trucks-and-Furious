import { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import { Map, Scene, WebMap, WebScene, MapView } from '@esri/react-arcgis'
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Graphic from "@arcgis/core/Graphic"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"


const PointOnMap = (props) => {
    const [pointGraphic, setPoint] = useState(null);
    const [polylineGraphic, setLine] = useState(null);
    
    useEffect(() => {
        loadModules(['esri/Graphic', "esri/Map","esri/views/MapView", "esri/layers/FeatureLayer"]).then(([Graphic]) => {
            const redMarker = {
                type: "simple-marker",
                color: [255, 0, 0], 
                outline: {
                    color: [255, 255, 255], 
                    width: 1
                }
            };

            const greenMarker = {
                type: "simple-marker",
                color: [0, 255, 0], 
                outline: {
                    color: [255, 255, 255], 
                    width: 1
                }
            };

            props.trucks.map(truck => {
                if(truck.data.status === 'unavailable') {
                    const polyline = {
                        type: "polyline",
                        paths: [
                            [truck.data.departure.longitude, truck.data.departure.latitude], //Longitude, latitude
                            [truck.data.destination.longitude, truck.data.destination.latitude], //Longitude, latitude
                        ]
                    };
    
                    const simpleLineSymbol = {
                        type: "simple-line",
                        color: [226, 119, 40], // Orange
                        width: 2
                        };
        
                    const polylineGraphic = new Graphic({
                        geometry: polyline,
                        symbol: simpleLineSymbol
                    });
        
                    setLine(polylineGraphic);
                    props.view.graphics.add(polylineGraphic);
                }

                const truckInfo = props.trucksInfo.filter((element) => {
                    return element.data.truckId === truck.id;
                });

                const point = { 
                    type: "point",
                    longitude: truck.data.longitude,
                    latitude: truck.data.latitude
                };

                const popupTemplate = {
                    title: "{Name}",
                    content: "{Description}"
                }

                const attributes = {
                    Name: "Truck info",
                    Description: 
                        `<p>Truck id: ${truck.id}</p> 
                        <p>De la: ${truckInfo[0].data.departure}</p>
                        <p>Pana la: ${truckInfo[0].data.arrival}</p>
                        <p>Data plecare: ${truckInfo[0].data.departureTime}</p>
                        <p>Data sosire: ${truckInfo[0].data.arrivalTime}</p>`
                        // <p>Pret: ${truckInfo[0].data.totalPrice ? truckInfo[1].data.totalPrice : '-'} RON</p>`
                }
        
                const pointGraphic = new Graphic({
                    geometry: point,
                    symbol: truck.data.status === 'available' ? greenMarker : redMarker,
                    attributes: attributes,
                    popupTemplate: popupTemplate
                });

                setPoint(pointGraphic);
                props.view.graphics.add(pointGraphic);

            })
    
        })
        .catch((err) => console.error(err));
    }, []);

    return <div></div>;

}

export default PointOnMap;