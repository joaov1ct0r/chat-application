import User from '../model/userModel.js';

import { registerValidate } from './validateData.js';

import bcrypt from 'bcryptjs';

let user = {
    async createUser(req, res) {
        let { error } = registerValidate(req.body);

        if (error) {
            return res.status(400).send('Falha no cadastramento', error);
        }

        let registeredUser = User.findOne({ email: req.body.email });

        let user = User.build({
            email: req.body.email,
            nome: req.body.nome,
            nascimento: req.body.nascimento,
            senha: bcrypt.hashSync(req.body.senha)
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
