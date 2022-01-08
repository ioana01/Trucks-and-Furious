export class TransportRequests {
    constructor(
        arrival,
        arrival_time,
        budget,
        contact,
        departure,
        departure_time,
        mass,
        maximum_arrival_time,
        maximum_departure_time,
        merch_type,
        volume
    ) {
        this.arrival = arrival;
        this.arrival_time = arrival_time;
        this.budget = budget;
        this.contact = contact;
        this.departure = departure;
        this.departure_time = departure_time;
        this.mass = mass;
        this.maximum_arrival_time = maximum_arrival_time;
        this.maximum_departure_time = maximum_departure_time;
        this.merch_type = merch_type;
        this.volume = volume;
    }
};