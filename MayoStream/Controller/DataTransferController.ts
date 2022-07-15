import express from "express";
import path from "node:path";

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
        res.sendFile((`video-${req.params.id}`), OptionGetVideo, (err) => {
            if (err) {
                next(err);
            }
        })
    },
    getInfoVideo: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const data = {
            //some data here (as reponse from db)
        };
        if (data) {return res.status(201).send(data)}
        else {return res.status(401).send({error : "video not found"})}
    },
    postVideo: async (req: express.Request, res: express.Response) => {
        if (!req.file) {return res.status(401).send({ error: "Don't have video" })}
        else {return res.status(201).send("Ok !");}
    },

}

export default DataTransferC;
