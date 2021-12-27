import React, { useRef, useEffect, Component } from 'react';
import { Map, Scene, WebMap, WebScene } from '@esri/react-arcgis'
import PointOnMap from './point-on-map';

export default class MapView extends Component{
    render() {
        return(
            <Scene style={{ width: '100vw', height: '100vh' }}
                mapProperties={{ basemap: 'satellite' }}
                viewProperties={{
                    center: [-118.80500,34.02700],
                    zoom: 13
                }}>
                <PointOnMap/>
            </Scene>
        )
    }
}