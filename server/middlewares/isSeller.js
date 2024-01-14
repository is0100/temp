// middleware/isSeller.js
export const isSeller = (req, res, next) => {
    // Check if the user is a seller
    const { isSeller } = req.user;
  
    if (!isSeller) {
      return res.status(403).json({ message: 'Not authorized as a seller' });
    }
  
    // Continue to the next middleware or route handler
    next();
  };
  