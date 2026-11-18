// src/domain/RideStatus.js
// The statuses a ride moves through. Frozen so a typo fails loudly
// instead of silently creating a new status.
export const RideStatus = Object.freeze({
  OPEN: 'OPEN',
  FULL: 'FULL',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
});
