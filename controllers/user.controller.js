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
  const limit = Number(req.query.limit);
  console.log(limit);
  fs.readFile('user.json', (err, data) => {
    if (err) {
      res.write('Failed to read file ');
      res.end();
    } else {
      const userString = data.toString();
      const users = JSON.parse(userString);
      if (limit && limit <= users.length) {
        res.json(users.slice(0, limit));
      } else {
        res.send(users);
      }
    }
  });
};
// save a user
module.exports.saveAnUser = (req, res) => {
  const file = fs.readFileSync('user.json');
  const users = JSON.parse(file);
  const newUser = req.body;
  if (Object.keys(newUser) == Object.keys(users[0])) {
    users.push(newUser);
    const allUsers = JSON.stringify(users);
    fs.writeFile('user.json', allUsers, (err) => {
      // error checking
      if (err) throw err;
      console.log('New user added');
      res.send(allUsers);
    });
  } else {
    res.send('Please ensure all the properties for saving a new user');
  }
};

module.exports.updateUser = (req, res) => {
  const file = fs.readFileSync('user.json');
  const users = JSON.parse(file);
  const updateInfo = req.body;
  if (typeof updateInfo.id == 'number') {
    const findUser = users.find((user) => user.id == updateInfo.id);
    findUser.contact = updateInfo.contact;
    const updatedUsers = JSON.stringify(users);
    fs.writeFile('user.json', updatedUsers, (err) => {
      // error checking
      if (err) throw err;
      console.log('New user added');
      res.send('updated');
    });
  } else {
    res.send('Please Provide an id of number !!!');
  }
};
module.exports.updateMultipleUser = (req, res) => {
  const file = fs.readFileSync('user.json');
  const users = JSON.parse(file);
  const multipleUserInfo = req.body;
  console.log(multipleUserInfo);
  if (typeof multipleUserInfo.id == 'number') {
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
  } else {
    res.send('Please provide a id of number ');
  }
};
module.exports.deleteUser = (req, res) => {
  const file = fs.readFileSync('user.json');
  const users = JSON.parse(file);
  const deletedID = req.body.id;
  if (typeof deletedID == 'number') {
    const rest = users.filter((user) => user.id != deletedID);
    const restUsers = JSON.stringify(rest);
    fs.writeFile('user.json', restUsers, (err) => {
      // error checking
      if (err) throw err;
      console.log('New user added');
      res.send('User Deleted');
    });
  } else {
    res.send('please provide a id of number');
  }
};
