import express from "express";

const DataTransferC = {
    getVideo: async (req:express.Request, res:express.Response) => {
        
    },
    postVideo: async (req:express.Request, res:express.Response) => {
        res.status(201).send("Ok !")
        console.log(req)
    },

}

export default DataTransferC;
