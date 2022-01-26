import React, { useRef, useEffect, Component } from 'react';
import { Map, Scene, WebMap, WebScene } from '@esri/react-arcgis'
import MapView from "@arcgis/core/views/MapView";
import PointOnMap from './point-on-map';
import { database, auth } from "../../firebase";
import "./map.css";

export default function TrucksMap(props) {

    const mapDiv = useRef(null);
    const view = useRef(new MapView({
        container: mapDiv.current,
        map: new Map({
            basemap: "satellite",
        }),
        scale: 1000000,
        center: [26.10298000000006, 44.43429000000003],
    }));
    //     <Map style={{ width: '100vw', height: '100vh' }}
    //         mapProperties={{ basemap: 'satellite' }}
    //         viewProperties={{
    //             center: [26.10298, 44.43429],
    //             zoom: 10
    //         }}>
    //     </Map>
    // )

    return(
        <div className="mapDiv" ref={mapDiv}></div>   
    );
}   

// export default class MapView extends Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             trucks: [],
//             transportInfoList: {}
//         }
//     }

//     async componentDidMount() {
//         const trucksRefs = database.ref('trucks');
//         const transportOffersRefs = database.ref('transport_offers');
//         let trucksList = [];
//         let transportRequestsList = [];

//         await trucksRefs.on('value', snapshot => {
//             snapshot.forEach(childSnapshot => {
//                 const childData = childSnapshot.val();
//                 const childId = childSnapshot.key;

//                 trucksList.push(
//                     {
//                         data: childData,
//                         id: childId
//                     }
//                 )
//             });

//             this.setState({ trucks: trucksList });
//         });

//         await transportOffersRefs.on('value', snapshot => {
//             snapshot.forEach(childSnapshot => {
//                 const childData = childSnapshot.val();
//                 const childId = childSnapshot.key;

//                 transportRequestsList.push(
//                     {
//                         data: childData,
//                         id: childId
//                     }
//                 )
                
//                 this.setState({ transportInfoList: transportRequestsList });
//             });

//         });
//     }

//     render() {
//         return(
//             <Map style={{ width: '100vw', height: '100vh' }}
//                 mapProperties={{ basemap: 'satellite' }}
//                 viewProperties={{
//                     center: [26.10298, 44.43429],
//                     zoom: 10
//                 }}>
//                 <PointOnMap trucks={this.state.trucks} trucksInfo={this.state.transportInfoList}/>
//             </Map>
//         )
//     }
// }