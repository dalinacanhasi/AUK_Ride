// src/domain/Ride.js
import { RideStatus } from './RideStatus.js';
import { BookingStatus } from './BookingStatus.js';
import { Booking } from './Booking.js';

// A trip a driver is offering. Built by RideBuilder, never with `new Ride(...)`
// from outside, so a ride can never exist half-filled-in.
export class Ride {
  constructor(builder) {
    this.id = crypto.randomUUID();
    this.driver = builder.driver;
    this.origin = builder.origin;
    this.destination = builder.destination;
    this.departureTime = builder.departureTime;
    this.totalSeats = builder.totalSeats;
    this.pricePerSeat = builder.pricePerSeat;
    this.stops = builder.stops;
    this.recurringWeekly = builder.recurringWeekly;
    this.status = RideStatus.OPEN;
    this.bookings = [];
  }

  // GRASP Information Expert: the ride owns its seat count and its bookings,
  // so it is the one that can answer "is there room?".
  availableSeats() {
    const taken = this.bookings.filter(b => b.isActive()).length;
    return this.totalSeats - taken;
  }

  // GRASP Creator: the ride contains its bookings, so it creates them.
  // Returns the new Booking, or null if this ride cannot be booked.
  book(passenger) {
    if (this.status !== RideStatus.OPEN) return null;
    if (this.availableSeats() <= 0) return null;

    const booking = new Booking(crypto.randomUUID(), this, passenger);
    this.bookings.push(booking);

    if (this.availableSeats() <= 0) {
      this.status = RideStatus.FULL;        // last seat just went
    }
    return booking;
  }

  cancelBooking(bookingId) {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking || !booking.isActive()) return false;
    booking.cancel();
    if (this.status === RideStatus.FULL) {
      this.status = RideStatus.OPEN;        // a seat opened up again
    }
    return true;
  }

  cancel() {
    this.status = RideStatus.CANCELLED;
    for (const booking of this.bookings) {
      if (booking.isActive()) booking.cancel();
    }
  }

  // Used by the search feature.
  matches(origin, destination, date) {
    if (this.status !== RideStatus.OPEN) return false;
    if (this.availableSeats() <= 0) return false;
    if (origin && this.origin.toLowerCase() !== origin.toLowerCase()) return false;
    if (destination && this.destination.toLowerCase() !== destination.toLowerCase()) return false;
    if (date && this.departureTime.slice(0, 10) !== date) return false;
    return true;
  }

  label() {
    const extras = [];
    if (this.stops.length > 0) extras.push(`via ${this.stops.join(', ')}`);
    if (this.recurringWeekly) extras.push('weekly');
    const suffix = extras.length ? ` (${extras.join(', ')})` : '';
    return `${this.origin} to ${this.destination}${suffix}`;
  }
}
