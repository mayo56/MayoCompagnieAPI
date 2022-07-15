import express from "express";
import multer from "multer";
const DataTransferR = express();

import DataTransferC from "../Controller/DataTransferController";

const storageVideo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/../Videos");
    },
    filename: function (req, file, cb) {
        const name = Date.now().toString() + `.${file.mimetype.slice(6)}`;
        cb(null, "video" + '-' + name);
    }
});
const videoStock = multer({ storage: storageVideo });

DataTransferR.get("/:id", DataTransferC.getVideo);
DataTransferR.get("/info/:id", DataTransferC.getInfoVideo)
DataTransferR.post("/post", videoStock.single("file"), DataTransferC.postVideo);

export default DataTransferR;
