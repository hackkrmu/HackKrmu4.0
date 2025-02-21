// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
    
//     // const token = req.cookies.token;
//     // const authHeader = req.headers['authorization'];
//     // const token = authHeader.split(' ')[1];
//     token = req.cookies.token
//     // console.log(token)
    

//     if (!token) {
//         // req.isAuthenticated = false
//         return res.status(401).json({ message: 'Not logged in' });
//     }

//     try {
//         // Verify the token
//         const decoded = jwt.verify(token, 'secret-key');    
//         req.user = decoded;
//         // console.log(req.user)
//         const email = decoded.email
//         req.admin = decoded.admin
//         req.role = decoded.role
//         // req.isAuthenticated = true
//         next(); // Proceed to the next middleware or route handler
//     } catch (err) {
//         // req.isAuthenticated = false
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// };

// module.exports = authMiddleware;

    const jwt = require('jsonwebtoken');
    require('dotenv').config();

    const authMiddleware = (req, res, next) => {
        let token;
        secret = process.env.JWT_SECRET

        // Check for token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        } 
        // If not found, check for token in cookies
        else if (req.cookies.token) {
            token = req.cookies.token;
        }

        // If no token is found, return unauthorized
        if (!token) {
            return res.status(401).json({ message: 'Not logged in' });
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, secret);    
            req.user = decoded;
            req.admin = decoded.admin;
            req.role = decoded.role;
            req.userId = decoded.id;
            req.name = decoded.name
            
            next(); // Proceed to the next middleware or route handler
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };

    module.exports = authMiddleware;


// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
    
//     // const token = req.cookies.token;
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//         // req.isAuthenticated = false
//         return res.status(401).json({ message: 'Not logged in' });
//     }
//     const token = authHeader.split(' ')[1];
    
//     console.log(token)
    

//     if (!token) {
//         // req.isAuthenticated = false
//         return res.status(401).json({ message: 'Not logged in' });
//     }

//     try {
//         // Verify the token
//         const decoded = jwt.verify(token, 'secret-key');    
//         req.user = decoded;
//         // console.log(req.user)
//         const email = decoded.email
//         req.admin = decoded.admin
//         req.role = decoded.role
//         // req.isAuthenticated = true
//         next(); // Proceed to the next middleware or route handler
//     } catch (err) {
//         // req.isAuthenticated = false
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// };

// module.exports = authMiddleware;