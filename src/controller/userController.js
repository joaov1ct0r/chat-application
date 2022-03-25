import User from '../model/userModel.js';

import { loginValidate, registerValidate } from './validateData.js';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

const createUser = async (req, res) => {
    let { error } = registerValidate(req.body);

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

        if (savedUser) {
            res.redirect('/');
        } else {
            res.redirect('/register');
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

const userLogin = async (req, res) => {
    let { error } = loginValidate(req.body);

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

    try {
        let token = jwt.sign(
            {
                id: selectedUser.id
            },
            process.env.JWT_TOKEN_SECRET
        );

        if (token) {
            res.cookie('auth', token, { httpOnly: true });

            res.redirect('/chat');
        }
    } catch (error) {
        throw error;
    }
};

export { createUser, userLogin };
