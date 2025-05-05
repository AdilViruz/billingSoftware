// import isTokenExpired from "../utils/isTokenExpired.js";

// // This middleware will set Authorization Header
// const setAuthHeader = async (req, res, next) => {
//   try {
//     const accessToken = req.cookies.accessToken;

//     if (accessToken || !isTokenExpired(accessToken)) {
//       //  Add the access token to the Authorization header
//       req.headers['authorization'] = `Bearer ${accessToken}`
//     }
//     next()
//   } catch (error) {
//     console.error('Error adding access token to header:', error.message);
//   }
// }
import jwt from "jsonwebtoken"
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');


  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  try {
    const decoded = jwt.verify(token,'secret');
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

export default verifyToken