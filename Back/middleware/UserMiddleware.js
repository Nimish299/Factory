const jwt = require('jsonwebtoken');

const UserMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'no token present' });
  }

  jwt.verify(token, process.env.JWT, (err, userid) => {
    if (err) {
      return res.status(401).json({ error: 'wrong token present' });
    }
    console.log(userid);
    req.userid = userid.id;
    next();
  });
};

module.exports = {
  UserMiddleware,
};

// const jwt = require('jsonwebtoken');

// const UserMiddleware = (req, res, next) => {
//   // Extract the token from the Authorization header
//   const authHeader = req.header('Authorization');

//   // Check if the Authorization header is present and starts with 'Bearer '
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ error: 'No token present' });
//   }

//   // Extract the token part from the 'Bearer <token>' string
//   const token = authHeader.split(' ')[1];

//   // Verify the token
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ error: 'Invalid token' });
//     }

//     // Extract the user ID from the decoded token
//     req.userid = decoded.id;
//     next();
//   });
// };

// module.exports = {
//   UserMiddleware,
// };
