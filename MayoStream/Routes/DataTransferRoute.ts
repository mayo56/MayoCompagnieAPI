import express from "express";
import multer from "multer";
const DataTransferR = express();

import DataTransferC from "../Controller/DataTransferController";

export let idVideo = ""
export let extentionVideo = ""
const storageVideo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/../Videos");
    },
    filename: function (req, file, cb) {
        idVideo = Date.now().toString() ;
        extentionVideo = `${file.mimetype.slice(6)}`
        cb(null, "video" + '-' + idVideo + `.${file.mimetype.slice(6)}`);
    }
});
const videoStock = multer({ storage: storageVideo });

DataTransferR.get("/video/:id", DataTransferC.getVideo);
DataTransferR.get("/info/:id", DataTransferC.getInfoVideo)
DataTransferR.get("/search/:name", DataTransferC.getNameVideo)
DataTransferR.post("/post", videoStock.single("file"), DataTransferC.postVideo);

//get des vidéos (home)
DataTransferR.get("/videos/random", DataTransferC.getVideoRandom);
DataTransferR.get("/videos/random/another", DataTransferC.getAnotherVideoRandom)

export default DataTransferR;
