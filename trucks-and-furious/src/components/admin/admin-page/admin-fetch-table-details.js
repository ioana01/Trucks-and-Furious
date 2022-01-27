import React from "react";

export const fetchUserTableTitles = () => {
    return ["id", "email", "name", "userType"];
}

export const fetchTruckTableTitles = () => {
    return ["id", "type", "owner", "ownerId", "status", "departure", "destination"];
}

export const fetchStocksTableTitles = () => {
    return ["id", "name"];
}

export const fetchContractTableTitles = () => {
    return ["id", "deadline", "departure", "destination", "carry_email", "sender_email"];
}

export const fetchTransportRequestsTableTitles = () => {
    return ["id", "arrival", "arrivalTime", "departure", "departureTime", "merchType", "weight", "volume"];
}

export const fetchTransportOffersTableTitles = () => {
    return ["id", "arrival", "arrivalTime", "departure", "departureTime", "type", "totalPrice"];
}

export const fetchTransportOffersTableItems = (items) => {
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
                <td><a href="/admin" className="btn btn-sm btn-primary">View</a></td>
            </tr>
        )
    });
}

export const fetchTransportRequestsTableItems = (items) => {
    return items.map((column, index) => {
        return (
            <tr key={column.id}>
                <td> {column.id} </td>
                <td> {column.data?.arrival} </td>
                <td> {column.data?.arrivalTime} </td>
                <td> {column.data?.departure} </td>
                <td> {column.data?.departureTime} </td>
                <td> {column.data?.merchType} </td>
                <td> {column.data?.weight} </td>
                <td> {column.data?.volume} </td>
                <td><a href="/admin" className="btn btn-sm btn-primary">View</a></td>
            </tr>
        )
    });
}

export const fetchContractTableItems = (items) => {
    return items.map((column, index) => {
        return (
            <tr key={column.id}>
                <td> {column.id} </td>
                <td> {column.data?.deadline} </td>
                <td> {JSON.stringify(column.data?.departure)} </td>
                <td> {JSON.stringify(column.data?.destination)} </td>
                <td> {column.data?.carry?.email} </td>
                <td> {column.data?.sender?.email} </td>
                <td><a href="/admin" className="btn btn-sm btn-primary">View</a></td>
            </tr>
        )
    });
}

export const fetchUserTableItems = (items) => {
    return items.map((column, index) => {
        return (
            <tr key={column.id}>
                <td> {column.id} </td>
                <td> {column.data?.email} </td>
                <td> {column.data?.name} </td>
                <td> {column.data?.userType} </td>
                <td><a href="/admin" className="btn btn-sm btn-primary">View</a></td>
            </tr>
        )
    });
}

export const fetchStockTableItems = (items) => {
    return items.map((column, index) => {
        return (
            <tr key={column.id}>
                <td> {column.id} </td>
                <td> {column.data?.name} </td>
                <td><a href="/admin" className="btn btn-sm btn-primary">View</a></td>
            </tr>
        )
    });
}

export const fetchTruckTableItems = (items) => {
    return items.map((column, index) => {
        return (
            <tr key={column.id}>
                <td> {column.id} </td>
                <td> {JSON.stringify(column.data?.type)} </td>
                <td> {column.data?.owner} </td>
                <td> {column.data?.ownerId} </td>
                <td> {column.data?.status} </td>
                <td> {column.data?.departure?.name} </td>
                <td> {column.data?.destination?.name} </td>
                <td><a href="/admin" className="btn btn-sm btn-primary">View</a></td>
            </tr>
        )
    });
}
