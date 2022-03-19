import jwt from 'jsonwebtoken';

function validateAuth(req, res, next) {
    const token = req.header('auth-token');

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const userVerified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

        if (userVerified) {
            next();
        } else {
            return res.redirect('/login');
        }
    } catch (error) {
        return res.redirect('/login');
    }
}

export default validateAuth;
