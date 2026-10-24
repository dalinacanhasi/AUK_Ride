# AUK Ride

A carpooling platform for the AUK community. Students and staff who drive to campus from other cities in Kosovo offer their empty seats, and other AUK members find a ride by route and departure time and book a seat. Access is limited to AUK email addresses, so everyone in the system is a fellow student or staff member.

Team project for **SWEN-383 Software Design Principles and Patterns** (RIT Kosovo, Fall 2026).

## Scope

**In scope**
- Registration and login, restricted to AUK email addresses
- Drivers post a ride (origin, destination, departure time, seats, price per seat, optional stops, optional weekly repeat) and can cancel it
- Passengers search rides by route and date, book a seat, and cancel a booking
- Notifications to the driver and passengers when a seat is booked or a ride is cancelled
- Rating the driver or a passenger after a completed ride

**Out of scope**
- Payments inside the app (passengers pay the driver directly)
- Live GPS tracking and route maps
- A native mobile app
- Users outside the AUK community

## Design

- Class diagram: [`docs/uml/class-diagram.puml`](docs/uml/class-diagram.puml)
- Sequence diagram, passenger books a seat: [`docs/uml/sequence-book-seat.puml`](docs/uml/sequence-book-seat.puml)
- Anticipated design risks and planned patterns: [`docs/design-risks.md`](docs/design-risks.md)

The diagrams are PlantUML text, so they are versioned and reviewed together with the code. Open them in VS Code with the PlantUML extension (Alt+D to preview).

The implementation language (Java or JavaScript) has not been decided yet; the design is language-neutral.

## Team
ZeroDelay

- Diella Doli
- Amela Kajtazi
- Dalina Canhasi
- Elisa Braha
