import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token information to the request for later use
    req.user = decodedToken;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error validating token:', error);
    return res.status(401).json({ message: 'Not a valid token' });
  }
};
export const isSeller = (req, res, next) => {
  try {
    // Check if the user is a seller
    const { isSeller } = req.user;

    if (!isSeller) {
      return res.status(403).json({ message: 'Not authorized as a seller' });
    }

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error in isSeller middleware:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

  