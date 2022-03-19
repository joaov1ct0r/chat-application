import jwt from 'jsonwebtoken';

function validateAuth(req, res, next) {
    const token = req.header('auth-token');

    if (!token) {
        res.redirect('/');
    }

    try {
        const userVerified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

        if (userVerified) {
            next();
        } else {
            res.redirect('/');
        }
    } catch (error) {
        throw error;
    }
}

export default validateAuth;
