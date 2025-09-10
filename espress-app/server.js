const express = require('express');
const path = require('path');
const usuariosRoutes = require('./routes/usuarios');

const app = express();
const PORT = 3000;

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para logar URL e hora
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Acessou: ${req.url}`);
  next();
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas básicas
app.get('/', (req, res) => {
  res.send('Página inicial');
});

app.get('/produtos', (req, res) => {
  const produtos = ['Notebook', 'Celular', 'Tablet'];
  res.send(`<ul>${produtos.map(p => `<li>${p}</li>`).join('')}</ul>`);
});

app.get('/contato', (req, res) => {
  res.json({ nome: 'Maria', email: 'maria@example.com' });
});

// API de produtos
app.get('/api/produtos', (req, res) => {
  const produtos = [
    { id: 1, nome: 'Notebook', preco: 2500 },
    { id: 2, nome: 'Celular', preco: 1500 }
  ];
  res.json(produtos);
});

// Rota com parâmetro para maiúsculas
app.get('/maiuscula/:texto', (req, res) => {
  res.send(req.params.texto.toUpperCase());
});

// Rota com parâmetros nome e idade
app.get('/aluno/:nome/:idade', (req, res) => {
  const { nome, idade } = req.params;
  res.send(`O aluno ${nome} tem ${idade} anos.`);
});

// Rota com query string
app.get('/busca', (req, res) => {
  const q = req.query.q;
  if (!q) {
    return res.status(400).send('Erro: parâmetro de busca não informado.');
  }
  res.send(`Você buscou por: ${q}`);
});

// Soma com parâmetros
app.get('/soma/:num1/:num2', (req, res) => {
  const { num1, num2 } = req.params;
  const soma = Number(num1) + Number(num2);
  if (isNaN(soma)) {
    return res.status(400).send('Erro: parâmetros devem ser números.');
  }
  res.send(`Resultado: ${soma}`);
});

// Rotas de usuários
app.use('/usuarios', usuariosRoutes);

// Rota que renderiza EJS com produtos
app.get('/produtos-ejs', (req, res) => {
  const produtos = [
    { id: 1, nome: 'Notebook', preco: 2500 },
    { id: 2, nome: 'Celular', preco: 1500 }
  ];
  res.render('produtos', { produtos });
});

// Página EJS com título e mensagem
app.get('/pagina', (req, res) => {
  res.render('pagina', { titulo: 'Bem-vindo', mensagem: 'Essa é uma página dinâmica com EJS!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
