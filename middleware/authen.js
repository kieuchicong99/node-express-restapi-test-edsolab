const jwt = require("jsonwebtoken");
const PRIVATE_SECRET = "node express rest api";

// generate token for userser
const generateAccessToken = (user) => {
  return jwt.sign(user, PRIVATE_SECRET, { expiresIn: "1800s" });
};

// authenticate token from request
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, PRIVATE_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

module.exports = { generateAccessToken, authenticateToken };
