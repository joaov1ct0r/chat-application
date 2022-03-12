import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).send('Falha na autenticação');
    }
}
