import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).send('Falha na autenticação');
    }

    try {
        const userVerified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

        if (userVerified) {
            next();
        }
    } catch (error) {
        return res.status(401).send('Falha na autenticação');
    }
}
