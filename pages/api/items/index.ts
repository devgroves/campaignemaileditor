import db from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // To get the current filename 
  console.log(`Filename is ${__filename}`); 

  // To get the current directory name 
  console.log(`Directory name is ${__dirname}`); 

  if (req.method === "GET") {
    console.log("get request called.....");
     const { id } = req.query;
     if (id) {
       db.findOne({ _id: id }, (err, item) => {
         if (err) return res.status(500).json({ error: "Internal Server Error" });
         if (!item) return res.status(404).json({ error: "Item not found" });
         res.status(200).json(item);
       });
     } else {
       db.find({}, (err:any, items:any) => {
         if (err) return res.status(500).json({ error: "Internal Server Error", r: err });
         res.status(200).json(items);
       });
     }
  } else if (req.method === "POST") {
    const { data, name } = req.body;
    db.insert({ data, name }, (err, newItem) => {
      if (err) return res.status(500).json({ error: "Internal Server Error" });
      res.status(201).json(newItem);
    });
  } else if (req.method === "PATCH") {
    const { id, data, name } = req.body;
    db.update({ _id: id }, { $set: { data, name } }, {}, (err, numUpdated) => {
      if (err) return res.status(500).json({ error: "Internal Server Error" });
      if (numUpdated === 0) return res.status(404).json({ error: "Item not found" });
      res.status(200).json({ message: "Item updated successfully" });
    });
  } else {
    res.status(405).end(); 
  }
}
