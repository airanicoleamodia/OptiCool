const User = require('../models/User');
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
    try {
        // Check if the authorization header is present
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'Authorization header is missing' });
        }

        // Extract the token from the header
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Login first to access this resource' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Proceed to the next middleware
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired', expiredAt: error.expiredAt });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        } else {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
};

exports.isAuthorized = (...roles) => {
    return (req, res, next) => {
        try {
            // Ensure the user object is populated
            if (!req.user) {
                return res.status(403).json({ message: 'User not authenticated' });
            }

            // Check if the user has the required roles
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'You are not allowed to access this resource' });
            }

            // Proceed to the next middleware
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    };
};
