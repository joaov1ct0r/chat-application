import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    const token = req.header('auth-token');
}
