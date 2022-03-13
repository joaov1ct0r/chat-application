import User from '../model/userModel.js';

import userValidate from './validateData.js';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

let user = {
    async createUser(req, res) {
        let { error } = userValidate.registerValidate(req.body);

        if (error) {
            return res.status(400).send(error);
        }

        let registeredUser = await User.findOne({
            where: { email: req.body.email }
        });

        if (registeredUser) {
            return res.status(400).send('Email ja cadastrado');
        }

        let user = User.build({
            email: req.body.email,
            nome: req.body.nome,
            nascimento: req.body.nascimento,
            senha: bcrypt.hashSync(req.body.senha)
        });

        try {
            const savedUser = await user.save();

            res.redirect('/');
        } catch (error) {
            res.status(400).send(error);
        }
    },

    async userLogin(req, res) {
        let { error } = userValidate.loginValidate(req.body);

        if (error) {
            return res.status(400).send(error);
        }
        let selectedUser = await User.findOne({
            where: { email: req.body.email }
        });

        if (!selectedUser) {
            return res.status(400).send('Falha na autenticação');
        }

        let comparedPassword = bcrypt.compareSync(
            req.body.senha,
            selectedUser.senha
        );

        if (!comparedPassword) {
            return res.status(400).send('Falha na autenticação');
        }

        let token = jwt.sign(
            {
                id: selectedUser.id
            },
            process.env.JWT_TOKEN_SECRET
        );

        res.header('auth-token', token);

        res.redirect('/chat/');
    }
};

export default user;
