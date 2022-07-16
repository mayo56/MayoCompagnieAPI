import express from "express";
const MayoStream = express();

/**
 * Import des routes du module
 */
 import DataTransferR from "./Routes/DataTransferRoute";


//Chemins requêtes
MayoStream.use(DataTransferR);

export default MayoStream;