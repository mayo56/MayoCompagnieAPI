import express from "express";
const GendaRoute = express();

//Import du controller de MayoGenda
import GendaController from "../Controllers/DataControllerGenda";

GendaRoute.get("/getdata", GendaController.getData);
GendaRoute.delete("/removedata", GendaController.removeData);
GendaRoute.patch("/patchdata", GendaController.patchData);
GendaRoute.post("/adddata", GendaController.addData);


export default GendaRoute;