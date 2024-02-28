import {response, request, query} from "express";
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

export const userPut = async (req, res=response)=>{
    const {id} = req.params;
    const {_id, password, correo, ...resto} = req.body;
    
    await User.findByIdAndUpdate(id, resto);

    const usuario = await User.findOne({_id: id});
    res.status(200).json({
        msg: 'Usuario actualizado',
        usuario
    });
};

export const userGet = async (req = request, res = response)=>{

    const {limite, desde} = req.query;
    const query = {estado: true};
    const [total, user] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        user
    });
}

export const userDelete = async (req, res)=>{
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id, {estado: false});
    const authenticatedUser = req.user;
    res.status(200).json({
        msg:'User to delete',
        user,
        authenticatedUser
    });
}