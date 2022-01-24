import React from "react";

export default function AdminDashboard({ sidebarChoice }) {
    return (
    <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4">
        <h1 className="h2">Dashboard - {sidebarChoice}</h1>
    </main>
    );
}