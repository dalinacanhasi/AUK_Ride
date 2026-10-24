# Design Risk 3: The storage technology will change during the project

## The risk

We will start with in-memory storage so we can build and test quickly, and we may later move to a real database. If each service created its own storage objects, every switch would mean editing every service, and the services could not be tested without real storage.

## Planned pattern: Factory Method, together with Dependency Inversion

Services depend on the `RideRepository` and `BookingRepository` interfaces and receive them through their constructors. A `RepositoryFactory` creates the concrete repositories, and only the application's start-up code decides which factory to use. Moving to a database means adding a new factory and new repository classes, without changing the services.

## Where it appears in our design

- Class diagram: `RideRepository`, `BookingRepository`, `RepositoryFactory` and the in-memory implementations (Storage package)
- Sequence diagrams: all three flows reach storage only through the repository interfaces, for example [`uml/sequence-search-rides.puml`](uml/sequence-search-rides.puml)
