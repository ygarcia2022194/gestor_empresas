import { Router } from "express";
import { check } from "express-validator";
import{
    userPost,
    userPut,
    getUserById
} from "./user.controller.js";
