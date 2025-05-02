import jwt from "jsonwebtoken";

export function authenticateJWT(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Missing token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
}

export function authorizeRoles(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.status(403).send("Forbidden");
    next();
  };
}
