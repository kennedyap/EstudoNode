const fs = require("fs");
const { join } = require("path");
const path = require("path");

//Criar uma pasta
// fs.mkdir(path.join(__dirname, "/teste"), (error) => {
//   if (error) {
//     return console.log("Erro: ", error);
//   }

//   console.log("Pasta criada com sucesso.");
// });

//Criar um arquivo
fs.writeFile(
  path.join(__dirname, "/teste", "test.txt"),
  "hello node!",
  (error) => {
    if (error) {
      return console.log("Erro: ", error);
    }

    console.log("Arquivo criado com sucesso");
  }
);

//Adiciona conteudo
fs.appendFile(
  path.join(__dirname, "/teste", "test.txt"),
  "hello Word!",
  (error) => {
    if (error) {
      return console.log("Erro: ", error);
    }

    console.log("Arquivo modificado com sucesso");
  }
);

//Faz leitura de um arquivo
fs.readFile(
  path.join(__dirname, "/teste", "test.txt"),
  "utf8",
  (error, data) => {
    if (error) {
      return console.log("Erro: ", error);
    }

    console.log(data);
  }
);
