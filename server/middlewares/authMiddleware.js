import User from "../models/User.js";

//middleware for check a user is authenticated or not
export const protect = async (req, res, next) => {
    try {
        const { userId } = req.auth
        if (!userId) {
           res.json({success: false, message: "Not Authorized"})
        } else {
            const user = await User.findById(userId);
            req.user = user
            next();
       }
    } catch (error) {
        
    }
}