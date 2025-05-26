import dotenv from "dotenv";
dotenv.config();

export const isAdmin = (req, res, next) => {
	if (
		req.user.role === "admin" ||
		req.user.email === process.env.SUPER_ADMIN_EMAIL
	) {
		next();
	} else {
		res.status(403).json({ message: "Access denied. Admins only." });
	}
};

export const isSuperAdmin = (req, res, next) => {
	if (req.user.email === process.env.SUPER_ADMIN_EMAIL) {
		next();
	} else {
		res.status(403).json({ message: "Access denied. Super Admins only." });
	}
};
