const express = require("express");
const app = express();

app.use(express.json());
//get all users
app.get("/users", (req, res) => {
  console.log(req.body);
  res.send(users);
});

//delete user by id
app.delete("/users/:userId", (req, res) => {
  const id = req.params.userId;
  if (!users.find((user) => user.id.toString() === id)) {
    return res.status(404).send({ msg: "not found" });
  }
  console.log(typeof id);
  users = users.filter((user) => user.id.toString() !== id);
  res.send(users);
});
//add a new user
app.post("/addUser", (req, res) => {
  const newUser = req.body;
  newUser.id = Date.now();
  users.push(newUser);
  res.send({ newUser, users });
});
//Edit user by id
app.put("/users/:userId", async (req, res) => {
  const id = req.params.userId;
  const newInfo = req.body;
  const updatedUsers = await update(id, newInfo);
  if (!users.find((user) => user.id.toString() === id)) {
    return res.status(404).send({ msg: "not found" });
  }
  users = users.map((user) =>
    user.id.toString() === id ? { ...user, ...newInfo } : user
  );
  res.send(updatedUsers);
});
//start the server
const port = 5000;
app.listen(port, () => console.log(`the server is running on ${port}`));
