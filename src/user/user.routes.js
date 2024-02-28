import { Router } from "express";
import { check } from "express-validator";
import{
    userPost,
    userPut,
    getUserById,
    userGet
} from "./user.controller.js";

import {
    existeEmail,
    existeUsuarioById
} from "../helpers/db-validators.js";

import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get('/', userGet);

router.post(
    "/",
    [
        check("nombre", "The name is obligatory").not().isEmpty(),
        check("password", "Password must be longer than six characters").isLength({min: 6}),
        check("correo", "This is not a valid email").isEmail(),
        check("correo").custom(existeEmail),
        validarCampos
    ], userPost);


export default router;