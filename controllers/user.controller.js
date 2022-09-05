const fs = require('fs');
// get a random user
module.exports.getRandomUser = (req, res) => {
  const randomNumber = Math.floor(Math.random() * 10);
  fs.readFile('user.json', (err, data) => {
    if (err) {
      res.write('Failed to read file ');
      res.end();
    } else {
      const randomUserString = data.toString();
      const randomUser = JSON.parse(randomUserString);
      res.json(randomUser[randomNumber]);
    }
  });
};

// get all user
module.exports.getAllUser = (req, res) => {
  fs.readFile('user.json', (err, data) => {
    if (err) {
      res.write('Failed to read file ');
      res.end();
    } else {
      const userString = data.toString();
      const users = JSON.parse(userString);
      res.json(users);
    }
  });
};

module.exports.saveAnUser = (req, res) => {
  const file = fs.readFileSync('user.json');
  const users = JSON.parse(file);
  const newUser = req.body;
  users.push(newUser);

  const allUsers = JSON.stringify(users);
  fs.writeFile('user.json', allUsers, (err) => {
    // error checking
    if (err) throw err;
    console.log('New user added');
    res.send(allUsers);
  });
};

module.exports.updateUser = (req, res) => {
  const file = fs.readFileSync('user.json');
  const users = JSON.parse(file);
  const updateInfo = req.body;
  const findUser = users.find((user) => user.id == updateInfo.id);
  findUser.contact = updateInfo.contact;
  const updatedUsers = JSON.stringify(users);
  fs.writeFile('user.json', updatedUsers, (err) => {
    // error checking
    if (err) throw err;
    console.log('New user added');
    res.send('updated');
  });
};
module.exports.updateMultipleUser = (req, res) => {
  const file = fs.readFileSync('user.json');
  const users = JSON.parse(file);
  const multipleUserInfo = req.body;
  users.map((user) => {
    multipleUserInfo.map((info) => {
      if (user.id == info.id) {
        user.contact = info.contact;
      }
    });
  });
  const updatedUsers = JSON.stringify(users);
  fs.writeFile('user.json', updatedUsers, (err) => {
    // error checking
    if (err) throw err;
    console.log('New user added');
    res.send('updated');
  });
};
module.exports.deleteUser = (req, res) => {
  const file = fs.readFileSync('user.json');
  const users = JSON.parse(file);
  const multipleUserInfo = req.body;
  users.map((user) => {
    multipleUserInfo.map((info) => {
      if (user.id == info.id) {
        user.contact = info.contact;
      }
    });
  });
  const updatedUsers = JSON.stringify(users);
  fs.writeFile('user.json', updatedUsers, (err) => {
    // error checking
    if (err) throw err;
    console.log('New user added');
    res.send('updated');
  });
};
