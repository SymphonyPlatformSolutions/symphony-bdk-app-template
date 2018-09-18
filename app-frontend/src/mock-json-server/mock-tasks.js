// need to install faker
const faker = require('faker')

function generateMockTasks () {
  let mockTasks = [];

  for (let id = 0; id < 50; id++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();

    mockTasks.push({
      "id": id,
      "first_name": firstName,
      "last_name": lastName,
      "email": email,
    });
  }

  return { mockTasks };
}

module.exports = generateMockTasks;
