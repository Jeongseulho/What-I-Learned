class UserStorage {
  static #users = {
    id: ["a", "b", "c"],
    passwd: ["1", "2", "3"],
    nmae: ["가", "나", "다"],
  };

  static getUsers(...fields) {
    const users = this.#users;

    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});

    return newUsers;
  }
}
module.exports = UserStorage;
