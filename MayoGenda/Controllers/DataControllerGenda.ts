import express from "express";
import requestDB from "../../serveur";

const GendaController = {
    /**
     * Cette fonction sert à récuperer des données pour MayoGenda
     * @param req requete
     * @param res reponse
     * @param next next
     * 
     * @alpha Fonction en version alpha, car pas de db pour le moment
     */
    getData: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const data = await requestDB(``);
            res.status(200).send({ data });
        } catch (err) {
            res.status(500).send({ error: "An error occured.", messageError:err});
        };
    },
    removeData: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            await requestDB(``);
            res.status(200).send({ succes: "Data has been remove with success." });
        } catch (err) {
            res.status(500).send({ error: "An error occured", messageError:err})
        }
    },
    patchData: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            await requestDB(``);
            res.status(200).send({success: "Data has been modify with success"});
        } catch (err) {
            res.status(500).send({error: "An error occured.", messageError:err})
        }
    },
    addData: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            await requestDB(``);
            res.status(200).send({success:"Data has been add with success"})
        } catch (err) {
            res.status(500).send({error: "An error occured", messageError:err})
        }
    }
};

export default GendaController;