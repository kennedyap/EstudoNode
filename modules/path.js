const path = require("path");

//nome do Arquivo
console.log(path.basename(__filename));

//Nome do diretorio
console.log(path.dirname(__filename));

//Extensão do Arquivo
console.log(path.extname(__filename));

//Criar Objeto Path
console.log(path.parse(__filename));

//Juntar caminhos de arquivos
console.log(path.join(__dirname, "teste"));
