import User from '../model/userModel';

let user = {
    async createUser(req, res) {
        let user = User.build({
            email: req.body.email,
            nome: req.body.nome,
            nascimento: req.body.nascimento,
            senha: req.body.senha
        });

        try {
            const savedUser = await user.save();

            res.send(savedUser);
        } catch (error) {
            res.status(400).send(error);
        }
    }
};

export default user;
