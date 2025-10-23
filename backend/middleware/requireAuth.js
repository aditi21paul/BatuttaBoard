const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    const user = await User.findOne({ _id }).select("_id role");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;