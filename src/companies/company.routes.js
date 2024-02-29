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