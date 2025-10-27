module.exports.checkSession = (req, res, next) => {
    console.log("Session data:", req.session);
  if (req.session && req.session.user) {
    next(); // Session is valid, proceed to the next middleware/route
  } else {
    res.status(401).json({ message: "Unauthorized" }); // No valid session
  }
  console.log(req.session); // For debugging purposes
};
