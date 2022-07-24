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
        res.sendFile((`video-${req.params.id}`), OptionGetVideo, (err) => { if (err) next(err); });
    },
    getInfoVideo: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const data = (await requestDB(`SELECT * FROM videos WHERE id='${req.params.id}'`)).rows;
        if (data.length > 0) { return res.status(200).send({ data: data[0] }) }
        else { return res.status(404).send({ error: "video not found" }) };
    },
    getNameVideo: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const data = (await requestDB(`SELECT id, name, extention FROM videos WHERE upper(name) like '%${req.params.name.toUpperCase()}%';`)).rows;
        if (data.length > 0) {
            return res.status(200).send({ videos: data });
        } else {
            return res.status(200).send({ noVideo: "Aucune vidéo trouvé." })
        }
    },
    postVideo: async (req: express.Request, res: express.Response) => {
        if (!req.file) { return res.status(401).send({ error: "Don't have video" }) }
        if (!req.body.name) {
            res.status(401).send({ error: "no data detected" });
            fs.unlink("MayoStream/Videos/" + `video-${idVideo}.${extentionVideo}`, (err) => {
                if (err) console.log(err);
            });
            return;
        } else {
            await requestDB(`insert into videos values ('${idVideo}', '${req.body.name}', '${extentionVideo}')`);
            return res.status(200).send("Ok !")
        };
    },
    //Video random
    getVideoRandom: async (req: express.Request, res: express.Response) => {
        const videos = (await requestDB(`select * from videos order by random();`)).rows;
        res.status(200).send({videos})
    },
    //video random (sans celles déjà affichés)
    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     * @beta
     */
    getAnotherVideoRandom: async (req: express.Request, res: express.Response) => {
        const ids:string[] = req.body.videosIDs;
        if(!ids) return res.status(401).send({error: "No ids detected for send anothers videos"});
        const idsForReq = ids.map(e => `'${e}'`)
        const videos = (await requestDB(`select * from videos where id not in (${idsForReq.join(", ")}) order by random() limit 1`)).rows;
        res.status(200).send(videos);
    }
}

export default DataTransferC;
