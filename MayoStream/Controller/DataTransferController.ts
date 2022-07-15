import express from "express";
import path from "node:path";

const DataTransferC = {
    getVideo: async (req: express.Request, res: express.Response, next:express.NextFunction) => {
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
            };
        });
    },
    postVideo: async (req: express.Request, res: express.Response) => {
        if (!req.file) return res.status(401).send({error: "Pas de vidéo envoyé."})
        else return res.status(201).send("Ok !");
    },

}

export default DataTransferC;
