import React, { useRef, useEffect, Component } from 'react';
import { Map, Scene, WebMap, WebScene } from '@esri/react-arcgis'
import PointOnMap from './point-on-map';
import { database, auth } from "../../firebase";
export default class MapView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            trucks: [],
            transportInfoList: {}
        }
    }

    async componentDidMount() {
        const trucksRefs = database.ref('trucks');
        const transportOffersRefs = database.ref('transport_offers');
        let trucksList = [];
        let transportRequestsList = [];

        await trucksRefs.on('value', snapshot => {
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

            this.setState({ trucks: trucksList });
        });

        await transportOffersRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                const childId = childSnapshot.key;

                transportRequestsList.push(
                    {
                        data: childData,
                        id: childId
                    }
                )
                
                this.setState({ transportInfoList: transportRequestsList });
            });

        });
    }

    render() {
        return(
            <Map style={{ width: '100vw', height: '100vh' }}
                mapProperties={{ basemap: 'satellite' }}
                viewProperties={{
                    center: [-116.80500,34.02700],
                    zoom: 5.5
                }}>
                <PointOnMap trucks={this.state.trucks} trucksInfo={this.state.transportInfoList}/>
            </Map>
        )
    }
}