import React from "react";

import AdminTable from "./admin-table";
import AdminDetails from "./admin-details";

export default function AdminDashboard({ sidebarChoice, columns, items }) {
    return (
        <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4">
            <h1 className="h2">Dashboard - {sidebarChoice}</h1>
            <AdminDetails />
            <AdminTable sidebarChoice = {sidebarChoice}
                        columns = {columns}
                        items = {items}/>
        </main>
    );
}