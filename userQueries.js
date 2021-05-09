let users = [
  {
    id: "123456789",
    name: "nader",
    age: 30,
    favoriteFoods: ["Lasagne", "Spaghetti"],
  },
  {
    id: "987654321",
    name: "nader",
    age: 30,
    favoriteFoods: ["Lasagne", "Spaghetti"],
  },
  {
    id: "987456123",
    name: "naim",
    age: 33,
    favoriteFoods: ["Lasagne", "Spaghetti"],
  },
];

exports.update = async (id,nanewInfo) => {
  if (!nanewInfo.name) {
    res.send("name is required");
  }
  if (!nanewInfo.age) {
    res.send("age is required");
  }
  if (!nanewInfo.favoriteFoods) {
    res.send("favoriteFoods is required");
  }

  if (!users.find((user) => user.id.toString() === id)) {
    return res.status(404).send({ msg: "not found" });
  }

  const newArr = await users.map((user) =>
    user.id.toString() === id ? { ...user, ...newInfo } : user
  );
  return newArr;
};
