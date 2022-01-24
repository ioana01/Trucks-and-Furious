import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/contexts";
import { database, auth } from "../../../firebase";

import AdminDashboard from "./admin-dashboard";
import AdminSidebar from "./admin-sidebar";

import { asyncFetchUsers
        ,asyncFetchTrucks
        ,asyncFetchContracts
        ,asyncFetchStocks
        ,asyncFetchTransportOffers
        ,asyncFetchTransportRequests } from "./admin-fetch-effects";

import './admin-page.css';

export default function AdminPage() {

    const { logout } = useAuth();
    const [account, setAccount] = useState();
    const [users, setUsers] = useState([]);
    const [trucks, setTrucks] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [transportOffers, setTransportOffers] = useState([]);
    const [transportRequests, setTransportRequests] = useState([]);

    const [sidebarChoice, setSidebarChoice] = useState("users");

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
        const stocksRefs = database.ref('stocks');
        const fetchStocks = async () => asyncFetchStocks(stocksRefs, setStocks);
        fetchStocks();
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
        const transportRequestsRefs = database.ref('transport_requests');
        const fetchTransportRequests = async () => asyncFetchTransportRequests(transportRequestsRefs, setTransportRequests);
        fetchTransportRequests();
    }, []);

    const handleSidebarChoice = (choice) => {
        setSidebarChoice(choice);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <AdminSidebar handleSidebarChoice = {handleSidebarChoice} sidebarChoice = {sidebarChoice}/>
                <AdminDashboard sidebarChoice = {sidebarChoice}/>
            </div>
        </div>
    );
}