import express from "express";
const DataTransferR = express();

import DataTransferC from "../Controller/DataTransferController";

DataTransferR.get("/:id", DataTransferC.getVideo)

export default DataTransferR;