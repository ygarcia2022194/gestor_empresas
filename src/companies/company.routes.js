import { Router } from "express";
import {check} from "express-validator";

import {
    companyPost,
    companyGet,
    companiesGetAZ,
    companiesGetZA,
    companyYearsTrayectory,
    companiesPut,
    generateExcelReport
} from "./companyController.js";

import { existeEmailC,
        validarAñosTrayectoria,
        existeEmpresaById 
} from "../helpers/db-validators.js";

import {validarCampos} from "../middlewares/validar-campos.js";

const router = Router();

router.get("/", companyGet);

router.post(
    "/",[
        check("nombre", "The name is obligatory").not().isEmpty(),
        check("correo", "This isn't a email valid").isEmail(),
        check("correo").custom(existeEmailC),
        check("telefono", "The phone is obligatory").not().isEmpty(),
        check("nacionalidad", "the nationality is obligatory").not().isEmpty(),
        check("nivelImpacto", "The leve of impact is obligatory").not().isEmpty(),
        check("añosTrayectoria", "The years of trayectory are obligatory").not().isEmpty(),
        check("añosTrayectoria").custom(validarAñosTrayectoria),
        check("categoria", "the category is obligatory").not().isEmpty(),
        validarCampos
    ],companyPost);

router.get("/companies", companiesGetAZ);
router.get("/companiess", companiesGetZA);
router.get("/companiesYT", companyYearsTrayectory);

router.get('/reporte-empresas', generateExcelReport);
router.put(
    "/:id",
    [
        check("id", "Isn't a valid id").isMongoId(),
        check("id").custom(existeEmpresaById),
        validarCampos
    ],companiesPut);


export default router;