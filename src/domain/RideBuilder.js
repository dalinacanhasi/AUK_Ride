// src/domain/RideBuilder.js
import { Ride } from './Ride.js';

// BUILDER PATTERN.
//
// Design Risk 1 from Part 1: a ride has four required details and a growing
// list of optional ones (stops, a weekly repeat, a price). A constructor
// taking all of them is a long parameter list where arguments are easy to
// mix up, and every new option means editing it and every caller.
//
// Here each detail is set by its own named step, the optional ones are
// simply not called when a driver does not use them, and build() is the
// single place that checks the required details are present.
export class RideBuilder {
  constructor(driver) {
    this.driver = driver;
    this.origin = null;
    this.destination = null;
    this.departureTime = null;
    this.totalSeats = null;
    this.pricePerSeat = 0;
    this.stops = [];
    this.recurringWeekly = false;
  }

  from(origin) {
    this.origin = origin;
    return this;                 // returning `this` is what allows chaining
  }

  to(destination) {
    this.destination = destination;
    return this;
  }

  departingAt(departureTime) {
    this.departureTime = departureTime;
    return this;
  }

  seats(n) {
    this.totalSeats = n;
    return this;
  }

  price(pricePerSeat) {
    this.pricePerSeat = pricePerSeat;
    return this;
  }

  // Called once per stop, so a driver can add none, one or several
  // without the builder needing a list parameter.
  withStop(place) {
    this.stops.push(place);
    return this;
  }

  recurring() {
    this.recurringWeekly = true;
    return this;
  }

  // The one place that decides whether a Ride may exist at all.
  // Returns { ride } on success or { errors } listing what is missing.
  build() {
    const errors = [];
    if (!this.driver) errors.push('A ride needs a driver.');
    if (!this.origin) errors.push('Choose where the ride starts.');
    if (!this.destination) errors.push('Choose where the ride ends.');
    if (this.origin && this.destination && this.origin === this.destination) {
      errors.push('Origin and destination must be different.');
    }
    if (!this.departureTime) errors.push('Choose a departure time.');
    if (!this.totalSeats || this.totalSeats < 1) {
      errors.push('Offer at least one seat.');
    }
    if (this.totalSeats > 8) errors.push('A car ride cannot offer more than 8 seats.');
    if (this.pricePerSeat < 0) errors.push('Price cannot be negative.');

    if (errors.length > 0) return { errors };
    return { ride: new Ride(this) };
  }
}
