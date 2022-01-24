import React from "react";

import { fetchUserTableItems 
        ,fetchStockTableItems
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
        if (sidebarChoice === "Users") return fetchUserTableItems(items);
        if (sidebarChoice === "Stocks") return fetchStockTableItems(items);
        if (sidebarChoice === "Trucks") return fetchTruckTableItems(items);
        if (sidebarChoice === "Contracts") return fetchContractTableItems(items);
        if (sidebarChoice === "Requests") return fetchTransportRequestsTableItems(items);
        if (sidebarChoice === "Offers") return fetchTransportOffersTableItems(items);

        return "";
    }

    return (
        <div className="row mt-4">
            <div className="col-12 col-xl-10 mb-4 mb-lg-0">
                <div className="card">
                    <h5 className="card-header">{sidebarChoice}</h5>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table">
                                { displayTableHeadColumns() }
                                <tbody>
                                    { populateTable() }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}