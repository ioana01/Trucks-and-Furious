import React from "react";
import { database } from "../../../firebase";

import { fetchUserTableItems 
        ,fetchMerchTableItems
        ,fetchTruckTableItems
        ,fetchContractTableItems
        ,fetchTransportRequestsTableItems
        ,fetchTransportOffersTableItems } from "./admin-fetch-table-details";

export default function AdminTable({ sidebarChoice, columns, items }) {

    const displayTableHeadColumns = () => {
        return (
            <thead>
                <tr>
                    {columns.map((column, index) => {
                        return (
                            <th key={index} scope="col">{column}</th>
                        );
                    })}
                    <th scope="col"></th>
                </tr>
            </thead>
        )
    }

    const populateTable = () => {
        if (sidebarChoice === "Users") return fetchUserTableItems(items, handleItemDelete);
        if (sidebarChoice === "Merch") return fetchMerchTableItems(items, handleItemDelete);
        if (sidebarChoice === "Trucks") return fetchTruckTableItems(items, handleItemDelete);
        if (sidebarChoice === "Contracts") return fetchContractTableItems(items, handleItemDelete);
        if (sidebarChoice === "Requests") return fetchTransportRequestsTableItems(items, handleItemDelete);
        if (sidebarChoice === "Offers") return fetchTransportOffersTableItems(items, handleItemDelete);

        return "";
    }

    const handleItemDelete = (itemType, itemId) => {
        if (itemType === "User") database.ref(`users/${itemId}`).remove();
        if (itemType === "Merch") database.ref(`merch/${itemId}`).remove();
        if (itemType === "Truck") database.ref(`trucks/${itemId}`).remove();
        if (itemType === "Contract") database.ref(`contracts/${itemId}`).remove();
        if (itemType === "Request") database.ref(`transport_requestss/${itemId}`).remove();
        if (itemType === "Offer") database.ref(`transport_offers/${itemId}`).remove();
    }

    return (
        <div className="row mt-4">
            <div className="col-12 col-xl-10 mb-4 mb-lg-0">
                <div className="card">
                    <h5 className="card-header">{sidebarChoice}</h5>
                    <div className="card-body">
                        <div className="table-responsive">
                            {items && items.length > 0 ?
                                (<table className="table">
                                    { displayTableHeadColumns() }
                                    <tbody>
                                        { populateTable() }
                                    </tbody>
                                </table>) :
                                (<div className="text-center"> Nu exista intrari in tabel.</div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}