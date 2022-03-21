import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    const token = req.header('auth-token');

    if (!token) {
        return res.redirect('/');
    }

    try {
        const userVerified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

        if (!userVerified) {
            return res.redirect('/');
        } else {
            next();
        }
    } catch (error) {
        throw error;
    }
}
