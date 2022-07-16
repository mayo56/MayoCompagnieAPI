import express from "express";
import path from "node:path";
import requestDB from "../../serveur";

const DataTransferC = {
    getVideo: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let OptionGetVideo = {
            root: path.join(__dirname, '../Videos'),
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };
        res.sendFile((`video-${req.params.id}`), OptionGetVideo, (err) => {if (err) next(err);});
    },
    getInfoVideo: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const data = (await requestDB(`SELECT * FROM videos WHERE id='${req.params.id}'`)).rows;
        if (data.length > 0) {return res.status(200).send({data:data[0]})}
        else {return res.status(404).send({error : "video not found"})};
    },
    postVideo: async (req: express.Request, res: express.Response) => {
        if (!req.file) {return res.status(401).send({ error: "Don't have video" })}
        else {return res.status(200).send("Ok !");}
    },
}

export default DataTransferC;
