import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidV4 } from 'uuid';
const fs = require('fs')
import path from 'path'


type lang = {
    lang: string,
    id: string,
    img: string,
    snippets: Array<lang>
}
type snippet = {
    id: string,
    headline: string,
    description: string,
    code: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Boolean>
    ) {
        const dir = path.resolve('./public/');
        const data:any = JSON.parse(fs.readFileSync(dir + "/data.json", {encoding: "utf-8"}))
        if (req.body === "") {
            res.end();
            return;
        }
    try {
        var elemIndex = data.langs.indexOf(data.langs.find(((lang: lang )=> lang.id === req.body.parentID))) 
        data.langs[elemIndex].snippets.push({
            id: uuidV4(),
            headline: req.body.shortName,
            description: req.body.desc,
            code: req.body.code
        })
        fs.writeFileSync(dir + '/data.json', JSON.stringify(data, null, 4), "utf8") 
        res.status(200).send(true)
    } catch (error: any) {
        console.log(error);
        
        res.status(500).send(error)
    }
}