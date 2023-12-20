import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  const jwttoken = req.headers.jwttoken;

  if (!jwttoken) {
    return res.status(400).json({ message: "Token needed for authentication" });
  } else {
    const decoded = jwt.verify(jwttoken, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(400).json({ err: "Token is not valid" });
    } else {
      req.user = decoded;
    }
  }

  next();
};

export default isAuthenticated;
