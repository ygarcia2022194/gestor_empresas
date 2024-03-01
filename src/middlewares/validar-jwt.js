import jwt from 'jsonwebtoken';
import User from '../user/user.js';

export const validarJWT = async(req, res, next)=>{
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg: "No token in the peticion"
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: 'User does not exist in the database'
            });
        }
        if(!user.estado){
            return res.status(401).json({
                msg: 'Invalid token - user with status: false'
            });
        }
        req.user = user;
        next();
    } catch (e){
        console.log(e),
        res.status(401).json({
            msg: "Token no valid"
        })
        
    }
}