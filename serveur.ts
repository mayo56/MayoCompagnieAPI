import express from "express";
import cors from "cors";
require("dotenv").config({ path: "./config/.env" });

/**
 * Import des différents modules de l'api
 */
import MayoStream from "./MayoStream/MayoStream";


///////////////////////////////////////////////--------------
// ############ //
//  PostgreSQL  //
// ############ //
import { Client } from "pg";

const credentials = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'postgres',
    password: process.env.DB_PASSWORD,
    port: 5432
};
export default async function requestDB(req: string) {
    const client = new Client(credentials);
    await client.connect();
    const now = await client.query(req);
    await client.end();
    return now;
};
///////////////////////////////////////////////--------------

//Constitution de app
const app = express();
app.use(express.json());
app.use(express.urlencoded({limit:"50mb", extended:true}))
app.use(cors({
    "origin":"*",
}));


app.get("/", (req, res) => {
    res.send("Bienvenue dans l'api de Mayo Compagnie !");
});

//MayoStream API
app.use("/stream", MayoStream);

app.listen(9999, () => {
    console.log("Online");
});