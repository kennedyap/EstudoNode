const express = require("express");
const UserModel = require("../src/models/user.model");
const soap = require("soap");
const { stringify, fromJSON, toJSON } = require("flatted");
const url =
  "https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl";

const app = express();

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "src/views");

//Middleware (função) que executa antes da requisição, precisa chamar o next para liberar a requisição
app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log(`Content Type: ${req.headers["content-type"]}`);
  console.log(`Date: ${new Date()}`);

  next();
});

//app.get("/home", (req, res) => {
//  res.contentType("application/html");
//  res.status(200).send("<h1>Hello Word</h1>");
//});

app.get("/views/users", async (req, res) => {
  const users = await UserModel.find({});

  res.render("index", { users });
});

//Seleciona
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});

    res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//Seleciona por ID
app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//Cria
app.post("/users", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//Update
app.patch("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

    res.status(201).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//Delete
app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndRemove(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Busca informações sobre o cep informado
app.get("/users/cep/:cep", async (req, res) => {
  try {
    const pCep = req.params.cep;
    soap.createClient(url, (err, client) => {
      if (err) {
        console.log(err);
      } else {
        console.log("ok");
        client.consultaCEP(
          {
            cep: pCep.toString(),
          },
          (err, res) => {
            console.log(toJSON(res).toString());
            //console.log(res);
          }
        );
      }
    });

    return res.status(200).json(res);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

const port = 8080;
app.listen(port, () => console.log(`Rodando com Express na porta ${port}`));
