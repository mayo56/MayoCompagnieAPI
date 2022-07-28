import express from "express";
const MayoGenda = express();

/**
 * Schéma de MayoGenda
 * 
 * - Demandes des données
 * - Ajout de données
 * - Modifications de données
 * - Suppression de données
 */

MayoGenda.use("/genda")

export default MayoGenda;