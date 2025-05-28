const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Prozzy",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});

module.exports = db;
