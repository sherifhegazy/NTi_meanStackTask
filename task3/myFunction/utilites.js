const fs = require("fs");
const uniqid = require("uniqid");
const chalk = require("chalk");
const validator = require("validator");

const writeData = (users) => {
  fs.writeFileSync("users.json", JSON.stringify(users));
};
const readData = () => {
  let data;
  try {
    data = JSON.parse(fs.readFileSync("users.json"));
    if (!Array.isArray(data)) throw new Error();
  } catch (e) {
    return [];
  }
  return data;
};
const addNewUser = (user) => {
  try {
    if (!validator.isEmail(user.email)) throw new Error("email is not valid");

    let data = readData();

    const notUnique = data.find((elm) => elm.email == user.email);
    if (notUnique) throw new Error("email is used before");
    let userData = {
      id: uniqid(),
      ...user,
    };
    data.push(userData);
    writeData(data);
    console.log(chalk.green("user add succesfully"));
  } catch (e) {
    console.log(chalk.red(e));
  }
};
function getAllData() {
  console.log(...readData());
}
function findUser(email) {
  let data = readData();

  let userm = data.findIndex((user) => user.email == email);
  if (userm) {
    return userm;

    //   throw new Error("could not find user");
    // } catch (e) {
    //   console.log(e.massage);
    // }
  }
}
const deleteUser = (email) => {
  let data = readData();
  if (findUser(email)) {
    data.splice(findUser(email));
    writeData(data);
  }
};

const editUser = (email1, newemail = "", newname = "") => {
  let data = readData();
  let user = {
    id: uniqid(),
    name: newname,
    email: newemail,
  };
  if (findUser(email1)) {
    deleteUser(email1);
    addNewUser(user);
  }
};

module.exports = { addNewUser, getAllData, findUser, deleteUser, editUser };
