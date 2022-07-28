import express from "express";
const GendaRoute = express();

//Import du controller de MayoGenda
import GendaController from "../Controllers/DataControllerGenda";

GendaRoute.get("/getdata", GendaController.getData)

export default GendaRoute;