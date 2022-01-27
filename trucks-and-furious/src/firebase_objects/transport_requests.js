export class TransportRequests {
    constructor(
        arrival,
        arrivalTime,
        budget,
        contact,
        departure,
        departureTime,
        weight,
        maximumArrivalTime,
        maximumDepartureTime,
        merch,
        volume
    ) {
        this.arrival = arrival;
        this.arrivalTime = arrivalTime;
        this.budget = budget;
        this.contact = contact;
        this.departure = departure;
        this.departureTime = departureTime;
        this.weight = weight;
        this.maximumArrivalTime = maximumArrivalTime;
        this.maximumDepartureTime = maximumDepartureTime;
        this.merch = merch;
        this.volume = volume;
    }
};