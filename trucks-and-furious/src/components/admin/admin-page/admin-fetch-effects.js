export const asyncFetchUsers = async (usersRefs, setUsers) => {
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

export const asyncFetchTrucks = async (trucksRefs, setTrucks) => {
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

export const asyncFetchStocks = async (stocksRefs, setStocks) => {
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

export const asyncFetchContracts = async (contractsRefs, setContracts) => {
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

export const asyncFetchTransportOffers = async (transportOffersRefs, setTransportOffers) => {
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

export const asyncFetchTransportRequests = async (transportRequestsRefs, setTransportRequests) => {
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