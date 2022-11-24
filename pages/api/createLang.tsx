import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidV4 } from 'uuid';
const fs = require('fs')


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Boolean>
    ) {
        const data:any = JSON.parse(fs.readFileSync("data.json", {encoding: "utf-8"}))
        if (req.body === "") {
            res.end();
            return;
        }
    try {
        data.langs.push({
            lang: req.body.name,
            img: '',
            id: uuidV4(),
            snippets: []
        })
        fs.writeFileSync('./data.json', JSON.stringify(data, null, 4), "utf8") 
             
        res.status(200).send(true)
    } catch (error: any) {
        console.log(error);
        
        res.status(500).send(error)
    }
}