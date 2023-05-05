const {
    models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                error: '401: Unauthorized',
                message: "Access denied. You do not have permission to access this page."
            });
        }
        const user = await User.findByToken(token);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

const isAdmin = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(401).json({
                error: '401: Unauthorized',
                message: "Access denied. You do not have permission to access this page."
            });
        }
        next();
    } catch (error) {
        next(error);
    }
}

const requireTokenAndAuthorize = async (req, res, next) => {
    try {
        if (req.user.isAdmin) {
            return next();
        }

        if (req.params.id && parseInt(req.params.id) !== req.user.id) {
            return res.status(403).json({
                error: '403: Forbidden',
                message: "Access denied. You do not have permission to access this page."
            });
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    requireToken,
    isAdmin,
    requireTokenAndAuthorize
};