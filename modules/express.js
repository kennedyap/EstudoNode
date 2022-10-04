const express = require("express");
const UserModel = require("../src/models/user.model");

const app = express();

app.use(express.json);

//app.get("/home", (req, res) => {
//  res.contentType("application/html");
//  res.status(200).send("<h1>Hello Word</h1>");
//});

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

const port = 8080;
app.listen(port, () => console.log(`Rodando com Express na porta ${port}`));
