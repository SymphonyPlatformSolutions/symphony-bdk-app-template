/* global SYMPHONY */

export default function getUserRooms() {
  return new Promise((resolve, reject) => {
    SYMPHONY.services.subscribe('extended-user-service').getRooms()
      .then(userRooms => resolve(userRooms))
      .catch(() => reject(new Error('No response from Symphony UI extended-user-Service in getting rooms')))
      .finally(() => SYMPHONY.services.unsubscribe('extended-user-service'));
  });
}
