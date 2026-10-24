# Design Risk 1: Creating a ride involves many optional details

## The risk

A ride always needs an origin, a destination, a departure time and a number of seats. Drivers will also want optional details: stops along the way, a weekly repeating ride, a price, and later things such as luggage space. A `Ride` constructor that takes all of these becomes a long parameter list where arguments are easily mixed up, and every new option means editing that constructor and every place that calls it.

## Planned pattern: Builder

A `RideBuilder` sets only the details a driver provides, through readable steps such as `from()`, `to()`, `withStop()` and `recurringWeekly()`, and `build()` checks that the required details are present before creating the `Ride`. Adding an option means adding one builder method; the `Ride` constructor and existing callers do not change.

## Where it appears in our design

- Class diagram: `RideBuilder` (Builder package), used by `RideController` and `RideService`
- Sequence diagram: [`uml/sequence-post-ride.puml`](uml/sequence-post-ride.puml)
