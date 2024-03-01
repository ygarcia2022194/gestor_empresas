import bcryptjs from 'bcryptjs';
import User from '../user/user.js';
import { generarJWT } from '../helpers/generar-jwt.js';

export const login = async(req, res)=>{
    const {correo, password}=req.body;
    try {
        const user = await User.findOne({correo});

        if(!user){
            return res.status(400).json({
                msg: "Incorrect credentials, Email doesn't exist in the DB"
            });
        }
        if(!user.estado){
            return res.status(400).json({
                msg: "User doesn't exist in the DB"
            });
        }
        const validatePassword = bcryptjs.compareSync(password, user.password);
        if(!validatePassword){
            return res.status(400).json({
                msg: "Password is incorrect"
            });
        }
        const token = await generarJWT(user.id);
        res.status(200).json({
            msg: 'Welcome',
            user,
            token
        });
    } catch (e){
        console.log(e);
        res.status(500).json({
            msg: "Contact with the adminstrator"
        })
        
    }
}