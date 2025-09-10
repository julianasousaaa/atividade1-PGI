const usuarios = [
  { id: 1, nome: 'João', email: 'joao@example.com' },
  { id: 2, nome: 'Maria', email: 'maria@example.com' }
];

exports.listarUsuarios = (req, res) => {
  res.json(usuarios);
};

exports.detalhesUsuario = (req, res) => {
  const usuario = usuarios.find(u => u.id == req.params.id);
  if (!usuario) {
    return res.status(404).send('Usuário não encontrado');
  }
  res.json(usuario);
};