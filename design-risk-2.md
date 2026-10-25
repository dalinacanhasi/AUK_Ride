# Design Risk 2: External notification services do not match our interface

## The risk

Drivers and passengers must be told when a seat is booked or a ride is cancelled. Email is straightforward, but SMS would come from a third-party provider whose API (for example `sendText(phoneNumber, body)`) does not fit our design. If `BookingService` called that API directly, our booking logic would be tied to one vendor, and changing provider would mean rewriting it.

## Planned pattern: Adapter

Our services depend only on our own `NotificationSender` interface. `SmsSenderAdapter` implements that interface and wraps the external client, translating `send(user, message)` into the vendor's call. Changing SMS provider means writing a new adapter; `BookingService` is not touched.

## Where it appears in our design

- Class diagram: `NotificationSender`, `EmailSender`, `SmsSenderAdapter` and `ExternalSmsClient` (Notifications package)
- Sequence diagram: [`uml/sequence-book-seat.puml`](uml/sequence-book-seat.puml), where `BookingService` sends the driver an asynchronous notification
