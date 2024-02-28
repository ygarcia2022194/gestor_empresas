import User from "../user/user.js";

export const existeEmail = async (correo='')=>{
    const existeEmail = await User.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existeUsuarioById = async (id = '')=>{
    const existeUsuario = await User.findById(id);
    if(!existeUsuario){
        throw new Error(`El id: ${correo}} ya fue registrado`);
    }
}