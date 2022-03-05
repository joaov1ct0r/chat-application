import User from '../model/userModel';

let user = {
    createUser(req, res) {
        let user = new User({
            email: req.body.email,
            nome: req.body.nome,
            nascimento: req.body.nascimento,
            senha: req.body.senha
        });
    }
};
