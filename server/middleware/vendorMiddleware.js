// Middleware to check if the user is a Vendor or Admin
export const isVendorOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Please login to access this resource",
      error: true,
      success: false,
    });
  }

  if (req.user.role !== "VENDOR" && req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: `Role: ${req.user.role} is not allowed to access this resource`,
      error: true,
      success: false,
    });
  }

  next();
};
