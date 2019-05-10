import UserRooms from '../../src/services/user-rooms';

describe('User Rooms', () => {
  it('Should handle Symphony service of getRooms() with success', (done) => {
    global.SYMPHONY = {
      services: {
        subscribe: jest.fn(() => ({
          getRooms: jest.fn(() => new Promise(resolve => resolve([]))),
        })),
        unsubscribe: jest.fn(str => console.log(`Got ${str}`)),
      },
    };

    UserRooms()
      .then((rooms) => {
        expect(rooms).toEqual([]);
      })
      .catch(error => done.fail(error))
      .finally(() => {
        expect(global.SYMPHONY.services.unsubscribe).toHaveBeenCalled();
        done();
      });
  });

  it('Should handle Symphony service of getRooms() with failure', (done) => {
    global.SYMPHONY = {
      services: {
        subscribe: jest.fn(() => ({
          getRooms: jest.fn(() => new Promise((resolve, reject) => reject())),
        })),
        unsubscribe: jest.fn(),
      },
    };

    UserRooms()
      .catch((error) => {
        expect(error).toEqual(new Error('No response from Symphony UI extended-user-Service in getting rooms'));
      })
      .finally(() => {
        expect(global.SYMPHONY.services.unsubscribe).toHaveBeenCalled();
        done();
      });
  });
});
