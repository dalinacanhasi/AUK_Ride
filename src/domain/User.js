// src/domain/User.js
// A member of the AUK community. The aukEmail is what restricts the
// platform to AUK students and staff.
export class User {
  constructor(id, name, aukEmail, phone) {
    this.id = id;
    this.name = name;
    this.aukEmail = aukEmail;
    this.phone = phone;
  }
}
