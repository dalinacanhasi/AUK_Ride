// src/domain/Booking.js
import { BookingStatus } from './BookingStatus.js';

// One passenger's seat on one ride. Created by Ride, never on its own:
// a booking has no meaning without the ride it belongs to.
export class Booking {
  constructor(id, ride, passenger) {
    this.id = id;
    this.ride = ride;
    this.passenger = passenger;
    this.status = BookingStatus.CONFIRMED;
  }

  // Cancelling changes the status rather than deleting the record,
  // so the history of who booked what survives.
  cancel() {
    this.status = BookingStatus.CANCELLED;
  }

  isActive() {
    return this.status === BookingStatus.CONFIRMED;
  }
}
