import {response, request} from "express";
import bcryptjs from 'bcryptjs';
import User from './user.js';

export const userPost = async (req, res)=>{
    const {nombre, correo, password} = req.body;
    const user = new User({nombre, correo, password});
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);\
    await user.save();

    res.status(200).json({
        user
    });
}

export const getUserById = async (req, res) =>{
    const {id} = req.params;
    const user = await User.find({_id: id});
    res.status(200).json({
        user
    });
}

