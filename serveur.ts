import express from "express";

/**
 * Import des différents modules de l'api
 */
import MayoStream from "./MayoStream/MayoStream";



//Constitution de app
const app = express();

app.get("/", (req, res) => {
    res.send("Bienvenue dans l'api de Mayo Compagnie !");
});

//MayoStream API
app.use("/stream", MayoStream)

app.listen(9999, () => {
    console.log("Online");
});