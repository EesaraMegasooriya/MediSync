const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function(req, res, next) {
    // Get token from:
    // 1. Header (recommended)
    const token = req.header('x-auth-token');
    
    // 2. Or from Authorization header (alternative)
    // const token = req.header('Authorization')?.replace('Bearer ', '');

    // Check if no token
    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: 'No token, authorization denied' 
        });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user to request
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ 
            success: false,
            message: 'Token is not valid' 
        });
    }
};