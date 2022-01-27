import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/contexts";
import { database, auth } from "../../../firebase";

import AdminDashboard from "./admin-dashboard";
import AdminSidebar from "./admin-sidebar";

import { asyncFetchUsers
        ,asyncFetchTrucks
        ,asyncFetchContracts
        ,asyncFetchMerch
        ,asyncFetchTransportOffers
        ,asyncFetchTransportRequests } from "./admin-fetch-effects";

import { fetchUserTableTitles
        ,fetchTruckTableTitles
        ,fetchMerchTableTitles
        ,fetchContractTableTitles
        ,fetchTransportRequestsTableTitles
        ,fetchTransportOffersTableTitles } from "./admin-fetch-table-details";

import './admin-page.css';

export default function AdminPage() {

    const { logout } = useAuth();
    const [account, setAccount] = useState();
    const [users, setUsers] = useState([]);
    const [trucks, setTrucks] = useState([]);
    const [merch, setMerch] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [transportOffers, setTransportOffers] = useState([]);
    const [transportRequests, setTransportRequests] = useState([]);

    const [dashboard, setDashboard] = useState({
        sidebarChoice: "Users",
        columns: fetchUserTableTitles(),
        items: users
    });

    useEffect(() => { setAccount(JSON.parse(localStorage.getItem("user"))); }, [])

    useEffect(() => {
        const usersRefs = database.ref('users');
        const fetchUsers = async () => await asyncFetchUsers(usersRefs, setUsers);
        fetchUsers();
    }, []);

    useEffect(() => {
        const trucksRefs = database.ref('trucks');
        const fetchTrucks = async () => asyncFetchTrucks(trucksRefs, setTrucks);
        fetchTrucks();
    }, []);

    useEffect(() => {
        const merchRefs = database.ref('merch');
        const fetchMerch = async () => asyncFetchMerch(merchRefs, setMerch);
        fetchMerch();
    }, []);

    useEffect(() => {
        const contractsRefs = database.ref('contracts');
        const fetchContracts = async () => asyncFetchContracts(contractsRefs, setContracts);
        fetchContracts();
    }, []);

    useEffect(() => {
        const transportOffersRefs = database.ref('transport_offers');
        const fetchTransportOffers = async () => asyncFetchTransportOffers(transportOffersRefs, setTransportOffers);
        fetchTransportOffers();
    }, []);

    useEffect(() => {
        const transportRequestsRefs = database.ref('transport_requestss');
        const fetchTransportRequests = async () => asyncFetchTransportRequests(transportRequestsRefs, setTransportRequests);
        fetchTransportRequests();
    }, []);

    useEffect(() => {
        if (dashboard.sidebarChoice === "Users") {
            const titles = fetchUserTableTitles()
            setDashboard({ ...dashboard, columns: titles, items: users });
            return;
        }
        if (dashboard.sidebarChoice === "Trucks") {
            const titles = fetchTruckTableTitles();
            setDashboard({ ...dashboard, columns: titles, items: trucks });
            return;
        }
        if (dashboard.sidebarChoice === "Merch") {
            const titles = fetchMerchTableTitles();
            setDashboard({ ...dashboard, columns: titles, items: merch });
            return;
        }
        if (dashboard.sidebarChoice === "Contracts") {
            const titles = fetchContractTableTitles();
            setDashboard({ ...dashboard, columns: titles, items: contracts });
            return;
        }
        if (dashboard.sidebarChoice === "Requests") {
            const titles = fetchTransportRequestsTableTitles();
            setDashboard({ ...dashboard, columns: titles, items: transportRequests });
            return;
        }
        if (dashboard.sidebarChoice === "Offers") {
            const titles = fetchTransportOffersTableTitles();
            setDashboard({ ...dashboard, columns: titles, items: transportOffers });
            return;
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users, trucks, merch, contracts, transportRequests, transportOffers, dashboard.sidebarChoice]);

    const handleSidebarChoice = (choice) => {
        setDashboard({...dashboard, sidebarChoice: choice});
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <AdminSidebar handleSidebarChoice = {handleSidebarChoice} 
                                sidebarChoice = {dashboard.sidebarChoice}/>

                <AdminDashboard sidebarChoice = {dashboard.sidebarChoice} 
                                columns = {dashboard.columns} 
                                items = {dashboard.items}/>
            </div>
        </div>
    );
}