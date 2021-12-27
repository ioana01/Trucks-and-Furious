import { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import { Map, Scene, WebMap, WebScene, MapView } from '@esri/react-arcgis'
import Graphic from "@arcgis/core/Graphic"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"


const PointOnMap = (props) => {
    const [pointGraphic, setPoint] = useState(null);
    
    useEffect(() => {
        loadModules(['esri/Graphic']).then(([Graphic]) => {
            const point = { 
                type: "point",
                longitude: -118.80657463861,
                latitude: 34.0005930608889
            };

            const simpleMarkerSymbol = {
                type: "simple-marker",
                color: [226, 119, 40],  // Orange
                outline: {
                    color: [255, 255, 255], // White
                    width: 1
                }
            };
    
            const pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol
            });
            setPoint(pointGraphic);
            props.view.graphics.add(pointGraphic);
    
        })
        .catch((err) => console.error(err));
    }, []);

    return <div id="viewDiv"></div>;

}

export default PointOnMap;