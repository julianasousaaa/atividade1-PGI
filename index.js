const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/inicio', (req, res) => {
    res.send("Página inicial!");  
});

// Middleware aqui
app.use((req, res, next) => {
    const hora = new Date().toLocaleString();
    console.log(`[${hora}] URL acessada: ${req.method} ${req.url}`);
    next();
});

app.get('/produtos', (req, res) => {
    res.send(`
        <h1>Lista de Produtos</h1>
        <ul>
            <li>Camisa</li>
            <li>Calça</li>
            <li>Tenis</li>
        </ul>
    `);  
});

app.get('/contato', (req, res) => {
    res.json({
        nome: "Maria Eduarda",
        email: "mariaeduarda@email.com"
    });
});
app.get('/api/produtos', (req, res) => {
    res.json([
        { id: 1, nome: "Camisa", preco: 49.90 },
        { id: 2, nome: "Calça", preco: 89.90 },
        { id: 3, nome: "Tênis", preco: 199.90 }
    ]);
});

app.get('/upper/:texto', (req, res) => {
    const texto = req.params.texto;
    res.send(`Texto em maiúsculas: ${texto.toUpperCase()}`);
});

app.get('/aluno/:nome/:idade', (req, res) => {
    const { nome, idade } = req.params;
    res.send(`O aluno ${nome} tem ${idade} anos.`);
});


app.get('/busca', (req, res) => {
    const valor = req.query.q;
    if (valor) {
        res.send(`Você buscou por: ${valor}`);
    } else {
        res.send("Erro: Nenhum valor informado na busca!");
    }
});

app.get('/soma/:n1/:n2', (req, res) => {
    const { n1, n2 } = req.params;
    const soma = Number(n1) + Number(n2);
    if (isNaN(soma)) {
        return res.send("Erro: parâmetros devem ser números.");
    }
    res.send(`Resultado da soma: ${soma}`);
});
// Renderiza template pagina.ejs
app.get('/pagina', (req, res) => {
    res.render('pagina', { 
        titulo: "Bem-vindo!", 
        mensagem: "Essa é uma mensagem dinâmica no EJS."
    });
});

// Renderiza template produtos.ejs
app.get('/produto-ejs', (req, res) => {
    const produtos = [
        { id: 1, nome: "Camisa", preco: 49.90 },
        { id: 2, nome: "Calça", preco: 89.90 },
        { id: 3, nome: "Tênis", preco: 199.90 }
    ];
    res.render('produto', { produtos });
});

const usuariosRouter = require('./routes/usuarios');
app.use('/usuarios', usuariosRouter);

// Inicia o servidor na porta 8080
app.listen(8080, (erro) => {
    if (erro) {
        console.log("Erro ao iniciar o servidor:", erro);
    } else {
        console.log("Servidor rodando na porta 8080");
    }
});