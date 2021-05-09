const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const connectDB = require("./config/db.js");
require("dotenv");
const app = express();
// connect db
connectDB();

app.use(express.json());

//get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).send("There is no registered user  !");
    }
    return res.status(200).send(users);
  } catch (error) {
    res.status(400).send("Bad Request !");
  }
});

// // find one user
app.get("/users/findOne/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // empty string validation
    if (!id) {
      return res.status(400).send("id is required!");
    }

    // validate type of mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Id is not match to mongoose object id !");
    }

    // findOne user where id === sended id
    await User.findOne({ _id: id.toString() }, function (err, user) {
      if (err) {
        return res.status(400).send("Bad Request");
      } else {
        return res.status(200).send(user);
      }
    });
  } catch (error) {
    return res.status(400).send("Bad Request !");
  }
});
// // find user by id
app.get("/users/findById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // empty string validation
    if (!id) {
      return res.status(400).send("id is required!");
    }

    // validate type of mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Id is not match to mongoose object id !");
    }

    // findOne user where id === sended id
    const foundedUser = await User.findById(id);

    if (!foundedUser) {
      return res.status(400).send("Bad Request");
    }
    return res.status(200).send(foundedUser);
  } catch (error) {
    return res.status(400).send("Bad Request !");
  }
});

// //delete user using findByIdAndRemove
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // empty string validation
    if (!id) {
      return res.status(400).send("id is required!");
    }

    // validate type of mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Id is not match to mongoose object id !");
    }

    await User.findOneAndDelete(id, function (err, users) {
      if (err) {
        return res.status(400).send("Bad Request");
      } else {
        return res.status(200).send('user deleted successfully :)');
      }
    });
    const filteredIsers = await User.findByIdAndRemove(id);

    if (!filteredIsers) {
      return res.status(400).send("Bad Request");
    }
    return res.status(200).send("user deleted successfully :)");
  } catch (error) {
    res.status(400).send("Bad Request !");
  }
  const id = req.params.userId;
  if (!users.find((user) => user.id.toString() === id)) {
    return res.status(404).send({ msg: "not found" });
  }
  console.log(typeof id);
  users = users.filter((user) => user.id.toString() !== id);
  res.send(users);
});

// //add a new user
app.post("/users/add", async (req, res) => {
  try {
    const { name, age, favoriteFoods } = req.body;
    if (!name) {
      return res.status(400).send("name is required !");
    }
    if (!age) {
      return res.status(400).send("age is required !");
    }
    if (!favoriteFoods) {
      return res.status(400).send("favoriteFoods is required !");
    }

    const user = new User();

    user.name = name;
    user.age = age;
    user.favoriteFoods = favoriteFoods;

    await user.save();
    return res.status(200).send("user created successfully :)");
  } catch (error) {
    res.status(400).send("Bad Request !");
  }
});

// //Edit user by id
app.post("/users/update/:id", async (req, res) => {
  // const {id} = req.params;
  // const {name, age, favoriteFoods} = req.body

  // Nested destructuring objects

  const {
    body: { name, age, favoriteFoods },
    params: { id },
  } = req;

//   // empty string validation
  if (!id) {
    return res.status(400).send("id is required!");
  }

  // validate type of mongoose id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Id is not match to mongoose object id !");
  }

  await User.findById(id, async (err, user) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      user.name = name;
      user.age = age;
      user.favoriteFoods = [
        ...new Set([...user.favoriteFoods, ...favoriteFoods]),
      ];
      await user.save();
      return res.status(200).send(user);
    }
  });
  //   const foundedUser = await User.findById(id)
  //   if (!foundedUser) {
  //     return res.status(404).send("Not Found User");
  //   }

  //   foundedUser.name = name;
  //   foundedUser.age = age;
  //   foundedUser.favoriteFoods = favoriteFoods;

  //   foundedUser.save();

  //   return res.status(200).send(foundedUser);
});

// //Find One and update
app.post("/users/findoneandupdate/:id", async (req, res) => {
  try {
    const {
      body: { name, age, favoriteFoods },
      params: { id },
    } = req;

    // empty string validation
    if (!id) {
      return res.status(400).send("id is required!");
    }

    // validate type of mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Id is not match to mongoose object id !");
    }

    const newUser = await User.findOneAndUpdate(
      { _id: id },
      { name, age, favoriteFoods },
      {
        new: true,
      }
    );

    return res.status(200).send(newUser);
  } catch (error) {
    return res.status(400).send("Bad is required!");
  }

});


//Find many and remove
app.delete("/users/findmanyandremove", async (req, res) => {
  try {
    const { name } = req.body;

    // empty string validation
    if (!name) {
      return res.status(400).send("Name is required!");
    }

    const allUsers = await User.find()
    const newUsers = await allUsers.remove({ name: "Mary" });

    

    return res.status(200).send(allUsers);
  } catch (error) {
    return res.status(400).send(error);
  }

});

//start the server
const port = 5000;
app.listen(port, () => console.log(`the server is running on ${port}`));
