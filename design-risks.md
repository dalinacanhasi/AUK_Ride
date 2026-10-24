# Anticipated Design Risks and Planned Patterns

## Risk 1: Creating a ride involves many optional details

A ride always needs an origin, a destination, a departure time and a number of seats. Drivers will also want optional details: stops along the way, a weekly repeating ride, a price, and later things such as luggage space. A `Ride` constructor that takes all of these becomes a long parameter list where arguments are easily mixed up, and every new option means editing that constructor and every place that calls it.

**Planned pattern: Builder.** A `RideBuilder` sets only the details a driver provides, through readable steps such as `from()`, `to()`, `withStop()` and `recurringWeekly()`, and `build()` checks that the required details are present before creating the `Ride`. Adding an option means adding one builder method; the `Ride` constructor and existing callers do not change.

## Risk 2: External notification services do not match our interface

Drivers and passengers must be told when a seat is booked or a ride is cancelled. Email is straightforward, but SMS would come from a third-party provider whose API (for example `sendText(phoneNumber, body)`) does not fit our design. If `BookingService` called that API directly, our booking logic would be tied to one vendor, and changing provider would mean rewriting it.

**Planned pattern: Adapter.** Our services depend only on our own `NotificationSender` interface. `SmsSenderAdapter` implements that interface and wraps the external client, translating `send(user, message)` into the vendor's call. Changing SMS provider means writing a new adapter; `BookingService` is not touched.

## Risk 3: The storage technology will change during the project

We will start with in-memory storage so we can build and test quickly, and we may later move to a real database. If each service created its own storage objects, every switch would mean editing every service, and the services could not be tested without real storage.

**Planned pattern: Factory Method, together with Dependency Inversion.** Services depend on the `RideRepository` and `BookingRepository` interfaces and receive them through their constructors. A `RepositoryFactory` creates the concrete repositories, and only the application's start-up code decides which factory to use. Moving to a database means adding a new factory and new repository classes, without changing the services.

## Planned for later: ride lifecycle rules

A ride moves between the statuses open, full, completed and cancelled, and each status allows different actions (a full ride cannot be booked; only a completed ride can be rated). For now this is a `RideStatus` enum with simple checks. If these rules keep growing, we expect to replace the checks with the **State** pattern once it is covered later in the course.
