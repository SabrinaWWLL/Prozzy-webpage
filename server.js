const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// ✅ ROTA DE CADASTRO COM SENHA CRIPTOGRAFADA
app.post("/usuarios", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const sql = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
    db.query(sql, [nome, email, senhaCriptografada], (err, result) => {
      if (err) return res.status(500).json({ erro: err });
      res.status(201).json({ id: result.insertId, nome, email });
    });
  } catch (err) {
    console.error("Erro ao criptografar senha:", err);
    res.status(500).json({ erro: "Erro interno ao processar a senha." });
  }
});

// ✅ ROTA DE LOGIN COM BCRYPT
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  const sql = "SELECT * FROM usuario WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ mensagem: "Erro no servidor" });

    if (results.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const usuario = results[0];

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Senha incorreta" });
    }

    res.status(200).json({
      mensagem: "Login bem-sucedido",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  });
});

// 📄 OUTRAS ROTAS
app.get("/usuario", (req, res) => {
  db.query("SELECT * FROM usuario", (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.json(results);
  });
});

app.get("/usuario/:id", (req, res) => {
  db.query(
    "SELECT * FROM usuario WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ erro: err });
      if (results.length === 0)
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      res.json(results[0]);
    }
  );
});

app.put("/usuario/:id", (req, res) => {
  const { nome, email } = req.body;
  const sql = "UPDATE usuario SET nome = ?, email = ? WHERE id = ?";
  db.query(sql, [nome, email, req.params.id], (err) => {
    if (err) return res.status(500).json({ erro: err });
    res.json({ id: req.params.id, nome, email });
  });
});

app.delete("/usuario/:id", (req, res) => {
  db.query(
    "DELETE FROM usuario WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ erro: err });
      if (result.affectedRows === 0)
        return res.status(404).json({ mensagem: "Usuário não encontrado" });

      res.json({ mensagem: "Usuário deletado" });
    }
  );
});

// ✅ INICIALIZA SERVIDOR
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
