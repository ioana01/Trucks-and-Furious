import React from "react";

export const fetchUserTableTitles = () => {
    return ["id", "email", "name", "userType"];
}

export const fetchTruckTableTitles = () => {
    return ["id", "type", "owner", "ownerId", "status"];
}

export const fetchMerchTableTitles = () => {
    return ["id", "name"];
}

export const fetchContractTableTitles = () => {
    return ["id", "deadline", "departure", "destination", "carry_email", "sender_email"];
}

export const fetchTransportRequestsTableTitles = () => {
    return ["id", "arrival", "arrivalTime", "departure", "departureTime", "merch", "weight", "volume"];
}

export const fetchTransportOffersTableTitles = () => {
    return ["id", "arrival", "arrivalTime", "departure", "departureTime", "type", "totalPrice"];
}

export const fetchTransportOffersTableItems = (items, handleDelete) => {
    return items.map((column, index) => {
        return (
            <tr key={column.id}>
                <td> {column.id} </td>
                <td> {column.data?.arrival} </td>
                <td> {column.data?.arrivalTime} </td>
                <td> {column.data?.departure} </td>
                <td> {column.data?.departureTime} </td>
                <td> {column.data?.truckId} </td>
                <td> {column.data?.totalPrice} </td>
                <td><button onClick = {() => handleDelete("Offer", column.id)} 
                    className="btn btn-sm btn-danger">Delete</button></td>
            </tr>
        )
    });
}

export const fetchTransportRequestsTableItems = (items, handleDelete) => {
    return items.map((column, index) => {
        return (
            <tr key={column.id}>
                <td> {column.id} </td>
                <td> {column.data?.arrival} </td>
                <td> {column.data?.arrivalTime} </td>
                <td> {column.data?.departure} </td>
                <td> {column.data?.departureTime} </td>
                <td> {column.data?.merch} </td>
                <td> {column.data?.weight} </td>
                <td> {column.data?.volume} </td>
                <td><button onClick = {() => handleDelete("Request", column.id)} 
                    className="btn btn-sm btn-danger">Delete</button></td>
            </tr>
        )
    });
}

export const fetchContractTableItems = (items, handleDelete) => {
    return items.map((column, index) => {
        return (
            <tr key={column.id}>
                <td> {column.id} </td>
                <td> {column.data?.deadline} </td>
                <td> {JSON.stringify(column.data?.departure)} </td>
                <td> {JSON.stringify(column.data?.destination)} </td>
                <td> {column.data?.carry?.email} </td>
                <td> {column.data?.sender?.email} </td>
                <td><button onClick = {() => handleDelete("Contract", column.id)} 
                    className="btn btn-sm btn-danger">Delete</button></td>
            </tr>
        )
    });
}

export const fetchUserTableItems = (items, handleDelete) => {
    return items.map((column, index) => {
        return (
            <tr key={column.id}>
                <td> {column.id} </td>
                <td> {column.data?.email} </td>
                <td> {column.data?.name} </td>
                <td> {column.data?.userType} </td>
                <td><button onClick = {() => handleDelete("User", column.id)} 
                    className="btn btn-sm btn-danger">Delete</button></td>
            </tr>
        )
    });
}

export const fetchMerchTableItems = (items, handleDelete) => {
    return items.map((column, index) => {
        return (
            <tr key={column.id}>
                <td> {column.id} </td>
                <td> {column.data?.name} </td>
                <td><button onClick = {() => handleDelete("Merch", column.id)} 
                    className="btn btn-sm btn-danger">Delete</button></td>
            </tr>
        )
    });
}

export const fetchTruckTableItems = (items, handleDelete) => {
    return items.map((column, index) => {
        return (
            <tr key={column.id}>
                <td> {column.id} </td>
                <td> {JSON.stringify(column.data?.type)} </td>
                <td> {column.data?.owner} </td>
                <td> {column.data?.ownerId} </td>
                <td> {column.data?.status} </td>
                <td><button onClick = {() => handleDelete("Truck", column.id)} 
                    className="btn btn-sm btn-danger">Delete</button></td>
            </tr>
        )
    });
}
