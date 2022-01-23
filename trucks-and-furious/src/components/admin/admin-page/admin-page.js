import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/contexts";
import { database, auth } from "../../../firebase";

export default function AdminPage() {

    const { logout } = useAuth();
    const [account, setAccount] = useState();
    const [users, setUsers] = useState([]);
    const [trucks, setTrucks] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [transportOffers, setTransportOffers] = useState([]);
    const [transportRequests, setTransportRequests] = useState([]);

    useEffect(() => { setAccount(JSON.parse(localStorage.getItem("user"))); }, [])

    useEffect(() => {
        const usersRefs = database.ref('users');
        async function fetchUsers() {
            await usersRefs.on('value', snapshot => {
                const users = [];

                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const childId = childSnapshot.key;
                    users.push({ data: childData, id: childId });
                });

                setUsers(users);
            });
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        const trucksRefs = database.ref('trucks');
        async function fetchTrucks() {
            await trucksRefs.on('value', snapshot => {
                const trucks = [];

                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const childId = childSnapshot.key;
                    trucks.push({ data: childData, id: childId });
                });

                setTrucks(trucks);
            });
        }
        fetchTrucks();
    }, []);

    useEffect(() => {
        const stocksRefs = database.ref('stocks');
        async function fetchStocks() {
            await stocksRefs.on('value', snapshot => {
                const stocks = [];

                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const childId = childSnapshot.key;
                    stocks.push({ data: childData, id: childId });
                });

                setStocks(stocks);
            });
        }
        fetchStocks();
    }, []);

    useEffect(() => {
        const contractsRefs = database.ref('contracts');
        async function fetchContracts() {
            await contractsRefs.on('value', snapshot => {
                const contracts = [];

                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const childId = childSnapshot.key;
                    contracts.push({ data: childData, id: childId });
                });

                setContracts(contracts);
            });
        }
        fetchContracts();
    }, []);

    useEffect(() => {
        const transportOffersRefs = database.ref('transport_offers');
        async function fetchTransportOffers() {
            await transportOffersRefs.on('value', snapshot => {
                const transportOffers = [];

                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const childId = childSnapshot.key;
                    transportOffers.push({ data: childData, id: childId });
                });

                setTransportOffers(transportOffers);
            });
        }
        fetchTransportOffers();
    }, []);

    useEffect(() => {
        const transportRequestsRefs = database.ref('transport_requests');
        async function fetchTransportRequests() {
            await transportRequestsRefs.on('value', snapshot => {
                const transportRequests = [];

                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const childId = childSnapshot.key;
                    transportRequests.push({ data: childData, id: childId });
                });

                setTransportRequests(transportRequests);
            });
        }
        fetchTransportRequests();
    }, []);

    return (
        <div>
            <h1>AdminPage</h1>
        </div>
    );
}