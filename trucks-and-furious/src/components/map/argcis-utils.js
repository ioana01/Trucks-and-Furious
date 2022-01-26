import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import PopupTemplate from "@arcgis/core/PopupTemplate";

export const newTruckGraphic = (coords, color, attributes = {}) => {
    return new Graphic({
        geometry: new Point({
            x: coords.x,
            y: coords.y,
        }),
        symbol: new SimpleMarkerSymbol({
            color,
            size: "20px",
            outline: {
                color
            }
        }),
        attributes: {
            Name: "Truck info",
            Description: `<p>Hello this is a popover</p>`
                // `<p>Truck id: ${truck.id}</p> 
                // // <p>De la: ${truckInfo[0].data.departure}</p>
                // // <p>Pana la: ${truckInfo[0].data.arrival}</p>
                // // <p>Data plecare: ${truckInfo[0].data.departureTime}</p>
                // // <p>Data sosire: ${truckInfo[0].data.arrivalTime}</p>`
                // <p>Pret: ${truckInfo[0].data.totalPrice ? truckInfo[1].data.totalPrice : '-'} RON</p>`
       },
        popupTemplate: {
            title: "{Name}",
            content: "{Description}"
       }
    })
}