const fs = require("fs").promises;

class UserStorage {
  static #getUserInfo(data, id) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users);
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }

  static #getUsers(data, fields) {
    const users = JSON.parse(data);
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});

    return newUsers;
  }

  static getUsers(...fields) {
    return fs
      .readFile("./src/database/users.json")
      .then((data) => {
        return this.#getUsers(data, fields);
      })
      .catch(console.error);
  }

  static getUserInfo(id) {
    return fs
      .readFile("./src/database/users.json")
      .then((data) => {
        return this.#getUserInfo(data, id);
      })
      .catch(console.error);
  }

  static async save(userInfo) {
    const users = await this.getUsers("id", "name", "passwd");
    if (users.id.includes(userInfo.id)) {
      throw "이미 존재하는 아이디입니다";
    }
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.passwd.push(userInfo.passwd);
    fs.writeFile("./src/database/users.json", JSON.stringify(users));
    return { success: true };
  }
}
module.exports = UserStorage;
