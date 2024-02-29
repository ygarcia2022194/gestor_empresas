import User from "../user/user.js";
import Company from "../companies/company.js";

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

export const existeEmailC = async (correo= '')=>{
    const existeEmail = await Company.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existeEmpresaById = async (id = '')=>{
    const existeEmpresa = await Company.findById(id);
    if(!existeEmpresa){
        throw new Error(`El ID: ${id} no existe`);
    }
}

export const validarAñosTrayectoria = async (años = "")=>{
    if(años == null || isNaN(años) || años<0){
        throw new Error('The years of experience must be a valid number greater than 0');
    }
    if(!Number.isInteger(años)){
        throw new Error('The years of trayectory must be a whole number');
    }
    if(años < 0){
        throw new Error('The years of trayectory cannot be negative');
    }
    if(años == 0){
        throw new Error('The years of trayectory cannot be 0');
    }
}