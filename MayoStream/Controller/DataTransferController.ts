import express from "express";
import path from "node:path";
import requestDB from "../../serveur";
import { extentionVideo, idVideo } from "../Routes/DataTransferRoute";
import fs from "node:fs"

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
    getNameVideo: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const data = (await requestDB(`SELECT id, name, extention FROM videos WHERE upper(name) like '%${req.params.name.toUpperCase()}%';`)).rows;
        if (data.length > 0) {
            return res.status(200).send({videos:data});
        } else {
            return res.status(200).send({noVideo:"Aucune vidéo trouvé."})
        }
    },
    postVideo: async (req: express.Request, res: express.Response) => {
        if (!req.file) {return res.status(401).send({ error: "Don't have video" })}
        console.log("hey")
        if (!req.body.data) {
            res.status(401).send({error:"no data detected"});
            fs.unlink("MayoStream/Videos/" + `video-${idVideo}.${extentionVideo}`, (err) => {
                if (err) console.log(err);
            });
            return;
        };
        if (req.body) await requestDB(`insert into videos values ('${idVideo}', '${req.body.data.name}', '${extentionVideo}')`);
        else {return res.status(200).send("Ok !");}
    },
}

export default DataTransferC;
