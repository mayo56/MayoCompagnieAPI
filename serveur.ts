import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("Bienvenue dans l'api de Mayo Compagnie !");
});

app.listen(9999, () => {
    console.log("Online");
});